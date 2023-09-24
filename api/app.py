import logging
import string, random, time
from dotenv import load_dotenv

# For local testing
load_dotenv()

from typing import Any, Dict, List, Union
from enum import Enum
from fastapi import FastAPI, Security, Depends, FastAPI, HTTPException, Request
from fastapi.security.api_key import APIKeyQuery, APIKeyHeader, APIKey
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, RedirectResponse
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_422_UNPROCESSABLE_ENTITY
from fastapi.middleware.cors import CORSMiddleware

from discontinuity_api.routes import auth_router, admin_router, discontinuity_router, workspace_router
from discontinuity_api.vector import load_local_vector_db

from dotenv import load_dotenv

# For local testing
load_dotenv()

logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)


app = FastAPI(
    title="Discontinuity Platform API",
    description="This API will connect directly to your Discontinuity platform instance",
    version="0.0.1",
    contact={
        "name": "John Carpenter",
        "url": "http://discontinuity.ai/contact/",
        "email": "support@discontinuity.ai",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    idem = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    logger.info(f"rid={idem} start request path={request.url.path}")
    start_time = time.time()

    response = await call_next(request)

    process_time = (time.time() - start_time) * 1000
    formatted_process_time = "{0:.2f}".format(process_time)
    logger.info(
        f"rid={idem} completed_in={formatted_process_time}ms status_code={response.status_code}"
    )

    return response


@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")


@app.get("/ping", include_in_schema=False)
async def root():
    return {"version": "0.0.1"}


# Authentiction routes
app.include_router(router=auth_router)

# Admin routes
app.include_router(router=admin_router)

# Discontinuity routes
app.include_router(router=discontinuity_router)

# Workspace routes
app.include_router(router=workspace_router)
