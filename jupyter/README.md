    gcloud config set project ${{ secrets.GCP_PROJECT }}
          gcloud builds submit --tag gcr.io/${{ secrets.GCP_PROJECT }}/discontinuity-api:${{ github.sha }} 


          gcloud container images add-tag gcr.io/${{ secrets.GCP_PROJECT }}/discontinuity-api:${{ github.sha }} gcr.io/${{ secrets.GCP_PROJECT }}/discontinuity-api:latest --quiet
          
          gcloud run deploy discontinuity-api-service --image gcr.io/${{ secrets.GCP_PROJECT }}/discontinuity-api:latest --platform managed --region europe-west1



cloud auth configure-docker \
    us-west1-docker.pkg.dev