resource "google_sql_database_instance" "default" {
  name             = "discontinuity-api-db"
  database_version = "POSTGRES_12"
  region           = "europe-west1"

  settings {
    tier = "db-f1-micro"
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
