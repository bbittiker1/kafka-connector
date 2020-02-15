import config from "../../config/app";

const { Kafka, CompressionTypes, logLevel  } = require('kafkajs');

export const kafkaInstance = (config) => {
    return new Kafka({
        clientId: config.kafka.clientId,
        brokers: config.kafka.hosts
    })
};

