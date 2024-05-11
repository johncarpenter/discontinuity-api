import os
import io
from typing import List
from discontinuity_api.utils.s3 import downloadFileFromBucket, s3Client
from discontinuity_api.tools.files import Config, ListWorkspaceFiles
from discontinuity_api.tools.agent_response import AgentResponse, parse
from .workspace_retrievers import create_workspace_retriever_tool
from discontinuity_api.utils import STANDARD_RETRIEVAL_PROMPT, STANDARD_AGENT_CHAT
from langchain_openai import ChatOpenAI
import logging
from langchain.agents import AgentExecutor, create_tool_calling_agent, tool
from langchain.agents.format_scratchpad.openai_tools import format_to_openai_tool_messages
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.agents.output_parsers.openai_tools import OpenAIToolsAgentOutputParser
import pandas as pd
from langchain.agents.agent_types import AgentType
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from langchain.agents.openai_assistant import OpenAIAssistantRunnable
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.language_models.chat_models import BaseChatModel

logger = logging.getLogger(__name__)

async def get_agent_for_chatplus(workspaceId:str, llm:BaseChatModel  ):
   
    if llm is None:
        logger.warn("No LLM model provided, using default OpenAI model")
        llm = ChatOpenAI(streaming=True,temperature=0, model="gpt-4")

    tools = [TavilySearchResults()]

    agent = create_tool_calling_agent(llm, tools, STANDARD_AGENT_CHAT)

    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=False)
    
    return agent_executor

async def get_agent_for_workspace(workspaceId:str, filter:str = None):

    return await default_agent(workspaceId, filter)


async def default_agent(workspaceId:str, filter:str = None): 
    
    logger.info(f"Running default agent for workspace {workspaceId}")

    llm = ChatOpenAI(streaming=True,temperature=0, model="gpt-4")

    retriever_tool = await create_workspace_retriever_tool(workspaceId, filter)

    tools = [retriever_tool, ListWorkspaceFiles(workspaceId=workspaceId)]

    prompt = STANDARD_AGENT_CHAT

    agent = create_tool_calling_agent(llm, tools, prompt)   
     
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=False)
    
    return agent_executor


def get_data_agent_for_workspace(workspaceId:str, files:List[str] = []):

    #agent =  OpenAIAssistantRunnable(assistant_id="asst_cR00IAPGsXjst2wklS9GC7kL", as_agent=True)
    #agent_executor = AgentExecutor(agent=agent, tools=[], verbose=False)
    #return agent_executor
    return default_data_agent(workspaceId, files)


def default_data_agent(workspaceId:str, files:List[str] = []): 
    
    logger.info(f"Running default agent for workspace {workspaceId}")

    llm = ChatOpenAI(streaming=True,temperature=0, model="gpt-4")

    df = [load_dataframe(workspaceId, file) for file in files]

    agent = create_pandas_dataframe_agent(llm, df, agent_type=AgentType.OPENAI_FUNCTIONS)
    
    return agent

def load_dataframe(workspaceId:str, file:str = None):
   # Load the file from s3
   logger.info(f"Loading file {file} from workspace {workspaceId}")
   data = downloadFileFromBucket(s3_client=s3Client(), bucket=os.getenv('AWS_BUCKET_NAME'), folder=workspaceId, object_name=file)

   return pd.read_csv(io.StringIO(data)) # use additional arguments as needed
