# Import things that are needed generically
import logging
import os
from langchain.pydantic_v1 import BaseModel, Field
from langchain.tools import BaseTool, StructuredTool, tool
from typing import List, Optional, Type


from discontinuity_api.utils import s3Client, listFilesInBucket

from langchain.callbacks.manager import (
    AsyncCallbackManagerForToolRun,
    CallbackManagerForToolRun,
)
logger = logging.getLogger(__name__)

class ListWorkspaceFilesInput(BaseModel):
    filter: str = Field(description="File filter to apply to the workspace files")

class Config(BaseModel):
    workspaceId: str = Field(description="The workspaceId to query for files")

class ListWorkspaceFiles(BaseTool):
    name = "workspace_file_list"
    description = "Useful for answering about metadata on the files that the user has uploaded to the workspace. Not for filtering files."
    args_schema: Type[BaseModel] = ListWorkspaceFilesInput

    workspaceId: str = None
    def __init__(self, workspaceId: str):
        super().__init__()
        self.workspaceId = workspaceId
    

    def _run(
        self, filter:str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Use the tool."""
        files = listFilesInBucket(s3_client=s3Client(),bucket=os.getenv('AWS_BUCKET_NAME'), folder=f"{self.workspaceId}/")
        return files
    async def _arun(
        self,
        filter: str, 
        run_manager: Optional[AsyncCallbackManagerForToolRun] = None,
    ) -> str:
        """Use the tool asynchronously."""
        logger.debug(f"Running workspace file list tool for workspace {self.workspaceId}")  
        logger.debug(f"Filter: {filter}") 

        files = listFilesInBucket(s3_client=s3Client(),bucket=os.getenv('AWS_BUCKET_NAME'), folder=f"{self.workspaceId}/")
        if(files is None or len(files) == 0):
            return "No files found in workspace"

        # f"{obj['Key']} Updated:{obj['LastModified']} Size: {obj['Size']}"
        # Filter the files 
        #if filter is not None:
        #    files = [file for file in files if filter in file['Key']]

        files = [f"{file['Key']} Updated:{file['LastModified'].strftime('%m/%d/%Y, %H:%M:%S')} Size: {file['Size']}" for file in files]

        return files
        



    