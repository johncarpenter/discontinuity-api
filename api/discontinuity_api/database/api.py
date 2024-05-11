from discontinuity_api.models.llmmodel import LLMModel
from .dbmodels import ApiKeyDb, FlowDb, WorkspaceDb, LLMModelDb
from discontinuity_api.models import ApiKey, Workspace, Flow
from sqlalchemy.orm import Session


def find_api_key(session: Session, client_id: str, client_secret) -> ApiKey:
    api_key = (
        session.query(ApiKeyDb)
        .filter(
            ApiKeyDb.client_id == client_id, ApiKeyDb.client_secret == client_secret
        )
        .first()
    )

    if api_key is None:
        return None

    permissions = api_key.permissions.split(",")

    return ApiKey(
        id=api_key.id,
        client_id=api_key.client_id,
        client_secret=api_key.client_secret,
        permissions=permissions,
    )


def get_workspace(session: Session, api_key_id: int) -> Workspace:
    apikey = (
        session.query(ApiKeyDb)
        .join(WorkspaceDb)
        .filter(ApiKeyDb.id == api_key_id)
        .first()
    )

    if apikey is None or apikey.workspace is None:
        return None
    

    return Workspace(
        id=apikey.workspace.id,
        name=apikey.workspace.name,
        slug=apikey.workspace.slug,
        api_keys=[
            ApiKey(
                id=apikey.id,
                client_id=apikey.client_id,
                permissions=apikey.permissions.split(","),
            )
        ]
    )

def getFlow(session: Session, flow_id: int) -> Workspace:
    flow = (
        session.query(FlowDb)
        .join(WorkspaceDb)
        .filter(FlowDb.id == flow_id)
        .first()
    )

    if flow is None:
        return None
    
    return Flow(
        id=flow.id,
        name=flow.name,
        description=flow.description,
        apikey=flow.apikey,
        endpoint=flow.endpoint,
    )

def getLLMModel(session: Session, model_id: int)-> LLMModel:
    model = (
        session.query(LLMModelDb)
        .filter(LLMModelDb.id == model_id)
        .first()
    )

    if model is None:
        return None
    
    return LLMModel(
        id=model.id,
        name=model.name,
        apikey=model.apikey,
        source=model.source,
    )