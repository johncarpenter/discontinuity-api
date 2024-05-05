from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import create_history_aware_retriever
from langchain_openai import ChatOpenAI
import logging
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.retrievers.document_compressors import EmbeddingsFilter
from langchain.tools.retriever import create_retriever_tool
from  langchain.chains.retrieval_qa.base import RetrievalQA

from discontinuity_api.workers.chains import contextualize_history_prompt, get_chain_for_workspace
from langchain_core.prompts import  PromptTemplate
from langchain.agents import (
    Tool,
)

logger = logging.getLogger(__name__)


async def create_workspace_retriever_tool(workspaceId:str, filter:str = None):
    """ Returns the retriever tool for the workspace """

    logger.info(f"Running workspace retriever tool for workspace {workspaceId}")

    chain = await get_chain_for_workspace(workspaceId, filter)

    return Tool (
        name='workspace_retriever',
        description = "Useful for querying the documents that the user has uploaded to the workspace",
        coroutine=lambda x: chain.ainvoke({"input":x})   ,
        func= lambda x: NotImplementedError("This is a coroutine function"),     
        )
        
    


    