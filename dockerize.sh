#!/bin/bash

# Kill running containers.
sudo docker kill device-fingerprint-collector 2>/dev/null

# Build server image.
sudo docker build . -t device-fingerprint-collector

echo `pwd`/config

# Start server container.
sudo docker run -i \
    -v `pwd`/config/.env.docker.local:/usr/app/.env \
    --name  device-fingerprint-collector \
    --network iotchangelog_network \
    -p 3005:3000 \
    --rm device-fingerprint-collector
