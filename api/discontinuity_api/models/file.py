from pydantic import BaseModel, Field
from typing import Optional

class File(BaseModel):
    """
    This is a reference to a file that is stored in the s3 bucket
    """

    id: str = None
    filename: str = Field(description="Filename")
    oai_fileid: Optional[str] = Field(description="OpenAI fileid of the uploaded assistants file")
    workspaceId: str = Field(description="The workspace this file belongs to")