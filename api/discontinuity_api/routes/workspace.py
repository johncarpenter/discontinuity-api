from datetime import datetime
from fastapi.params import Depends
from fastapi import HTTPException, Depends, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import logging
from discontinuity_api.workers.chains import retrieval_qa
from discontinuity_api.vector import add_document, get_postgres_vector_db, query_index, get_faiss_vector_db
from discontinuity_api.utils import JWTBearer
from langchain.docstore.document import Document
from fastapi import APIRouter
from discontinuity_api.utils import JWTBearer, s3Client, uploadFileToBucket, createFileOnBucket
from fastapi import APIRouter, File, UploadFile
from botocore.client import BaseClient
import uuid
import os
import requests

logger = logging.getLogger(__name__)


router = APIRouter(prefix="/workspace", tags=["workspace"])

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
async def insert(document: Doc,s3: BaseClient = Depends(s3Client), workspace=Depends(JWTBearer())):
    """Insert text embeddings into the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Adding text to workspace {workspace.id}")

    body = f"{document.content} \n\n{document.metadata}"

    # Assign random UUID to the document and append .txt
    file_name = str(uuid.uuid4()) + '.txt'

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
    if(workspace.slug == "test"):
        db = get_faiss_vector_db("test")
    else:
        db = get_postgres_vector_db(workspace.id)

    docs_with_score = query_index(index=db, query=message.message)
    
    response = []
    for doc, score in docs_with_score:
        response.append({"content": doc.page_content, "score": score, "metadata": doc.metadata})
        
    return response

@router.post("/query")
async def query(message: Message, workspace=Depends(JWTBearer())):
    """Query the model with RAG the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Querying workspace {workspace.id}")

    # Get the vector db for the workspace
    db = get_postgres_vector_db(workspace.id)

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
    

@router.post("/file")
async def insert(file_obj: UploadFile = File(...), workspace=Depends(JWTBearer()),s3: BaseClient = Depends(s3Client)):
    """Insert a file to the S3 bucket"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Adding file to workspace {workspace.id}")


    upload_obj = uploadFileToBucket(s3_client=s3, file_obj=file_obj.file,
                                       bucket='discontinuity-rag-serverless-prod',
                                       folder=workspace.id,
                                       object_name=file_obj.filename
                                       )

    if upload_obj:
        return JSONResponse(content="Object has been uploaded to bucket successfully",
                            status_code=status.HTTP_201_CREATED)
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="File could not be uploaded")
