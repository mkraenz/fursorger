#!/bin/bash

declare -r TAG=$1

# NOTE: env vars set by travis, or in travis repository settings
docker build . --tag "${DOCKER_USERNAME}/${DOCKER_REPO}:${TAG}"
echo "$DOCKER_PASSWORD" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push "${DOCKER_USERNAME}/${DOCKER_REPO}:${TAG}"
