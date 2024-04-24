from pydantic import BaseModel, Field
from typing import Optional


class Flow(BaseModel):
    """
    This model represents a link to the flowise api
    """

    id: str = None
    endpoint: str = Field(description="Full endpoint URL for the Flowise API")
    # API key for FLowise not our internal API key
    apikey: Optional[str] = None

