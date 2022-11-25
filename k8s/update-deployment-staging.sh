#!/bin/bash
kubectl config set-context $(kubectl config current-context) --namespace=nextstep-${ENV}
# Update deployment
kubectl apply -f ./k8s/deployment-staging.yml
