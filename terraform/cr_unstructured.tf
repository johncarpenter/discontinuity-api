resource "google_cloud_run_v2_service" "unstructured" {
  name     = "discontinuity-unstructured-service"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      max_instance_count = 10
      min_instance_count = 0
    }

    containers {
      image = "gcr.io/${var.project_id}/discontinuity-unstructured:latest"
      name  = "unstructured"
      ports {
        container_port = 8000
      }
      resources {
        limits = {
          cpu    = "1"
          memory = "4096Mi"
        }
      }
    }

  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}


data "google_iam_policy" "unstructured-noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "unstructured-noauth" {
  location = google_cloud_run_v2_service.unstructured.location
  project  = google_cloud_run_v2_service.unstructured.project
  service  = google_cloud_run_v2_service.unstructured.name

  policy_data = data.google_iam_policy.unstructured-noauth.policy_data
}

resource "google_cloud_run_domain_mapping" "unstructured" {
  location = var.region
  name     = "unstructured.discontinuity.ai"
  spec {
    route_name = google_cloud_run_v2_service.unstructured.name
  }
  metadata {
    namespace = var.project_id
  }
}
