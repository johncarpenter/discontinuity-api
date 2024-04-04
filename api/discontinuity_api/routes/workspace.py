from datetime import datetime
from fastapi.params import Depends
from fastapi import HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel
import logging
from discontinuity_api.workers.chains import retrieval_qa
from discontinuity_api.vector import add_document, get_postgres_vector_db, query_index, get_faiss_vector_db
from discontinuity_api.utils import JWTBearer
from langchain.docstore.document import Document
from fastapi import APIRouter

from fastapi import Request
import os
import requests

logger = logging.getLogger(__name__)


router = APIRouter(prefix="/workspace", tags=["workspace"], include_in_schema=True)

BASE_API_URL = "https://flow.discontinuity.ai/api/v1/prediction/"



class Message(BaseModel):
    message: str

class Doc(BaseModel):
    content: str
    metadata: dict


# @router.post("/debug")
# async def query(message: Message, workspace=Depends(JWTBearer())):
#     """Query/Chat against the workspace model"""

#     # Check if the workspace slug file exists in the local directory
#     logger.info(f"Querying workspace {workspace.slug}")

#     filename = f"{workspace.slug}-flow.json"

#     if not os.path.exists(f"./local/flow/{filename}"):
#         logger.error(f"Missing file: ./local/flow/{filename}")
#         raise HTTPException(status_code=404, detail="Unknown workspace")

#     flow = load_flow_from_json(f"./local/flow/{filename}")

#     input = {"input": message.message}

#     output = flow.run(input)

#     return output

@router.post("/text")
async def insert(document: Doc, workspace=Depends(JWTBearer())):
    """Insert text embeddings into the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Adding text to workspace {workspace.slug}")

    # Get the vector db for the workspace
    db = get_postgres_vector_db(workspace.slug)

    document.metadata["workspace"] = workspace.slug
    document.metadata["type"] = "text"
    document.metadata["source"] = "api"
    # Add the current date
    document.metadata["date"] = datetime.now().isoformat()
    
    # Create the document
    doc = Document(page_content=document.content, metadata=document.metadata)

    # Add the document to the vector db
    add_document(index=db, documents=[doc])

    return {"status": "added"}

@router.post("/search")
async def search(message: Message, workspace=Depends(JWTBearer())):
    """Query the model with RAG the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Searching {message.message} in workspace {workspace.slug}")

    # Get the vector db for the workspace
    if(workspace.slug == "test"):
        db = get_faiss_vector_db("test")
    else:
        db = get_postgres_vector_db(workspace.slug)

    docs_with_score = query_index(index=db, query=message.message)
    
    response = []
    for doc, score in docs_with_score:
        response.append({"content": doc.page_content, "score": score, "metadata": doc.metadata})
        
    return response

@router.post("/query")
async def query(message: Message, workspace=Depends(JWTBearer())):
    """Query the model with RAG the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Querying workspace {workspace.slug}")

    # Get the vector db for the workspace
    db = get_postgres_vector_db(workspace.slug)

    response  = retrieval_qa(index=db, query=message.message)

    
    return {"response":response}


@router.post("/flow/{flow_id}")
def queryflow(flow_id: str, message: Message, workspace=Depends(JWTBearer())):
    """
    Queries the flow.discontinuity.ai API with a message

    :param message: The message to send to the flow
    :param flow_id: The ID of the flow to run
    :return: The JSON response from the flow
    """
    api_url = f"{BASE_API_URL}{flow_id}"
    api_key = os.getenv("FLOW_API_KEY")

    payload = {"question": message.message}
    headers = {"Authorization": f"Bearer {api_key}"}

    try:
        response = requests.post(api_url, json=payload, headers=headers)       
        return response.json()
    except requests.exceptions.RequestException as e:
        print(e)
        raise HTTPException(status_code=501, detail="Flow API not available")
    