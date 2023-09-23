from pydantic import BaseModel, Field
from typing import Optional


class ApiKey(BaseModel):
    """
    This is the user that is authenticated by the API Key
    """

    id: str = None
    client_id: str = Field(description="Client ID from the API Console")
    client_secret: Optional[str] = None
    permissions: list[str] = Field(
        description="List of roles that the user has access to. This will be used to determine what the user has access to."
    )


class Workspace(BaseModel):
    """
    This is the workspace that the user is a part of. This will be used to determine what the user has access to.
    """

    id: str = None
    name: str = None
    api_keys: Optional[list[ApiKey]] = None


class JWTToken(BaseModel):
    """
    This is what will be embedded in the JWT token. Avoid putting sensitive information here.
    """

    id: str = None
    expires: int = None


class ClientIdSecret(BaseModel):
    client_id: str = Field(description="Client ID from the API Console")
    client_secret: str


class Token(BaseModel):
    access_token: str = Field(description="Access Token for the discontinuity API")
