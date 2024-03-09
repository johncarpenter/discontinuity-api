from fastapi.testclient import TestClient
import pytest
from discontinuity_api.vector.base import get_faiss_vector_db

from app import app

client = TestClient(app)



def test_workspace_query(get_valid_bearer_token):
    response = client.post(
        "/workspace/debug",
        headers={"Authorization": f"Bearer {get_valid_bearer_token}"},
        json={"message": "Does this work?"},
    )

    print(response.json())
    assert response.status_code == 200

def test_workspace_text(get_valid_bearer_token):
    response = client.post(
        "/workspace/text",
        headers={"Authorization": f"Bearer {get_valid_bearer_token}"},
        json={"content": "Does this work?"},
    )

    print(response.json())
    assert response.status_code == 200
    assert response.json() == {"status": "added"}

def test_workspace_search(get_valid_bearer_token):
    response = client.post(
        "/workspace/search",
        headers={"Authorization": f"Bearer {get_valid_bearer_token}"},
        json={"message": "Does this work?"},
    )

    print(response.json())
    assert response.status_code == 200
    first = response.json()[0]
    assert first["score"] > 0
    assert first["content"] == "does this work?"
