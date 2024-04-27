resource "google_cloud_run_v2_service" "flow" {
  name         = "discontinuity-flow-service"
  location     = var.region
  ingress      = "INGRESS_TRAFFIC_ALL"
  launch_stage = "BETA"

  template {
    scaling {
      max_instance_count = 1
      min_instance_count = 1
    }

    # volumes {
    #   name = "cloudsql"
    #   cloud_sql_instance {
    #     instances = [google_sql_database_instance.default.connection_name]
    #   }
    # }
    volumes {
      name = "bucket"

      gcs {
        bucket    = google_storage_bucket.default.name
        read_only = false
      }

    }

    containers {
      resources {
        limits = {
          cpu    = "1"
          memory = "4096Mi"
        }
      }
      # volume_mounts {
      #   name       = "cloudsql"
      #   mount_path = "/cloudsql"
      # }
      image = "gcr.io/${var.project_id}/discontinuity-flow:latest"
      name  = "flow"
      env {
        name  = "FLOWISE_USERNAME"
        value = "discontinuity"
      }
      env {
        name  = "FLOWISE_PASSWORD"
        value = "whd2eud2jcn8XQG_vhm"
      }
      env {
        name  = "DATABASE_PASSWORD"
        value = var.flow_postgres_password
      }

      env {
        name  = "FLOWISE_SECRETKEY_OVERWRITE"
        value = "whd2eud2jcn8XQG_vhm"
      }

      env {
        name  = "S3_STORAGE_ACCESS_KEY_ID"
        value = var.flow_s3_storage_access_key_id
      }

      env {
        name  = "S3_STORAGE_SECRET_ACCESS_KEY"
        value = var.flow_s3_storage_secret_access_key
      }

      env {
        name  = "BLOB_STORAGE_PATH"
        value = "/mnt/bucket"
      }

      env {
        name  = "STORAGE_TYPE"
        value = "local"

      }

    }

  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}


data "google_iam_policy" "flow-noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "flow-noauth" {
  location = google_cloud_run_v2_service.flow.location
  project  = google_cloud_run_v2_service.flow.project
  service  = google_cloud_run_v2_service.flow.name

  policy_data = data.google_iam_policy.flow-noauth.policy_data
}

resource "google_cloud_run_domain_mapping" "flow" {
  location = var.region
  name     = "flow.discontinuity.ai"
  spec {
    route_name = google_cloud_run_v2_service.flow.name
  }
  metadata {
    namespace = var.project_id
  }
}

resource "google_storage_bucket" "default" {
  name     = "discontinuity-flow-storage"
  location = "US"
}
