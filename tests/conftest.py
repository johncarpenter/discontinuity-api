from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker
import pytest
from app import app
from fastapi.testclient import TestClient
from discontinuity_api.database import Base, ApiKeyDb, WorkspaceDb, get_db
import os
import logging

logging.config.fileConfig("./logging.conf", disable_existing_loggers=False)


def seed_database():
    print("seed_database")
    engine = create_engine(os.getenv("POSTGRES_URL"))
    Session = sessionmaker(bind=engine)
    session = Session()

    Base.metadata.drop_all(engine)

    Base.metadata.create_all(engine)

    workspace = WorkspaceDb(name="testing")
    workspace.api_keys = []
    workspace.api_keys.append(
        ApiKeyDb(client_id="testing", client_secret="testing", permissions="test_scope")
    )
    session.add(workspace)

    workspace = WorkspaceDb(name="admin")
    workspace.api_keys = []
    workspace.api_keys.append(
        ApiKeyDb(client_id="admin", client_secret="admin", permissions="admin")
    )
    session.add(workspace)

    session.commit()
    session.close()


client = TestClient(app)

TEST_CLIENT_ID = "testing"
TEST_CLIENT_SECRET = "testing"


# Fixture for Before the tests get a valid bearer token
@pytest.fixture()
def get_valid_bearer_token():
    seed_database()
    print("get_valid_bearer_token")
    response = client.post(
        "/auth/token",
        json={"client_id": TEST_CLIENT_ID, "client_secret": TEST_CLIENT_SECRET},
    )
    assert response.status_code == 200
    return response.json()["access_token"]


@pytest.fixture()
def get_valid_bearer_token_admin():
    seed_database()
    print("get_valid_bearer_token_admin")
    response = client.post(
        "/auth/token",
        json={"client_id": "admin", "client_secret": "admin"},
    )
    assert response.status_code == 200
    return response.json()["access_token"]
