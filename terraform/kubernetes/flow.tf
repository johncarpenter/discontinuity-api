resource "google_compute_managed_ssl_certificate" "lb_flow" {
  name = "discontinuity-flow-cert"

  managed {
    domains = ["flow.discontinuity.ai"]
  }
}

resource "kubernetes_ingress_v1" "flow-ingress" {

  metadata {
    annotations = {
      #    "cloud.google.com/load-balancer-type"       = "External"
      "kubernetes.io/ingress.class"               = "gce"
      "ingress.gcp.kubernetes.io/pre-shared-cert" = google_compute_managed_ssl_certificate.lb_flow.name
    }
    name      = "flow-ingress"
    namespace = kubernetes_namespace.api_namespace.metadata.0.name
  }
  spec {
    rule {
      host = "flow.discontinuity.ai"
      http {
        path {
          backend {
            service {
              name = kubernetes_service.flow_service.metadata.0.name
              port {
                number = 80
              }
            }
          }
          path = "/*"
        }
      }
    }

  }
}

resource "kubernetes_deployment" "flow_deployment" {
  metadata {
    name      = "discontinuity-flow-deployment"
    namespace = kubernetes_namespace.api_namespace.metadata.0.name
    labels = {
      app = "flow"
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "flow"
      }
    }
    template {
      metadata {
        labels = {
          app = "flow"
        }
      }
      spec {
        container {
          image = "gcr.io/${var.project_id}/discontinuity-flow:latest"
          name  = "flow"
          env {
            name  = "LANGFLOW_SUPERUSER"
            value = "discontinuity"
          }
          env {
            name  = "LANGFLOW_SUPERUSER_PASSWORD"
            value = "whd2eud2jcn8XQG_vhm"
          }
          env {
            name  = "LANGFLOW_SECRET_KEY"
            value = "A+FT1fIf8SKBDtnzBeqsfxf7eplJzhVPq45S4HdEhTg="
          }
          env {
            name  = "LANGFLOW_AUTO_LOGIN"
            value = "False"
          }
          env {
            name  = "FLOWISE_USERNAME"
            value = "discontinuity"
          }
          env {
            name  = "FLOWISE_PASSWORD"
            value = "whd2eud2jcn8XQG_vhm"
          }
          env {
            name  = "PORT"
            value = "3000"
          }
          env {
            name  = "DATABASE_PASSWORD"
            value = var.flow_postgres_password
          }
        }

      }
    }
  }
}

resource "kubernetes_service" "flow_service" {
  depends_on = [kubernetes_deployment.flow_deployment]

  metadata {
    labels = {
      app = "flow"
    }
    name      = "flow"
    namespace = kubernetes_namespace.api_namespace.metadata.0.name
  }

  spec {
    port {
      name        = "flow"
      port        = 80
      target_port = 3000
    }
    selector = {
      app = "flow"
    }
    type = "NodePort"
  }
}
