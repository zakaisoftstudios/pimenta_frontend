#!/bin/bash
gcloud -v
# Authenticating with the service account key file
echo $GCLOUD_API_KEYFILE | base64 --decode --ignore-garbage > ./gcloud-api-key.json
gcloud auth activate-service-account --key-file ./gcloud-api-key.json --project=$GCLOUD_PROJECT
# Testing GCP sdk
gcloud auth list
# Configuring kubectl
gcloud container clusters get-credentials pimenta-sandbox --zone europe-west3-a --project $GCLOUD_PROJECT