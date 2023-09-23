## Create the alchemy models for the database. ApiKey, and Workspace with many ApiKeys
import os
import datetime
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
    workspaceCode = Column(String, unique=True)
    inviteCode = Column(String)
    name = Column(String)
    slug = Column(String)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
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
    workspaceId = Column(Integer, ForeignKey("workspaces.id"))

    workspace = relationship("WorkspaceDb")
