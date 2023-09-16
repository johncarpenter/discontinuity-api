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





