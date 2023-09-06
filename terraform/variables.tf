variable "project_id" {
  type    = string
  default = "discontinuity-ai"
}

variable "docker_name" {
  type    = string
  default = "discontinuity-api"
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





