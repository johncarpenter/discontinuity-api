## Create the alchemy models for the database. ApiKey, and Workspace with many ApiKeys
import os
from datetime import datetime, timezone
from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = os.getenv("POSTGRES_URL")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


# Define the Workspace model
class WorkspaceDb(Base):
    # __table__ = Table("workspaces", Base.metadata, autoload_with=engine)
    __tablename__ = "workspaces"
    id = Column(String, primary_key=True)
    name = Column(String)
    slug = Column(String)
    ownerId = Column(String)
    createdAt = Column(DateTime, default=datetime.now(timezone.utc))
    deletedAt = Column(DateTime)
    updatedAt = Column(DateTime)



# Define the ApiKey model
class ApiKeyDb(Base):
    # __table__ = Table("apikeys", Base.metadata, autoload_with=engine)
    # workspace = relationship("WorkspaceDb")

    __tablename__ = "apikeys"
    id = Column(String, primary_key=True)
    client_id = Column(String)
    client_secret = Column(String)
    permissions = Column(String)
    createdAt = Column(DateTime, default=datetime.now(timezone.utc))
    deletedAt = Column(DateTime)
    updatedAt = Column(DateTime)
    workspaceId = Column(String, ForeignKey("workspaces.id"))

    workspace = relationship("WorkspaceDb")


# Define the ApiKey model
class FlowDb(Base):
    # __table__ = Table("apikeys", Base.metadata, autoload_with=engine)
    # workspace = relationship("WorkspaceDb")

    __tablename__ = "flows"
    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    apikey = Column(String)
    endpoint = Column(String)
    createdAt = Column(DateTime, default=datetime.now(timezone.utc))
    deletedAt = Column(DateTime)
    updatedAt = Column(DateTime)
    workspaceId = Column(String, ForeignKey("workspaces.id"))

    workspace = relationship("WorkspaceDb")


class LLMModelDb(Base):
    __tablename__ = "llmmodels"
    id = Column(String, primary_key=True)
    name = Column(String)
    apikey = Column(String)
    source = Column(String)
    createdAt = Column(DateTime, default=datetime.now(timezone.utc))
    deletedAt = Column(DateTime)
    updatedAt = Column(DateTime)
    organizationId = Column(String)

class PromptDb(Base):
    __tablename__ = "prompts"
    id = Column(String, primary_key=True)
    name = Column(String)
    prompt = Column(String)
    createdAt = Column(DateTime, default=datetime.now(timezone.utc))
    deletedAt = Column(DateTime)
    updatedAt = Column(DateTime)
    organizationId = Column(String)


class FileDb(Base):
    __tablename__ = "files"
    id = Column(String, primary_key=True)
    filename = Column(String)
    oai_fileid = Column(String)
    createdAt = Column(DateTime, default=datetime.now(timezone.utc))
    deletedAt = Column(DateTime)
    updatedAt = Column(DateTime)
    workspaceId = Column(String, ForeignKey("workspaces.id"))

    workspace = relationship("WorkspaceDb")


class OrganizationDb(Base):
    __tablename__ = "organizations"
    id = Column(String, primary_key=True)
    name = Column(String)
    clerk_id = Column(String)
    createdAt = Column(DateTime, default=datetime.now(timezone.utc))
    deletedAt = Column(DateTime)
    updatedAt = Column(DateTime)