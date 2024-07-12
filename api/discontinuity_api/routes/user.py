import uuid
from fastapi.params import Depends
from fastapi import HTTPException, Depends, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from discontinuity_api.utils.s3 import s3Client
from discontinuity_api.database.api import get_workspace_for_account
from discontinuity_api.database import WorkspaceDb, ApiKeyDb
from discontinuity_api.models import Workspace, ApiKey
from discontinuity_api.database import get_db
from discontinuity_api.utils import ClerkJWTBearer
from discontinuity_api.utils import createFileOnBucket
from sqlalchemy.orm import Session

from langchain_community.document_loaders import UnstructuredURLLoader

from typing import List, Optional
from fastapi import APIRouter, HTTPException
import os
from urllib.parse import urlparse
import logging

logger = logging.getLogger(__name__)    


## THis is the endpoint for the extension and for public consumption. 


router = APIRouter(prefix="/user", tags=["user"], include_in_schema=False)



@router.get("/me")
def get_me(organization=Depends(ClerkJWTBearer()), session: Session = Depends(get_db)):
    # Check the session token vs clerk
    return organization


@router.get("/workspaces")
def get_workspaces(organization=Depends(ClerkJWTBearer()), session: Session = Depends(get_db)):
    workspaces = (
        session.query(WorkspaceDb)
        .filter(WorkspaceDb.ownerId == organization["accountId"])
        .all()
    )

    if workspaces is None:
        return None
    
    return [
        Workspace(id=workspace.id, name=workspace.name, slug=workspace.slug)
        for workspace in workspaces
    ]


## These are functions that add to content to a workspace.
class TextContentMessage(BaseModel):
    content: str
    metadata: Optional[dict] = {}

@router.post("/workspaces/{workspace_id}/text")
def add_text_to_workspace(workspace_id:str, message: TextContentMessage, s3: s3Client = Depends(s3Client), organization=Depends(ClerkJWTBearer()), session: Session = Depends(get_db)):
    """ This function will add text to a workspace. The method used is to create a text file and upload it to the S3 bucket."""

    # Retrieve the workspace condional on the organization
    workspace = get_workspace_for_account(session=session, workspace_id= workspace_id, owner_id=organization["accountId"])

    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    
    
    # Check if the workspace slug file exists in the local directory
    logger.info(f"Adding text to workspace {workspace.id}")

    body = f"{message.content} \n\n{message.metadata}"

    # Assign random UUID to the document and append .txt
    file_name = 'text-' + str(uuid.uuid4()) + '.txt'

    upload_obj = createFileOnBucket(s3_client=s3, data=body,
                                       bucket=os.getenv('AWS_BUCKET'),
                                       folder=workspace.id,
                                       object_name=file_name
                                       )
    if upload_obj:
        return JSONResponse(content="Object has been uploaded to bucket successfully", status_code=status.HTTP_201_CREATED)
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="File could not be uploaded")

    pass


class UrlContentMessage(BaseModel):
    url: str
    metadata: Optional[dict] = {}


from langchain_community.document_loaders import SpiderLoader


@router.post("/workspaces/{workspace_id}/url")
def add_url_to_workspace(workspace_id:str, message: UrlContentMessage,  s3: s3Client = Depends(s3Client), organization=Depends(ClerkJWTBearer()), session: Session = Depends(get_db)):
    """ This function will index a publicly available URL and add it to the workspace. The method used is to create a text file and upload it to the S3 bucket."""
    # Retrieve the workspace condional on the organization
    workspace = get_workspace_for_account(session=session, workspace_id= workspace_id, owner_id=organization["accountId"])

    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    logger.info(f"Adding url reference to workspace {workspace.id}")

    # Check to see if the URL is valid
    if message.url is None or message.url == "":
        raise HTTPException(status_code=400, detail="URL not provided")
    
    # # There is a good chance that this callback will take a long time. Likely need to asnyc this. Which is complex on cloudrun
    

    loader = SpiderLoader(
        api_key="sk-33c8cd7a-0e9f-4f37-9a38-6f1a3ab7d6de",
        url=message.url,
        mode="scrape",  # if no API key is provided it looks for SPIDER_API_KEY in env
        params = {
            "limit":1 ,
            "return_format": "markdown"
        }
    )
    documents = loader.load()

    if documents is None:
        raise HTTPException(status_code=404, detail="URL not found")
    

    loader = UnstructuredURLLoader(urls=[message.url])

    for document in documents:
        logger.info(f"Adding documents {document.page_content}")

    # # Create a text file to upload by appending all the page_contents from the documents
    # body = ""
    # for document in documents:
    #     logger.info(f"Adding page {document} to workspace {workspace.id}")
    #     body += f"{document.page_content}\n\n"
    #     # Merge the metadata
    #     message.metadata.update(document.metadata)
    #     body += f"{message.metadata}\n\n"

    
    # domain_page = urlparse(message.url).netloc

    # # # Assign random UUID to the document and append .txt
    # file_name = f"page-{domain_page}-{str(uuid.uuid4())}.txt"
  
    # logger.info(f"Uploading page {message.url} to workspace")


    # upload_obj = createFileOnBucket(s3_client=s3, data=body,
    #                                    bucket=os.getenv('AWS_BUCKET'),
    #                                    folder=workspace.id,
    #                                    object_name=file_name
    #                                    )
    # if upload_obj:
    #     return JSONResponse(content="Object has been uploaded to bucket successfully", status_code=status.HTTP_201_CREATED)
    # else:
    #     raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="File could not be uploaded")

    pass




# /get organization?
# /get / set workspaces
# /add text
# /add page (source) 