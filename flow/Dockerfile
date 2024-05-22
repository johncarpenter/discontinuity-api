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
ENV AWS_REGION=us-west-2
ENV APIKEY_PATH=/mnt/bucket/apikeys
ENV LOG_PATH=/mnt/bucket/logs
ENV SECRETKEY_PATH=/mnt/bucket/secretkeys
ENV DISABLE_FLOWISE_TELEMETRY=true

#ENV STORAGE_TYPE=s3

#ENV S3_STORAGE_BUCKET_NAME=discontinuity-flowise-main
#ENV S3_STORAGE_REGION=us-west-2

# Latest version of flowise 1.6.6 updated Apr 26, 2024
RUN npm install -g flowise@1.6.6

WORKDIR /data

CMD flowise start