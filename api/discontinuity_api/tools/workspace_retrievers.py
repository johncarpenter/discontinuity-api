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
from discontinuity_api.vector.base import get_postgres_vector_db_2
from langchain_core.prompts import  PromptTemplate
from langchain.agents import (
    Tool,
)

logger = logging.getLogger(__name__)


async def create_workspace_retriever_tool(workspaceId:str, filter:str = "metadata->>'category' in ('NarrativeText','ImageDescription','Transcription','ListItem')"):
    """ Returns the retriever tool for the workspace """

    logger.info(f"Running workspace retriever tool for workspace {workspaceId}")

    chain = await get_chain_for_workspace(workspaceId, filter)

    return Tool (
        name=workspaceId,
        description = "Query a retriever tool for the files in the workspace that the user has uploaded. Personal information for the user",
        coroutine=lambda x: chain.ainvoke({"input":x})   ,
        func= lambda x: NotImplementedError("This is a coroutine function"),     
        )
        
    


    