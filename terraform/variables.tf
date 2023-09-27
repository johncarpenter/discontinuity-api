variable "project_id" {
  type    = string
  default = "discontinuity-ai"
}

variable "cluster_name" {
  type    = string
  default = "discontinuity-cluster"
}


variable "postgres_password" {
  type = string
}

variable "jwt_secret" {
  type = string
}

variable "openai_api_key" {
  type = string
}

variable "host" {
  type    = string
  default = "http://localhost:8000"

}

variable "region" {
  type    = string
  default = "europe-west1"
}

variable "google_client_id" {
  type = string
}

variable "google_client_secret" {
  type = string
}

variable "email_from" {
  type = string
}

variable "email_server_api_key" {
  type = string
}

variable "next_public_publishable_key" {
  type = string
}

variable "payments_secret_key" {
  type = string
}


