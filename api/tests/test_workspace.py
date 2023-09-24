from fastapi.testclient import TestClient
import pytest

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
