# Running Locally

## Running Tests

```bash
pytest 
```

## Running the API

```bash
uvicorn main:app --reload
```


## Prerequisites

Install Cloud Proxy to connect to Cloud SQL

[Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/mysql/sql-proxy)

For Mac M1:

```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.6.1/cloud-sql-proxy.darwin.arm64

```

Run Cloud Proxy

```bash
./cloud-sql-proxy "discontinuity-ai:europe-west1:discontinuity-api-db?port=5432"
```
gcloud container clusters get-credentials discontinuity-cluster --location=europe-west1



Manual builds

```bash

docker build -t discontinuity-api .
gcloud builds submit --tag gcr.io/discontinuity-ai/discontinuity-api:latest

```



gcloud auth application-default login