## Create the alchemy models for the database. ApiKey, and Workspace with many ApiKeys
import os
from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey
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
    __tablename__ = 'workspace'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)
    
    api_keys = relationship("ApiKeyDb", back_populates="workspace")

# Define the ApiKey model
class ApiKeyDb(Base):
    __tablename__ = 'api_key'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(String, unique=True, nullable=False)
    client_secret = Column(String, nullable=False)
    permissions = Column(String, default="access")  # csv of permissions

    workspace_id = Column(Integer, ForeignKey('workspace.id'))
    workspace = relationship("WorkspaceDb", back_populates="api_keys")




