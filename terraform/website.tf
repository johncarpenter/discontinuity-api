#
# Creates the website service
#


resource "kubernetes_deployment" "website_deployment" {
  metadata {
    name      = "discontinuity-website-deployment"
    namespace = kubernetes_namespace.api_namespace.metadata.0.name
    labels = {
      app = "website"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "website"
      }
    }
    template {
      metadata {
        labels = {
          app = "website"
        }
      }
      spec {
        container {
          image = "gcr.io/${var.project_id}/discontinuity-website:latest"
          name  = "website"
          env {
            name  = "PORT"
            value = 3000
          }
          env {
            name  = "HUBSPOT_TOKEN"
            value = "pat-na1-240b638c-51d1-4f6d-b81a-f3b8d7b90c33"
          }
          env {
            name  = "DATABASE_URL"
            value = "postgresql+psycopg2://postgres:${var.postgres_password}@34.34.179.242/discontinuity-api-db"
          }
          env {
            name  = "GOOGLE_CLIENT_ID"
            value = var.google_client_id
          }
          env {
            name  = "GOOGLE_CLIENT_SECRET"
            value = var.google_client_secret
          }
          env {
            name  = "APP_URL"
            value = "https://discontinuity.ai"
          }
          env {
            name  = "EMAIL_FROM"
            value = var.email_from
          }
          env {
            name  = "EMAIL_SERVER_API_KEY"
            value = var.email_server_api_key
          }
          env {
            name  = "NEXT_PUBLIC_PUBLISHABLE_KEY"
            value = var.next_public_publishable_key
          }
          env {
            name  = "PAYMENTS_SECRET_KEY"
            value = var.payments_secret_key
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "website_service" {
  depends_on = [kubernetes_deployment.website_deployment]

  metadata {
    labels = {
      app = "website"
    }
    name      = "website"
    namespace = kubernetes_namespace.api_namespace.metadata.0.name
  }

  spec {
    port {
      name        = "website"
      port        = 80
      target_port = 3000
    }
    selector = {
      app = "website"
    }
    type = "NodePort"
  }
}

