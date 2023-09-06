resource "google_cloud_run_service" "default" {
  name                       = "discontinuity-api-db"
  location                   = "europe-west1"
  autogenerate_revision_name = true

  template {
    spec {
      service_account_name = google_service_account.service_account.email
      containers {
        image = "gcr.io/${var.project_id}/${var.docker_name}:latest"
        env {
          name  = "POSTGRES_URL"
          value = "postgresql+psycopg2://postgres:${var.postgres_password}@/discontinuity-api-db?host=/cloudsql/${google_sql_database_instance.default.connection_name}"
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
          value = "postgresql+psycopg2://postgres:${var.postgres_password}@/discontinuity-api-db?host=/cloudsql/${google_sql_database_instance.default.connection_name}"
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
    metadata {
      annotations = {
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.default.connection_name
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.run_api, google_project_iam_member.member-role]
  # On a fresh deploy, if there is no image it will fail. This is a workaround
  #ignore_changes = [template[0].spec[0].containers[0].image]
}

# Service account to run cloud run, needs access to cloud tasks and cloud sql
resource "google_service_account" "service_account" {
  account_id   = "discontinuity-api-cloudrun-id"
  display_name = "discontinuity API Cloud Run Service Account"
  project      = var.project_id
}

resource "google_project_iam_member" "member-role" {
  for_each = toset([
    "roles/cloudsql.client",
    "roles/cloudtasks.admin",
    "roles/cloudtasks.enqueuer",
    "roles/cloudtasks.queueAdmin",
    "roles/cloudtasks.viewer",
    "roles/iam.serviceAccountUser",
    "roles/run.admin",
    "roles/run.invoker",
    "roles/run.serviceAgent",
  ])
  role    = each.key
  member  = "serviceAccount:${google_service_account.service_account.email}"
  project = var.project_id
}


# enable cloud sql admin api

resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}


resource "google_cloud_tasks_queue" "default" {
  name     = "discontinuity-api-task-queue"
  location = "europe-west1"
}
