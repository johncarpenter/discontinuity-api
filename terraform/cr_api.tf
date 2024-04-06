resource "google_cloud_run_v2_service" "api" {
  name     = "discontinuity-api-service"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
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
