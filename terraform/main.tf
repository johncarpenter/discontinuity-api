#  Cloud build .googleapis need to be enabled on the project
#
# gcloud config set project ${{ secrets.GCP_PROJECT }}
# gcloud builds submit --tag gcr.io/${{ secrets.GCP_PROJECT }}/${{ secrets.GCP_APPLICATION }}

terraform {
  required_version = ">= 1.3"

  required_providers {
    google = ">= 3.3"
  }
}

resource "google_project_service" "run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = true
}

resource "google_project_service" "sql_admin_api" {
  service = "sqladmin.googleapis.com"

  disable_on_destroy = true
}

resource "google_project_service" "cloud_tasks_api" {
  service = "cloudtasks.googleapis.com"

  disable_on_destroy = true

}
