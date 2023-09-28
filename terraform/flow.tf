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
      target_port = 7860
    }
    selector = {
      app = "flow"
    }
    type = "NodePort"
  }
}
