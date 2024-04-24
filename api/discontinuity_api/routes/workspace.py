from datetime import datetime
from enum import Enum
from typing import Optional
from fastapi.params import Depends
from fastapi import HTTPException, Depends, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import logging
from discontinuity_api.database.api import getFlow
from discontinuity_api.database.dbmodels import get_db
from discontinuity_api.tools import get_agent_for_workspace
from discontinuity_api.workers.chains import retrieval_qa, aretrieval_qa, get_chain_for_workspace
from discontinuity_api.vector import add_document, get_postgres_vector_db, query_index, get_faiss_vector_db, get_postgres_vector_db_2, get_postgres_history
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
from langchain_core.messages import HumanMessage, AIMessage
logger = logging.getLogger(__name__)


router = APIRouter(prefix="/workspace", tags=["workspace"])

BASE_API_URL = "https://flow.discontinuity.ai/api/v1/prediction/"


class Message(BaseModel):
    message: str

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

@router.post("/agent")
async def ask(message:ChatMessage, workspace=Depends(JWTBearer())):
    logger.info(f"Streaming Agent for {workspace.id}")
   
    filter = build_filter(message.filter)
    logger.info(f"Using filter {filter}")

    # Get the vector db for the workspace
    chain = await get_agent_for_workspace(workspace.id, filter)

    thread = message.thread or str(uuid.uuid4())

    history = get_postgres_history(table_name=workspace.id, session_id=thread)

    history.add_user_message(HumanMessage(content=message.message, created=datetime.now().isoformat(), id=str(uuid.uuid4())))
    
    async def generator():
        response = '' 
        sources = []
        yield stream_chunk({"thread":thread}, "assistant_message")
        async for chunk in chain.astream({"input":message.message, "chat_history":history.messages}):    
            action = list(chunk.keys())[0]
            msg = chunk[action]
            if action == "steps":
                for agentstep in msg:
                    logger.info(f"Agentstep: {agentstep}") 
                    if(agentstep.observation['context']):
                        sources = reduceSourceDocumentsToUniqueFiles(sources=agentstep.observation['context'])                
                        yield stream_chunk(sources, "data")  
            elif action == "output":
                response += msg
                yield stream_chunk(msg, "text")
            
        history.add_ai_message(AIMessage(content=response, created=datetime.now().isoformat(), id=str(uuid.uuid4()), additional_kwargs={"sources":sources}))


    return EventSourceResponse(generator())


@router.get("/history/{thread}")
async def query(thread: str, workspace=Depends(JWTBearer())):
    """Retrieve the chat history for a given thread"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Querying workspace {workspace.id}")

    # Get the vector db for the workspace
    history = get_postgres_history(table_name=workspace.id, session_id=thread)
    
    formattedHistory = []
    for message in history.messages:
        if(message.type == "human"):
            formattedHistory.append({"role": UserEnum.USER.value, "content": message.content, "created": message.created, "id": message.id})
        else:
            formattedHistory.append({"role": UserEnum.COMPUTER.value, "content": message.content, "created": message.created, "id": message.id, "sources": message.additional_kwargs.get("sources", [])})

    return formattedHistory



@router.post("/stream")
async def ask(message:ChatMessage, workspace=Depends(JWTBearer())):
    logger.info(f"Streaming Chat for {workspace.id}")
   
    filter = build_filter(message.filter)
    logger.info(f"Using filter {filter}")

    # Get the vector db for the workspace
    chain = await get_chain_for_workspace(workspace.id, filter)

    formattedHistory = []
    for hist in message.history:
        if(hist.role == UserEnum.USER.value):
            formattedHistory.append(HumanMessage(content=hist.content,id=hist.id))
        elif(hist.role == UserEnum.COMPUTER.value):
            formattedHistory.append(AIMessage(content=hist.content,id=hist.id))
        

    async def generator():
        async for chunk in chain.astream({"input":message.message, "chat_history":formattedHistory}):    
            #logger.info(f"Chunk: {chunk}")    
            action = list(chunk.keys())[0]
            msg = chunk[action]
            if action == "context":
                yield stream_chunk(reduceSourceDocumentsToUniqueFiles(sources=msg), "data")  
            elif action == "answer":
                yield stream_chunk(msg, "text")


    return EventSourceResponse(generator())



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

@router.post("/search")
async def search(message: Message, workspace=Depends(JWTBearer())):
    """Query the model with RAG the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Searching {message.message} in workspace {workspace.slug}")

    # Get the vector db for the workspace
    db = await get_postgres_vector_db_2(workspace.id)

    docs_with_score = await query_index(index=db, query=message.message)
    
    response = []
    for doc, score in docs_with_score:
        response.append({"content": doc.page_content, "score": score, "metadata": doc.metadata})

    logger.info(f"Search response: {response}")
        
    return response

@router.post("/query")
async def query(message: Message, workspace=Depends(JWTBearer())):
    """Query the model with RAG the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Querying workspace {workspace.id}")

    # Get the vector db for the workspace
    db = await get_postgres_vector_db_2(workspace.id)

    response  = retrieval_qa(index=db, query=message.message)
    
    logger.info(f"Query response: {response}")
    return {"text":response}


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
    

    payload = {"question": message.message}
    headers = {"Authorization": f"Bearer {flow.apikey}"}

    ## Reformat the output to be more readable

    ## Store the messages in the history

    try:
        response = requests.post(flow.endpoint, json=payload, headers=headers)    
        return response.json()
    except requests.exceptions.RequestException as e:
        print(e)
        raise HTTPException(status_code=501, detail="Flow API not available")
    

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
        metadata = source.metadata['metadata']
        if metadata['file'] not in unique_files:
            unique_files[metadata['file']] = {
                "pageContent": source.page_content,
                "metadata": metadata
            }
    
    return list(unique_files.values())

def build_filter(filter: dict):

    filter_str = "metadata->>'category' in ('NarrativeText','ImageDescription','Transcription','ListItem')"

    if not filter:
        return filter_str
   
    for key, value in filter.items():
        filter_str += f" and metadata->>'{key}' like ('%{value}%')"
    return filter_str