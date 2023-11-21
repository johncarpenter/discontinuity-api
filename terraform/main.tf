#  Cloud build .googleapis need to be enabled on the project
#
# gcloud config set project ${{ secrets.GCP_PROJECT }}
# gcloud builds submit --tag gcr.io/${{ secrets.GCP_PROJECT }}/${{ secrets.GCP_APPLICATION }}

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


# VPC
resource "google_compute_network" "vpc" {
  name                    = "${var.project_id}-vpc"
  auto_create_subnetworks = "false"
}

# Subnet
resource "google_compute_subnetwork" "subnet" {
  name          = "${var.project_id}-subnet"
  region        = var.region
  network       = google_compute_network.vpc.name
  ip_cidr_range = "10.10.0.0/24"
}
