
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import VectorStore
from langchain.prompts import PromptTemplate, ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import RetrievalQA, create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_openai import ChatOpenAI
import logging
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.retrievers.document_compressors import EmbeddingsFilter
import json
from langchain_cohere import CohereRerank
from langchain_community.llms import Cohere
from discontinuity_api.utils.prompts import STANDARD_PROMPT
from langchain import hub


from discontinuity_api.vector.base import get_qdrant_vector_db

logger = logging.getLogger(__name__)


def retrieval_qa(index: VectorStore, query: str, prompt_template:str = STANDARD_PROMPT) -> str:
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question", "chatHistory"]
    )
    chain_type_kwargs = {"prompt": PROMPT}

    llm = ChatOpenAI(streaming=True,temperature=0)

    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=index.as_retriever(), chain_type_kwargs=chain_type_kwargs)
    logger.info("Launching Retrieval QA Query")
    response = qa.run(query)
    logger.info("Completed Retrieval QA Query")
    return response

def aretrieval_qa(index: VectorStore, model: str= "stuff", prompt_template:str = STANDARD_PROMPT) -> str:
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )
    chain_type_kwargs = {
        "prompt": PROMPT,
        'document_prompt': PromptTemplate(
		            input_variables=["page_content", "metadata"], 
		            template="Context:\n{page_content}\nMetadata:{metadata}"
		        ),   
    }

    llm = ChatOpenAI(streaming=True,temperature=0)

    qa = RetrievalQA.from_chain_type(llm=llm, chain_type=model, retriever=index.as_retriever(), chain_type_kwargs=chain_type_kwargs, return_source_documents=True)
    return qa

def format_docs(docs):
    formattedDocs = []
    for doc in docs:
        
        metadata = doc.metadata["metadata"]
        formattedDocs.append(f"Location URI: /api/workspace/??/files/{metadata['file']} \n\nFilename: {metadata['filename']}\n\nContent: {doc.page_content}")

    return "\n\n".join(formattedDocs)
    

async def get_chain_for_workspace(workspaceId:str, filter:str = None ):
    # Each workspace will have it's own chain, so we need to create a new chain for each workspace
    # We will use the workspaceId as the chain name
    if(workspaceId=="clumutd7f0002tsdezd06430g"): # Test workspace on dev
        llm = ChatOpenAI(streaming=True,temperature=0.5, model="gpt-4-turbo")
 
        vector = get_qdrant_vector_db(workspaceId)
        retriever = vector.as_retriever(search_type="similarity_score_threshold", search_kwargs={"k": 25,"filter":filter, "score_threshold":0.50})


        #llm = Cohere(temperature=0)
        compressor = CohereRerank()
        compression_retriever = ContextualCompressionRetriever(
            base_compressor=compressor, base_retriever=retriever
        )
        logger.info("Using Cohere rerank algorithm for the workspace")

        prompt = PromptTemplate.from_template(STANDARD_PROMPT)
        retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")

        history_aware_retriever =  create_history_aware_retriever(llm, compression_retriever, contextualize_history_prompt())
      

        question_answer_chain = create_stuff_documents_chain(llm, retrieval_qa_chat_prompt)
        
        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
 
        return rag_chain


    else:
        return await defaultChain(workspaceId, filter)
    

async def defaultChain(workspaceId:str, filter:str = None):
    llm = ChatOpenAI(streaming=True,temperature=0.5, model="gpt-4-turbo")
    
    vector = get_qdrant_vector_db(workspaceId)
    retriever = vector.as_retriever(search_type="similarity_score_threshold", search_kwargs={"k": 25,"filter":filter, "score_threshold":0.50})


    
    compressor = CohereRerank()
    compression_retriever = ContextualCompressionRetriever(
        base_compressor=compressor, base_retriever=retriever
    )
    logger.info("Using Cohere rerank algorithm for the workspace")

    prompt = PromptTemplate.from_template(STANDARD_PROMPT)
    retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")

    history_aware_retriever =  create_history_aware_retriever(llm, compression_retriever, contextualize_history_prompt())
   

    question_answer_chain = create_stuff_documents_chain(llm, retrieval_qa_chat_prompt)
    
    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    return rag_chain
    
def contextualize_history_prompt():
    contextualize_q_system_prompt = """Given a chat history and the latest user question \
    which might reference context in the chat history, formulate a standalone question \
    which can be understood without the chat history. Do NOT answer the question, \
    just reformulate it if needed and otherwise return it as is."""
    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    return contextualize_q_prompt

