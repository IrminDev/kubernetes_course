#!/bin/bash

# Install ArgoCD
kubectl create namespace argo-rollouts && kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml

# Enable the gatewayAPI
kubectl apply -f configMap.yaml

# Set up the demo application
kubectl create ns test && kubectl apply -f https://run.linkerd.io/flagger.yml

# Configure the rollout
kubectl apply -f rollout.yaml

# Start the rollout
kubectl argo rollouts -n test set image rollouts-demo podinfod=quay.io/stefanprodan/podinfo:1.7.1

# Watch the rollout
kubectl argo rollouts -n test get rollout rollouts-demo --watch

# Clean up the resources
kubectl delete ns argo-rollouts && kubectl delete ns test