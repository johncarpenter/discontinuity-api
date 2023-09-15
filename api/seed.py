from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# For local testing
load_dotenv()

from discontinuity_api.database import Base, ApiKeyDb, WorkspaceDb
from discontinuity_api.models import ApiKey


default_api_keys = [
    {
        "workspace": {
            "name": "Discontinuity",
            "api_keys": [
                {
                    "client_id": "8fb4397512a54f88254cad18f08d74ad",
                    "client_secret": "eff8d4f7fca1d029068fe24c13b655df",
                    "permissions": "admin",
                }
            ],
        }
    }
]


def seed():
    engine = create_engine(os.getenv("POSTGRES_URL"))
    Session = sessionmaker(bind=engine)
    session = Session()

    Base.metadata.create_all(engine)

    current = (
        session.query(WorkspaceDb).filter(WorkspaceDb.name == "Discontinuity").all()
    )

    # Add an admin api key to the database
    for api_key in default_api_keys:
        workspace = WorkspaceDb(name=api_key["workspace"]["name"])
        workspace.api_keys = []
        for key in api_key["workspace"]["api_keys"]:
            workspace.api_keys.append(
                ApiKeyDb(
                    client_id=key["client_id"],
                    client_secret=key["client_secret"],
                    permissions=key["permissions"],
                )
            )

        current = (
            session.query(WorkspaceDb)
            .filter(WorkspaceDb.name == workspace.name)
            .first()
        )
        if current is None:
            session.add(workspace)

    session.commit()
    session.close()


if __name__ == "__main__":
    seed()
