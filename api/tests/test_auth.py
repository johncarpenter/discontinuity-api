from fastapi.testclient import TestClient
import pytest

from app import app

client = TestClient(app)

def test_read_main():
    response = client.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"version": "0.0.1"}


# basic auth endpoint (for zapier)
def test_me_missing_auth():
    response = client.get("/auth/me")
    assert response.status_code == 403


def test_me_invalid_auth():
    response = client.get("/auth/me",
                          headers={"Authorization": f"Bearer invalid"},)
    assert response.status_code == 403


def test_me_valid_auth(get_valid_bearer_token):
    response = client.get(
        "/auth/me", 
         headers={"Authorization": f"Bearer {get_valid_bearer_token}"},
    )
    assert response.status_code == 200
    assert response.json() == {"workspace": "testing", "scope": ["test_scope"]}

