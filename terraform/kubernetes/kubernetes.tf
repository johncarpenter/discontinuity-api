resource "google_container_cluster" "primary" {
  name                     = var.cluster_name
  location                 = "europe-west1-b"
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
  name               = "discontinuity-node-pool"
  location           = "europe-west1-b"
  cluster            = google_container_cluster.primary.name
  initial_node_count = 0
  autoscaling {
    min_node_count = 0
    max_node_count = 3
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }



  node_config {
    workload_metadata_config {
      mode = "GKE_METADATA"
    }
    service_account = google_service_account.service_account.email
    machine_type    = "n1-standard-1"

    preemptible = true # Preemptible needs to be true
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



