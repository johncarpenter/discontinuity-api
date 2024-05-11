## Retrieve the model from the db

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from discontinuity_api.database.dbmodels import get_db
from discontinuity_api.database.api import getLLMModel

import logging
logger = logging.getLogger(__name__)

def get_model_by_id(model_id:str):
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
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4-turbo") 
    
    session = next(get_db())
    llmmodel = getLLMModel(session=session, model_id=model_id)

    if llmmodel is None:
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4-turbo")
    
    if(llmmodel.source == "OPENAI"):
        logger.info("Using Organization OpenAI model")
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4-turbo", api_key=llmmodel.apikey) 
    elif(llmmodel.source == "GEMINI"):
        logger.info("Using Organization Gemini model")
        return ChatGoogleGenerativeAI(streaming=True,temperature=0.8, model='gemini-pro', api_key=llmmodel.apikey)
    else:
        logger.info("Using Default OpenAI model, looking for ", llmmodel.source, " model (Not implemented)")
        return ChatOpenAI(streaming=True,temperature=0.8, model="gpt-4-turbo")
