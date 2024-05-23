# Utilities for accessing the vector database
from typing import List
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import  VectorStore, FAISS
from langchain.document_loaders import TextLoader
from langchain.docstore.document import Document
from langchain_google_cloud_sql_pg import PostgresEngine, PostgresVectorStore, PostgresChatMessageHistory

import logging
import logging.config
import textwrap
import openai
import os
import faiss
from qdrant_client import QdrantClient
from langchain_community.vectorstores import Qdrant

from langchain_community.chat_message_histories import UpstashRedisChatMessageHistory



environment = os.getenv("ENVIRONMENT")

logger = logging.getLogger(__name__)

# configure service context


def get_faiss_vector_db(table_name: str, embeddings=OpenAIEmbeddings()) -> VectorStore:
    logger.info("Using faiss local vector database. Will load into memory")
    directory = f"./storage/{table_name}"

    if not os.path.exists(f"{directory}/index.faiss"):
        logger.info("Creating new vector database")

        vector_store = FAISS.from_documents(
            documents=[Document(page_content="Empty")], embedding=embeddings
        )
        vector_store.save_local(folder_path=directory)
        return vector_store
    else:
        vector_store = FAISS.load_local(folder_path=directory, embeddings=embeddings)
        return vector_store


def get_postgres_vector_db(
    table_name: str, embeddings=OpenAIEmbeddings()
) -> VectorStore:
    logger.info("Using production vector database")

    # we need to create a new vector database if it does not exist
    if not os.getenv("VECTORDB_URL"):
        raise Exception("Vector Env not set")
    

    vector_store = PGVector(
        collection_name=f"{table_name}",
        connection_string=os.getenv("VECTORDB_URL"),
        embedding_function=embeddings,
    )

    return vector_store


def get_qdrant_vector_db(table_name: str, embeddings=OpenAIEmbeddings()
) -> VectorStore:
    logger.info("Using qdrant vector database")

    # we need to create a new vector database if it does not exist
    if not os.getenv("QDRANT_URL") or not os.getenv("QDRANT_API_KEY"):
        raise Exception("QDrant Env not set")
    
    client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))   
    qdrant = Qdrant(client=client, collection_name=table_name, embeddings=embeddings, content_payload_key="content", metadata_payload_key="metadata")

    return qdrant


def get_redis_history(session_id:str) -> UpstashRedisChatMessageHistory:

    if not os.getenv("UPSTASH_REDIS_REST_URL") or not os.getenv("UPSTASH_REDIS_REST_TOKEN"):
        raise Exception("Redis Env not set")

    URL = os.getenv("UPSTASH_REDIS_REST_URL")
    TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN")

    history = UpstashRedisChatMessageHistory(
        url=URL, token=TOKEN, session_id=session_id
    )

    return history



def load_local_vector_db(table_name: str, embeddings=OpenAIEmbeddings()) -> VectorStore:
    """
    We might be able to store small vector databases in memory for speed and processing power. They
    will have to be updated periodically, but this is a good way to get started.
    """
    logger.info("Loading local vector database")
    directory = f"./local/{table_name}"

    if not os.path.exists(f"{directory}/index.faiss"):
        raise Exception("Vector database does not exist")

    vector_store = FAISS.load_local(folder_path=directory, embeddings=embeddings)

    return vector_store


def add_document(index: VectorStore, documents: List[Document]):
    index.add_documents(documents=_split(documents))


async def query_index(index: VectorStore, query: str):
    return await index.asimilarity_search_with_score(query)


def _split(documents: List[Document]) -> List[Document]:
    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        chunk_size=100, chunk_overlap=50
    )
    return text_splitter.split_documents(documents=documents)
