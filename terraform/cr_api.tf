resource "google_cloud_run_v2_service" "api" {
  name     = "discontinuity-api-service"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = 1
      max_instance_count = 2
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.default.connection_name]
      }
    }

    containers {
      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }

      image = "gcr.io/${var.project_id}/discontinuity-api:latest"
      name  = "api"
      ports {
        container_port = 8000
      }

      env {
        name  = "POSTGRES_URL"
        value = "postgresql://postgres:${var.postgres_password}@34.34.179.242/discontinuity-api-db"
      }
      env {
        name  = "JWT_SECRET"
        value = var.jwt_secret
      }
      env {
        name  = "ENVIRONMENT"
        value = "production"
      }
      env {
        name  = "VECTORDB_URL"
        value = "postgresql://postgres:${var.postgres_password}@34.34.179.242/discontinuity-api-db"
      }
      env {
        name  = "OPENAI_API_KEY"
        value = var.openai_api_key
      }
      env {
        name  = "HOST"
        value = var.host
      }
      env {
        name  = "AWS_ACCESS_KEY_ID"
        value = var.aws_access_key_id
      }
      env {
        name  = "AWS_SECRET_ACCESS_KEY"
        value = var.aws_secret_access_key
      }
      env {
        name  = "AWS_BUCKET"
        value = "discontinuity-rag-serverless-prod"
      }
      env {
        name  = "LANGCHAIN_TRACING_V2"
        value = "true"
      }
      env {
        name  = "LANGCHAIN_API_KEY"
        value = "ls__83c04a774aef4f8e913ee1397cd6ea8b"
      }
      env {
        name  = "LANGCHAIN_PROJECT"
        value = "python-prod"
      }
      env {
        name  = "COHERE_API_KEY"
        value = var.cohere_api_key
      }
      env {
        name  = "QDRANT_API_KEY"
        value = var.qdrant_api_key
      }
      env {
        name  = "QDRANT_URL"
        value = var.qdrant_url
      }
      env {
        name  = "UPSTASH_REDIS_REST_URL"
        value = var.upstash_redis_rest_url
      }
      env {
        name  = "UPSTASH_REDIS_REST_TOKEN"
        value = var.upstash_redis_rest_token
      }
      env {
        name  = "TAVILY_API_KEY"
        value = var.tavily_api_key
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}


data "google_iam_policy" "api-noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "api-noauth" {
  location = google_cloud_run_v2_service.api.location
  project  = google_cloud_run_v2_service.api.project
  service  = google_cloud_run_v2_service.api.name

  policy_data = data.google_iam_policy.api-noauth.policy_data
}

resource "google_cloud_run_domain_mapping" "api" {
  location = var.region
  name     = "api.discontinuity.ai"
  spec {
    route_name = google_cloud_run_v2_service.api.name
  }
  metadata {
    namespace = var.project_id
  }
}
