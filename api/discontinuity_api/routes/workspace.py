from fastapi.params import Depends
from fastapi import HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel
import logging
from discontinuity_api.utils import JWTBearer
from discontinuity_api.workers import retrieval_qa
from discontinuity_api.vector import load_local_vector_db
from fastapi import APIRouter

from fastapi import Request
import os
from langflow import load_flow_from_json


logger = logging.getLogger(__name__)


router = APIRouter(prefix="/workspace", tags=["workspace"], include_in_schema=False)


class Message(BaseModel):
    message: str


@router.post("/debug")
async def query(message: Message, workspace=Depends(JWTBearer())):
    """Query/Chat against the workspace model"""

    # Check if the workspace slug file exists in the local directory
    logger.info(f"Querying workspace {workspace.slug}")

    filename = f"{workspace.slug}-flow.json"

    if not os.path.exists(f"./local/flow/{filename}"):
        logger.error(f"Missing file: ./local/flow/{filename}")
        raise HTTPException(status_code=404, detail="Unknown workspace")

    flow = load_flow_from_json(f"./local/flow/{filename}")

    input = {"input": message.message}

    output = flow.run(input)

    return output