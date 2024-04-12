
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import VectorStore
from langchain.prompts import PromptTemplate, ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import RetrievalQA, create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_openai import ChatOpenAI
import logging
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
import json

from discontinuity_api.vector.base import get_postgres_vector_db_2

logger = logging.getLogger(__name__)

STANDARD_PROMPT = """
System: You are a conversational chat bot assistant that uses the Documents and History to answer the users questions. The Documents are from files uploaded by the user. The History is the chat history of the conversation. You should use the Documents and History to answer the users questions.
Elaborate on the questions and quote the relevant documents. Answer the users Question using the Documents and History text above.
Keep your answer ground in the facts of the Documents.  If the Documents doesnt contain the facts to answer the Question inform the user. If the user refers to a file reference make sure to provide the link to the file in the response. 
 
Always include links to the relevant documents in your response. Use the Location URI: field in the Documents to get the link to the file. Don't duplicate the links. 

All output should be in markdown format.

Documents:
{context}

Question:
{input}
"""
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
    

    #     return `Location URI: /api/workspace/${workspaceId}/files/${doc.metadata.file} \n\nFilename: ${
    #   doc.metadata.filename
    # }\n\nContent: ${doc.pageContent}\n\nMetadata: ${JSON.stringify(doc.metadata)}`.trim()


async def get_chain_for_workspace(workspaceId:str):
    # Each workspace will have it's own chain, so we need to create a new chain for each workspace
    # We will use the workspaceId as the chain name
    if(workspaceId=="clumutd7f0002tsdezd06430g"): # Test workspace on dev
        llm = ChatOpenAI(streaming=True,temperature=0)
        vector = await get_postgres_vector_db_2(workspaceId)
        retriever = vector.as_retriever(search_type="similarity", search_kwargs={"k": 6}, score_threshold=0.5)

        prompt = PromptTemplate.from_template(STANDARD_PROMPT)

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

        history_aware_retriever =  create_history_aware_retriever(llm, retriever, contextualize_q_prompt)

        question_answer_chain = create_stuff_documents_chain(llm, prompt)
        
        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
 
        return rag_chain


    else:
        return await defaultChain(workspaceId)
    

async def defaultChain(workspaceId:str):
    llm = ChatOpenAI(streaming=True,temperature=0)
    vector = await get_postgres_vector_db_2(workspaceId)
    retriever = vector.as_retriever(search_type="similarity", search_kwargs={"k": 6})

    prompt = PromptTemplate.from_template(STANDARD_PROMPT)
    return (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    
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