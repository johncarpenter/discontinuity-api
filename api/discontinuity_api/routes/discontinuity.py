from fastapi.params import Depends
from fastapi import HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel
import logging
from discontinuity_api.utils import JWTBearer
from discontinuity_api.workers import retrieval_qa
from discontinuity_api.vector import load_local_vector_db
from fastapi import APIRouter

from fastapi import Request


logger = logging.getLogger(__name__)


router = APIRouter(
    prefix="/discontinuity", tags=["discontinuity"], include_in_schema=False
)


class Query(BaseModel):
    query: str


DISCONTINUITY_PROMPT = """
You are a bot tasked to help people find information about a website. You have been asked to answer the following question to the best of your ability using the context provided
Provide as much detail as possible

{context}

If you don't know the answer, just say that you don't know, don't try to make up an answer. Avoid answering questions that are not related the discontinuity.ai website.
Don't include url links unless they are specifically asked for.

Question: {question}
"""

discontinuity_db = None


def load_discontinuity_db():
    global discontinuity_db
    if discontinuity_db is None:
        logger.info("Loading discontinuity DB")
        discontinuity_db = load_local_vector_db(table_name="discontinuity")
    return discontinuity_db


@router.post("/site/query")
async def demo(
    query: Query,
    workspace=Depends(JWTBearer()),
    discontinuity_db=Depends(load_discontinuity_db),
):
    """
    Retrieval QA demo using the Website MD
    """
    logger.info("Launching discontinuity Demo Query: %s", query.query)

    reponse = retrieval_qa(index=discontinuity_db, query=query.query)

    return reponse
