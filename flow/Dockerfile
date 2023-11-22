# FROM python:3.10-slim

# RUN apt-get update && apt-get install gcc g++ git make -y
# RUN useradd -m -u 1000 user
# #USER user
# ENV HOME=/home/user \
#     PATH=/home/user/.local/bin:$PATH

# ENV LANGFLOW_PORT=7860
# ENV LANGFLOW_HOST=0.0.0.0
# ENV LANGFLOW_REMOVE_API_KEYS=true
# ENV LANGFLOW_DATABASE_URL=sqlite:///./langflow.db

# WORKDIR $HOME/app

# COPY --chown=user . $HOME/app

# # Update to 0.50 when it's released for the auth updates -U --user
# RUN pip install langflow==0.5.1

# CMD langflow run

FROM node:18-alpine

USER root

RUN apk add --no-cache git
RUN apk add --no-cache python3 py3-pip make g++
# needed for pdfjs-dist
RUN apk add --no-cache build-base cairo-dev pango-dev

# Install Chromium
RUN apk add --no-cache chromium

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV DATABASE_TYPE=postgres
ENV DATABASE_PORT=5432
ENV DATABASE_HOST=34.34.179.242
ENV DATABASE_NAME=flowise
ENV DATABASE_USER=flow
#ENV OVERRIDE_DATABASE=false

ENV FLOWISE_SECRETKEY_OVERWRITE=myencryptionkey
ENV SECRETKEY_PATH=/data/keys

# You can install a specific version like: flowise@1.0.0
RUN npm install -g flowise

WORKDIR /data

CMD flowise start