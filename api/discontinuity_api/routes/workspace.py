import base64
from datetime import datetime
from enum import Enum
from typing import List, Optional
from fastapi.params import Depends
from fastapi import HTTPException, Depends, Request, status
from fastapi.responses import JSONResponse, StreamingResponse
from langchain_google_genai import ChatGoogleGenerativeAI
from openai import AuthenticationError, OpenAI

from pydantic import BaseModel
import logging
from discontinuity_api.utils.prompts import get_prompt_by_id
from discontinuity_api.utils.models import get_model_by_id, get_openai_model
from discontinuity_api.utils.s3 import listFilesInBucket
from discontinuity_api.database.api import getFiles, getFlow, getLLMModel, getPrompt
from discontinuity_api.database.dbmodels import get_db
from discontinuity_api.tools import get_agent_for_workspace, get_data_agent_for_workspace, get_agent_for_chatplus
from discontinuity_api.workers.chains import retrieval_qa, aretrieval_qa, get_chain_for_workspace
from discontinuity_api.vector import query_index, get_faiss_vector_db, get_redis_history, get_qdrant_vector_db
from discontinuity_api.utils import JWTBearer
from langchain.docstore.document import Document
from fastapi import APIRouter
from discontinuity_api.utils import JWTBearer, s3Client, uploadFileToBucket, createFileOnBucket
from fastapi import APIRouter, File, UploadFile
from botocore.client import BaseClient
import uuid
import os
import requests
from sse_starlette.sse import EventSourceResponse
import json
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain.agents.openai_assistant.base import OpenAIAssistantRunnable
from langchain.prompts import SystemMessagePromptTemplate

from qdrant_client import models


logger = logging.getLogger(__name__)


router = APIRouter(prefix="/workspace", tags=["workspace"])

BASE_API_URL = "https://flow.discontinuity.ai/api/v1/prediction/"


class Message(BaseModel):
    message: str
    thread: Optional[str] = None
    overrideConfig: Optional[dict] = None

class Doc(BaseModel):
    filename: Optional[str] = None
    content: str
    metadata: Optional[dict] = {}

class UserEnum(Enum):
    USER = 'user'
    COMPUTER = 'computer'

class HistoryMessage(BaseModel):
    content: str
    role: str
    id: str
    created: str

class ChatMessage(BaseModel):
    message: str
    thread: Optional[str] = None
    filter: Optional[dict] = {}
    model: Optional[str] = "openai"
    prompt: Optional[str] = None

@router.post("/chat")
async def ask(message:ChatMessage, workspace=Depends(JWTBearer())):
    logger.info(f"Streaming Chat for {workspace.id}")


    session = next(get_db()) 
    
    llmmodel = get_model_by_id(session=session, model_id=message.model)

    prompt = get_prompt_by_id(session=session, prompt_id=message.prompt)

    # This is the full agent
    agent = await get_agent_for_chatplus(workspaceId=workspace.id, llm=llmmodel, prompt=prompt)

    thread = message.thread or str(uuid.uuid4())

    history = get_redis_history(session_id=thread)

    async def generator():
        response = '' 
        sources = []
        yield stream_chunk({"thread":thread}, "assistant_message")
        try:
            async for chunk in agent.astream({"input":message.message, "chat_history":history.messages}): 
                #logger.info(f"Chunk: {chunk}")   
                msg = chunk.content
                response += msg
                yield stream_chunk(msg, "text")
                # action = list(chunk.keys())[0]
                # msg = chunk[action]
                # if action == "steps":
                #     for agentstep in msg:
                #         logger.info(f"Tool Log: {agentstep.action.log}")
                #         if(agentstep.observation):
                #             #logger.info(f"Tool Observation: {agentstep.observation}")
                #             if('context' in agentstep.observation):                             
                #                 docs = agentstep.observation['context']
                #                 sources = reduceSourceDocumentsToUniqueFiles(sources=docs)                
    
                #         # else:# Tool observation
                #         #     yield stream_chunk(agentstep.observation, "text")  
                # elif action == "output":
                #     response += msg
                #     yield stream_chunk(msg, "text")
                #     yield stream_chunk(sources, "data")
        except Exception as e:
           logger.error(f"Error in agent stream: {e}")
           if(type(e) is AuthenticationError ): #Only works for OpenAI
            response = "It looks like there is a problem with the API Key. Please check the API Key in the workspace settings."   
           else:
            response = "Sorry, I am having trouble processing your request. Please try again later."
           yield stream_chunk(response, "error")
            
        history.add_user_message(HumanMessage(content=message.message, created=datetime.now().isoformat(), id=str(uuid.uuid4())))
  
        history.add_ai_message(AIMessage(content=response, created=datetime.now().isoformat(), id=str(uuid.uuid4()), additional_kwargs={"sources":sources}))


    return EventSourceResponse(generator())


@router.post("/agent")
async def ask(message:ChatMessage, workspace=Depends(JWTBearer())):
    logger.info(f"Streaming Agent for {workspace.id}")
   
    filter, filterMessage = build_filter(message.filter)
    logger.info(f"Using filter {filter}")

    session = next(get_db()) 
    
    llmmodel = get_model_by_id(session=session, model_id=message.model)

    prompt = get_prompt_by_id(session=session, prompt_id=message.prompt)

    prompt.append(SystemMessagePromptTemplate.from_template(filterMessage))

    
    # This is the full agent
    agent = await get_agent_for_workspace(workspaceId=workspace.id, llm=llmmodel, prompt=prompt, filter=filter)

    thread = message.thread or str(uuid.uuid4())

    history = get_redis_history(session_id=thread)

    logger.info(f"Using history {history.messages}")

    # https://github.com/langchain-ai/langchain/issues/14700
    # Remove system messages from the history for gemini models
    # This means previous texts that are referenced may not show up in history?

    # if filterMessage and type(llmmodel) is not ChatGoogleGenerativeAI:            
    #     logger.info(f"Applying filter to the System Message: {filterMessage}")
    #     history.add_message(SystemMessage(content=filterMessage, created=datetime.now().isoformat(), id=str(uuid.uuid4())))



    # async def generator():
    #     response = '' 
    #     sources = []
    #     yield stream_chunk({"thread":thread}, "assistant_message")
    #     async for chunk in chain.astream({"input":message.message, "chat_history":history.messages}):    
    #        # logger.info(f"Chunk: {chunk}")    
    #         action = list(chunk.keys())[0]
    #         msg = chunk[action]
    #         if action == "context":
    #             sources = reduceSourceDocumentsToUniqueFiles(sources=msg) 
    #             yield stream_chunk(sources, "data")  
    #         elif action == "answer":
    #             response += msg
    #             yield stream_chunk(msg, "text")
    
    async def generator():
        response = '' 
        sources = []
        yield stream_chunk({"thread":thread}, "assistant_message")
        try:
            async for chunk in agent.astream({"input":message.message, "chat_history":history.messages}): 
            #    logger.info(f"Chunk: {chunk}")   
                action = list(chunk.keys())[0]
                msg = chunk[action]
                if action == "steps":
                    for agentstep in msg:
                        logger.info(f"Tool Log: {agentstep.action.log}")
                        if(agentstep.observation):
                            #logger.info(f"Tool Observation: {agentstep.observation}")
                            if('context' in agentstep.observation):                             
                                docs = agentstep.observation['context']
                                sources = reduceSourceDocumentsToUniqueFiles(sources=docs)                

                        # else:# Tool observation
                        #     yield stream_chunk(agentstep.observation, "text")  
                elif action == "output":
                    response += msg
                    yield stream_chunk(msg, "text")
                    yield stream_chunk(sources, "data")
        except Exception as e:
            logger.error(f"Error in agent stream: {e}")

                # If the error is an authentication error, it is likely an API key issue
            if type(e) is AuthenticationError:
                response = "It looks like there is a problem with the API Key. Please check the API Key in the workspace settings."
            else:
                response = "Sorry, I am having trouble processing your request. Please try again later."
            yield stream_chunk(response, "error")
            
        
        history.add_user_message(HumanMessage(content=message.message, created=datetime.now().isoformat(), id=str(uuid.uuid4())))
        history.add_ai_message(AIMessage(content=response, created=datetime.now().isoformat(), id=str(uuid.uuid4()), additional_kwargs={"sources":sources}))
       

    return EventSourceResponse(generator())


@router.post("/data")
async def ask(message:ChatMessage, workspace=Depends(JWTBearer())):
    logger.info(f"Streaming Data Agent for {workspace.id}")
   
    # Check that the files exist in the workspace
    if not message.thread and not message.filter['files']:
        raise HTTPException(status_code=400, detail="No files provided")
    
    try:
        session = next(get_db()) 
        prompt = getPrompt(session=session, prompt_id=message.prompt)
     
        client = get_openai_model(session=session, model_id=message.model)

        # Need a way to cache this? Workspace maybe?
        #assistantId = "asst_XhBVJXoLL9xQGuAgUcasg37g"

        assistants = client.beta.assistants.list()

        # Find the assistant for the workspace with the name "discontinuity-data-agent"
        assistant = next((assistant for assistant in assistants if assistant.name == "discontinuity-data-agent"), None)
        
        if not assistant:
            logger.info(f"Creating new openai data assistant for workspace {workspace.id}")
            assistant = client.beta.assistants.create(
                instructions=prompt.prompt if prompt else "You are a helpful data anaylst. Your goal is to work with the user to intepret the data provided and answer any questions they may have. Reason through all your thinking before providing an answer.",
                name="discontinuity-data-agent",
                tools=[{"type": "code_interpreter"}],
            #    tool_resources={"code_interpreter": {"file_ids": [oaifile.oai_fileid for oaifile in oaifiles]}},
                model="gpt-4o"
            )

        logger.info(f"Using assistant {assistant.id}")
        
        assistantId = assistant.id

    except Exception as e:
        logger.error(f"Error in agent stream: {e}")
        raise HTTPException(status_code=400, detail="OpenAI models are required for data agents")

    if not message.thread:
        allFiles = listFilesInBucket(s3_client=s3Client(),bucket=os.getenv('AWS_BUCKET'), folder=f"{workspace.id}/")
        allFileNames = [file['Key'].split("/")[-1] for file in allFiles]
        for file in message.filter['files']:
            if file not in  allFileNames:
                raise HTTPException(status_code=400, detail=f"File {file} not found in workspace")
            
        oaifiles = getFiles(session=session, filenames=message.filter['files'], workspace_id=workspace.id)
        logger.info(f"Files: {[oaifile.oai_fileid for oaifile in oaifiles]}")

        
        client.beta.assistants.update(
            assistant_id=assistantId,
            instructions=prompt.prompt if prompt else "You are a helpful data anaylst. Your goal is to work with the user to intepret the data provided and answer any questions they may have. Reason through all your thinking before providing an answer.",
            tool_resources={"code_interpreter": {"file_ids": [oaifile.oai_fileid for oaifile in oaifiles]}},
            )

        

      
    # This is the full agent
    
    thread = message.thread or client.beta.threads.create().id

    history = get_redis_history(session_id=thread)
   
    async def generator():
        response = '' 
        sources = []
        yield stream_chunk({"thread":thread}, "assistant_message")
        try:
            client.beta.threads.messages.create(thread_id=thread, content=message.message, role="user")
            stream = client.beta.threads.runs.create(
                thread_id=thread,
                assistant_id=assistantId,
                stream=True
            ) 

            for event in stream:
                #logger.info(f"Event: {event}")
                action = event.data.object            
                if action == "thread.message.delta":
                    for delta in event.data.delta.content:
                        if(delta.type == "text"):
                            msg = delta.text.value
                            response += msg                
                            yield stream_chunk(msg, "text")
                        elif(delta.type == "image_file"):                            
                            raw = client.files.content(delta.image_file.file_id)
                            logger.info(f"Image: {raw}")
                            msg = f"![{delta.image_file.file_id}](data:image/png;base64,{base64.b64encode(raw.content).decode(raw.encoding)})"
                            response += msg
                            yield stream_chunk(msg, "text")
        except Exception as e:
            logger.error(f"Error in agent stream: {e}")
            response = "Sorry, I am having trouble processing your request. Please try again later."
            yield stream_chunk(response, "error")
                      
      
            
        history.add_user_message(HumanMessage(content=message.message, created=datetime.now().isoformat(), id=str(uuid.uuid4())))
        history.add_ai_message(AIMessage(content=response, created=datetime.now().isoformat(), id=str(uuid.uuid4()), additional_kwargs={"sources":sources}))

    return EventSourceResponse(generator())


@router.get("/history/{thread}")
async def query(thread: str, workspace=Depends(JWTBearer())):
    """Retrieve the chat history for a given thread"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Querying workspace {workspace.id}")

    # Get the vector db for the workspace
    history = get_redis_history(session_id=thread)
    
    formattedHistory = []
    for message in history.messages:
        if(message.type == "human"):
            formattedHistory.append({"role": UserEnum.USER.value, "content": message.content, "created": message.created, "id": message.id})
        else:
            formattedHistory.append({"role": UserEnum.COMPUTER.value, "content": message.content, "created": message.created, "id": message.id, "sources": message.additional_kwargs.get("sources", [])})

    return formattedHistory


@router.post("/text")
async def insert(document: Doc,s3: BaseClient = Depends(s3Client), workspace=Depends(JWTBearer())):
    """Insert text embeddings into the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Adding text to workspace {workspace.id}")

    body = f"{document.content} \n\n{document.metadata}"

    # Assign random UUID to the document and append .txt
    if(document.filename):
        file_name = document.filename
    else:
        file_name = 'text-' + str(uuid.uuid4()) + '.txt'

    upload_obj = createFileOnBucket(s3_client=s3, data=body,
                                       bucket='discontinuity-rag-serverless-prod',
                                       folder=workspace.id,
                                       object_name=file_name
                                       )
    if upload_obj:
        return JSONResponse(content="Object has been uploaded to bucket successfully", status_code=status.HTTP_201_CREATED)
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="File could not be uploaded")


@router.post("/flow/{flow_id}")
def queryflow(flow_id: str, message: Message, workspace=Depends(JWTBearer())):
    """
    Queries the flow.discontinuity.ai API with a message

    :param message: The message to send to the flow
    :param flow_id: The ID of the flow to run
    :return: The JSON response from the flow
    """

    session = next(get_db())
    flow = getFlow(session=session, flow_id=flow_id)

    if not flow:
        raise HTTPException(status_code=404, detail="Flow not found")
    
    logger.info(f"Querying flow {flow.id} with message {message.message}")
    
    headers = {}
    
    if flow.apikey is not None and flow.apikey != "":
        headers = {"Authorization": f"Bearer {flow.apikey}"}

    thread = message.thread or str(uuid.uuid4())
    overrideConfig = message.overrideConfig or {}
    overrideConfig["sessionId"] = thread
    payload = {"question": message.message, "overrideConfig": overrideConfig}

    ## Reformat the output to be more readable

    history = get_redis_history(session_id=thread)

    history.add_user_message(HumanMessage(content=message.message, created=datetime.now().isoformat(), id=str(uuid.uuid4())))
   

    try:
        response = requests.post(flow.endpoint, json=payload, headers=headers)    
        data = response.json()
        logger.info(f"Flow response: {data}")
    except requests.exceptions.RequestException as e:
        logger.error(f"Error in flow request: {e}")
        raise HTTPException(status_code=501, detail="Flow API not available")
    
    logger.info(f"Flow response: {data}")
    if "success" in data and data["success"] == False:
        raise HTTPException(status_code=501, detail=data['message'])
    elif "json" in data:
        history.add_ai_message(AIMessage(content=data["json"], created=datetime.now().isoformat(), id=str(uuid.uuid4())))
    elif "text" in data:
        history.add_ai_message(AIMessage(content=data["text"], created=datetime.now().isoformat(), id=str(uuid.uuid4())))


    return data

 
    

@router.post("/file")
async def insert(filename: Optional[str]=None, file: UploadFile = File(...), workspace=Depends(JWTBearer()),s3: BaseClient = Depends(s3Client)):
    """Insert a file to the S3 bucket"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Adding file to workspace {workspace.id}")

    # Assign random UUID to the document and append the extension of the file
    if(filename):
        file_name = filename
    elif(file.filename):
        file_name = file.filename
    else:
        file_name = str(uuid.uuid4()) + (os.path.splitext(file.filename)[1] if file.filename else '.txt')

    upload_obj = uploadFileToBucket(s3_client=s3, file_obj=file.file,
                                       bucket='discontinuity-rag-serverless-prod',
                                       folder=workspace.id,
                                       object_name=file_name
                                       )

    if upload_obj:
        return JSONResponse(content="Object has been uploaded to bucket successfully",
                            status_code=status.HTTP_201_CREATED)
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="File could not be uploaded")


# transforms the chunk into a stream part compatible with the vercel/ai
def stream_chunk(chunk, type: str = "text"):
    code = get_stream_part_code(type)
    formatted_stream_part = f"{code}:{json.dumps(chunk, separators=(',', ':'))}\n"
    return formatted_stream_part

# given a type returns the code for the stream part
def get_stream_part_code(stream_part_type: str) -> str:
    stream_part_types = {
        "text": "0",
        "function_call": "1",
        "data": "2",
        "error": "3",
        "assistant_message": "4",
        "assistant_data_stream_part": "5",
        "data_stream_part": "6",
        "message_annotations_stream_part": "7",
    }
    return stream_part_types[stream_part_type]

def reduceSourceDocumentsToUniqueFiles(sources: list[Document]):
    # Iterate through to document list and return only unique filenames
    unique_files = {}
    for source in sources:        
        includeRecord = True
        if includeRecord:
            metadata = source.metadata           
            if metadata['file'] not in unique_files:
                unique_files[metadata['file']] = {
                    "pageContent": source.page_content,
                    "metadata": metadata
                }
    
    return list(unique_files.values())

def build_filter(filter: dict):

    logger.info(f"Building filter from {filter}")

    baseFilter =  models.Filter(
        should=[models.FieldCondition(key="metadata.category", match=models.MatchAny(any=["NarrativeText","ImageDescription","Transcription","ListItem"]))],
        must = [],
    )

    # The filter messages is sent to the Agent to filter the responses at the llm level
    filterMessage = None

    if filter:
        if "category" in filter:
            baseFilter.must.append(models.FieldCondition(key="metadata.category", match=models.MatchAny(any=filter["category"])))
            filterMessage = f"Filtering for category: {filter['category']}"

        if "files" in filter and filter["files"] and len(filter["files"]) > 0:
            baseFilter.must.append(models.FieldCondition(key="metadata.file", match=models.MatchAny(any=filter["files"])))
            filename = (" or ".join(filter['files']))
            filterMessage = f"Filtering for filenames that match {filename}"   

        if "page" in filter:
            baseFilter.must.append(models.FieldCondition(key="metadata.page", match=models.MatchAny(any=filter["page"])))
            filterMessage = f"Filtering for pages that match { filter['page']}"   

    return baseFilter, filterMessage