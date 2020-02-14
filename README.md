NodeJS server that connects to Kafka topic and persists messages to a datastore.

1.) npm install
2.) docker run -d --name kafka2 --network iotchangelog_network -e KAFKA_ADVERTISED_HOST_NAME=localhost blacktop/kafka:1.0.0
3.) npm run start-producer 
4.) npm run start-server

For kafka configuration help: https://confluence-lvs.prod.mcafee.com/pages/viewpage.action?spaceKey=SHP&title=Kafka+Docker+setup

Kafka configurations:
docker exec -it kafka2 /bin/bash

1.) Create topic:
    ./kafka-topics.sh --create --zookeeper localhost:2181 --topic new_device --partitions 1 --replication-factor 1

2.) Create consumer group:
    ./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic new_device --consumer-property group.id=iot-device-group

