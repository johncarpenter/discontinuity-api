from pydantic import BaseModel, Field
from typing import Optional


class Prompt(BaseModel):
    """
    This model represents a LLM Model created by the user
    """

    id: str = None
    name: str = Field(description="Name of the model")
    prompt: str = Field(description="Prompt for the model to follow")
    
    
