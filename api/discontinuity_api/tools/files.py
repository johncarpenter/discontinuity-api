# Import things that are needed generically
import logging
import os
from langchain.pydantic_v1 import BaseModel, Field
from langchain.tools import BaseTool, StructuredTool, tool
from typing import List, Optional, Type
from langchain_core.documents import Document
import json


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
        return self._get_files(filter=filter)
    async def _arun(
        self,
        filter: str, 
        run_manager: Optional[AsyncCallbackManagerForToolRun] = None,
    ) -> str:
        """Use the tool asynchronously."""
        return self._get_files(filter=filter)

    def _get_files(self, filter:str = None):
        
        logger.debug(f"Running workspace file list tool for workspace {self.workspaceId}")  
        logger.debug(f"Filter: {filter}") 

        files = listFilesInBucket(s3_client=s3Client(),bucket=os.getenv('AWS_BUCKET_NAME'), folder=f"{self.workspaceId}/")
        if(files is None or len(files) == 0):
            return "No files found in workspace"

        if filter is not None:
            if any(ext in filter for ext in [".","pdf","doc","docx","txt","rtf","html","xml","json","csv","xls","xlsx","ppt","pptx","odt","ods"]):
                files = self._apply_filter(files, [filter])               
            elif "image" in filter:
                files = self._apply_filter(files, ["png","jpg","jpeg","webp","gif","tiff"])


        context = []
        content = []
        for file in files:
            filename = file['Key'].split("/")[-1]
            context.append( Document(page_content=filename, metadata={"file":filename, "type":filename.split(".")[-1]}))
            content.append(f"{filename} Updated:{file['LastModified'].strftime('%m/%d/%Y, %H:%M:%S')} Size: {file['Size']}")

        
        output =  {"context":context , "content":content}
        
        return output
    
    def _apply_filter(self, files:List[str], filters:List[str]) -> List[str]:
        filtered_files = []
        for file in files:
            if any(filt in file['Key'] for filt in filters):
                filtered_files.append(file)
        return filtered_files
                                    


        
        



    