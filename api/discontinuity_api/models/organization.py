from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class OrganizationType(str, Enum):
    INDIVIDUAL = "individual"
    ORGANIZATION = "organization"


class Organization(BaseModel):
    """
    This model represents an organization that a user belongs to. type individual for no organization
    """

    id: str = None
    name: str = Field(description="Name of the organization")
    type: OrganizationType = Field(description="Type of organization", default=OrganizationType.INDIVIDUAL) 
    


