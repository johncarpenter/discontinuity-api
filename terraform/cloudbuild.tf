resource "google_cloudbuild_trigger" "build-trigger" {
  //Source section
  github {
    owner = "johncarpenter"
    name  = "discontinuity-api"
    //Events section  
    push {
      branch = "main"
      //or
      //tag    = "production"
    }
  }
  ignored_files = [".gitignore"]
  //Configuration section
  // build config file
  //filename = "<path to cloudbuild.yaml file>"
  // build config inline yaml
  build {
    step {
      name = "gcr.io/cloud-builders/docker"
      args = ["build", "-t", "gcr.io/${var.project_id}/${var.docker_name}:latest", "."]
    }
  }
}
