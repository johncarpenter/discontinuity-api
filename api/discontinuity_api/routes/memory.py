from fastapi.params import Depends
from fastapi import HTTPException, Depends, status
from fastapi.responses import JSONResponse
import logging
from discontinuity_api.utils import JWTBearer, s3Client, uploadFileToBucket

from fastapi import APIRouter, File, UploadFile
from botocore.client import BaseClient

from fastapi import Request

logger = logging.getLogger(__name__)


router = APIRouter(prefix="/memory", tags=["memory"], include_in_schema=True)

@router.post("/file")
async def insert(workspace=Depends(JWTBearer()),s3: BaseClient = Depends(s3Client), file_obj: UploadFile = File(...)):
    """Insert a file to the S3 bucket"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Adding file to workspace {workspace.slug}")


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


