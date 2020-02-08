#!/bin/bash

# Kill running containers.
sudo docker kill iotchangelog-server 2>/dev/null

# Build server image.
sudo docker build . -t iotchangelog-server

echo `pwd`/config

# Start server container.
sudo docker run -id \
    -v `pwd`/config/.env.docker.local:/usr/app/.env \
    --name  iotchangelog-server \
    --network iotchangelog_network \
    -p 3000:3000 \
    --rm iotchangelog-server:latest

#sudo docker exec -it iotchangelog-server /bin/sh -c 'npm run db:migrate:local'
#sudo docker exec -it iotchangelog-server /bin/sh -c 'npm run db:seed:local'
