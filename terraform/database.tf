resource "google_sql_database_instance" "default" {
  name             = "discontinuity-api-db"
  database_version = "POSTGRES_12"
  region           = var.region

  settings {
    tier = "db-f1-micro"
    database_flags {
      name  = "max_connections"
      value = 100
    }
  }
}

resource "google_sql_database" "default" {
  name     = "discontinuity-api-db"
  instance = google_sql_database_instance.default.name
  charset  = "utf8"
}

resource "google_sql_user" "users" {
  name     = "postgres"
  instance = google_sql_database_instance.default.name
  password = var.postgres_password
}

resource "google_sql_database" "flow" {
  name     = "flowise"
  instance = google_sql_database_instance.default.name
  charset  = "utf8"
}

resource "google_sql_user" "vectordb_user" {
  name     = "flow"
  instance = google_sql_database_instance.default.name
  password = var.flow_postgres_password
}



# IAM Service Account that can access the database within GCP
resource "google_service_account" "service_account" {
  account_id   = "discontinuity-cluster"
  display_name = "Gives access within GCP to the database"
  project      = var.project_id
}

# resource "google_project_iam_binding" "cloudsql_client" {
#   role    = "roles/cloudsql.client"
#   members = [
#     "serviceAccount:cloud-sql-access@${data.google_project.project.project_id}.iam.gserviceaccount.com",
#   ]
# }

# Extended for cloud tasks and bigquery too
resource "google_project_iam_member" "member-role" {
  for_each = toset([
    "roles/cloudsql.client",
    "roles/cloudsql.instanceUser",
    "roles/cloudtasks.admin",
    "roles/cloudtasks.enqueuer",
    "roles/cloudtasks.queueAdmin",
    "roles/cloudtasks.viewer",
    "roles/iam.serviceAccountUser",
    "roles/storage.objectViewer",
    "roles/bigquery.dataViewer",
    "roles/bigquery.jobUser",
    "roles/iam.workloadIdentityUser"
  ])
  role    = each.key
  member  = "serviceAccount:${google_service_account.service_account.email}"
  project = var.project_id
}
