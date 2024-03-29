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
ENV AWS_DEFAULT_REGION=us-west-2

# You can install a specific version like: flowise@1.0.0
RUN npm install -g flowise@1.6.2

WORKDIR /data

CMD flowise start