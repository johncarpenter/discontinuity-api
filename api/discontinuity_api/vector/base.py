# Utilities for accessing the vector database
from typing import List
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import PGVector, VectorStore, FAISS
from langchain.document_loaders import TextLoader
from langchain.docstore.document import Document

import logging
import logging.config
import textwrap
import openai
import os
import faiss

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
        collection_name=f"vector-{table_name}",
        connection_string=os.getenv("VECTORDB_URL"),
        embedding_function=embeddings,
    )

    return vector_store


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


def query_index(index: VectorStore, query: str):
    return index.similarity_search_with_score(query)


def _split(documents: List[Document]) -> List[Document]:
    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        chunk_size=100, chunk_overlap=50
    )
    return text_splitter.split_documents(documents=documents)
