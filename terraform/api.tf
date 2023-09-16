#
# Creates the API service
#

resource "kubernetes_namespace" "api_namespace" {
  metadata {
    labels = {
      app = "api"
    }
    name = "api"
  }
}

resource "kubernetes_deployment" "api_deployment" {
  metadata {
    name      = "discontinuity-api-deployment"
    namespace = kubernetes_namespace.api_namespace.metadata.0.name
    labels = {
      app = "api"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "api"
      }
    }
    template {
      metadata {
        labels = {
          app = "api"
        }
      }
      spec {
        container {
          image = "gcr.io/${var.project_id}/discontinuity-api:latest"
          name  = "api"

          env {
            name = "POSTGRES_URL"
            # value = "postgresql+psycopg2://postgres:${var.postgres_password}@/discontinuity-api-db?host=/cloudsql/${google_sql_database_instance.default.connection_name}"
            value = "postgresql+psycopg2://postgres:${var.postgres_password}@34.34.179.242/discontinuity-api-db"

          }
          env {
            name  = "JWT_SECRET"
            value = var.jwt_secret
          }
          env {
            name  = "ENVIRONMENT"
            value = "production"
          }
          env {
            name  = "VECTORDB_URL"
            value = "postgresql+psycopg2://postgres:${var.postgres_password}@/discontinuity-api-db?host=/cloudsql/${google_sql_database_instance.default.connection_name}"
          }
          env {
            name  = "OPENAI_API_KEY"
            value = var.openai_api_key
          }
          env {
            name  = "HOST"
            value = var.host
          }
          env {
            name  = "PORT"
            value = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "api_service" {
  depends_on = [kubernetes_deployment.api_deployment]

  metadata {
    labels = {
      app = "api"
    }
    name      = "api"
    namespace = kubernetes_namespace.api_namespace.metadata.0.name
  }

  spec {
    port {
      name        = "api"
      port        = 80
      target_port = 3000
    }
    selector = {
      app = "api"
    }
    type = "NodePort"
  }
}



