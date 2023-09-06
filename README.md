# Running Locally

## Prerequisites

Install Cloud Proxy to connect to Cloud SQL

[Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/mysql/sql-proxy)

For Mac M1:

```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.6.1/cloud-sql-proxy.darwin.arm64

```

Run Cloud Proxy

```bash
./cloud-sql-proxy "blacksquare-infrastructure:europe-west1:discontinuity-api-db?port=5432"
```
