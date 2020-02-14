#!/bin/bash

# Kill running containers.
sudo docker kill kafka-connect-server 2>/dev/null

# Build server image.
sudo docker build . -t kafka-connect-server

echo `pwd`/config

# Start server container.
sudo docker run -i \
    -v `pwd`/config/.env.docker.local:/usr/app/.env \
    --name  kafka-connect-server \
    --network iotchangelog_network \
    -p 3005:3000 \
    --rm kafka-connect-server
