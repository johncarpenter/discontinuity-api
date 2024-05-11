from pydantic import BaseModel, Field
from typing import Optional


class LLMModel(BaseModel):
    """
    This model represents a LLM Model created by the user
    """

    id: str = None
    name: str = Field(description="Name of the model")
    apikey: Optional[str] = None
    source: str = Field(description="Source of the model")
    
