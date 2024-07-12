## Retrieve the model from the db

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from openai import OpenAI
from discontinuity_api.database.dbmodels import get_db
from discontinuity_api.database.api import getLLMModel
from sqlalchemy.orm import Session

import logging
logger = logging.getLogger(__name__)

def get_model_by_id(session: Session, model_id:str):
    """
    Get the model by id. Possible sources are;
    OPENAI
    ANTHROPIC
    COHERE
    GEMINI
    MISTRAL
    LLAMA3
    CUSTOM (replicate model)
    """

    if not model_id:
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4o") 
  
    llmmodel = getLLMModel(session=session, model_id=model_id)

    if llmmodel is None:
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4o")
    
    if(llmmodel.source == "OPENAI"):
        logger.info("Using Organization OpenAI model")
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4o", api_key=llmmodel.apikey) 
    elif(llmmodel.source == "GEMINI"):
        logger.info("Using Organization Gemini model")
        return ChatGoogleGenerativeAI(streaming=True,temperature=0.8, model='gemini-pro', google_api_key=llmmodel.apikey)
    elif(llmmodel.source == "ANTHROPIC"):
        logger.info("Using Organization Anthropic model")
        return ChatAnthropic(streaming=True,temperature=0.8, model='claude-3-5-sonnet-20240620', api_key=llmmodel.apikey)
    else:
        logger.warn("Using Default OpenAI model, looking for ", llmmodel.source, " model (Not implemented)")
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4o")

def get_openai_model(session: Session, model_id:str):

    llmmodel = getLLMModel(session=session, model_id=model_id)
    if llmmodel.source == "OPENAI":
        return OpenAI(api_key=llmmodel.apikey)
    else:
        raise Exception("Model is not an OpenAI model")
