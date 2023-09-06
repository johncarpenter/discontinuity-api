terraform {
  backend "gcs" {
    bucket = "discontinuity-api-terraform-state"
    prefix = "staging"
  }
}

provider "google" {
  project = var.project_id
}
