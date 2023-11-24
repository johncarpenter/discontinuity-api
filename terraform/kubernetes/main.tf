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


resource "google_container_cluster" "primary" {
  name                     = var.cluster_name
  location                 = var.region
  remove_default_node_pool = true
  initial_node_count       = 1

  # Enable Workload Identity
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}


resource "google_container_node_pool" "primary" {
  name       = "discontinuity-node-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = 1


  node_config {
    workload_metadata_config {
      mode = "GKE_METADATA"
    }
    service_account = google_service_account.service_account.email
    machine_type    = "n1-standard-1"
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only",
    ]
  }
}

data "google_client_config" "default" {
}

provider "kubernetes" {

  host = "https://${google_container_cluster.primary.endpoint}"
  #   username = var.gke_username
  #   password = var.gke_password

  token                  = data.google_client_config.default.access_token
  client_certificate     = base64decode(google_container_cluster.primary.master_auth[0].client_certificate)
  client_key             = base64decode(google_container_cluster.primary.master_auth[0].client_key)
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}



