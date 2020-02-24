import process from "process";

const { Kafka, CompressionTypes, logLevel  } = require('kafkajs');

import logger from "../../util/logger";
import { kafkaConstants } from "../../config/constants";

export const newInstance = config => {
    if(!config) {
        const msg = "Missing required configuration.";
        logger.error(msg);
        throw new Error(msg);
    }

   return new Kafka({
        logLevel: logLevel.WARN,
        brokers: config.kafkaHosts,
        clientId: config.kafkaClientId,
    });
};

export const newProducerInstance = kafka => {
    if(!kafka) {
        const msg = "Missing required configuration.";
        logger.error(msg);
        throw new Error(msg);
    }

    const producer = kafka.producer();

    setErrorTypes(producer);
    setSignalTraps(producer);

    return producer;
};

export const producerTopic = () => {

    return process.env['KAFKA_PRODUCER_TOPIC'] || kafkaConstants.topics.newDevice;
};

export const newConsumerInstance = (kafka, groupId) => {
    if(!kafka) {
        const msg = "Missing required configuration.";
        logger.error(msg);
        throw new Error(msg);
    }

    kafka.consumer({ groupId: groupId });

    setErrorTypes(producer);
    setSignalTraps(producer);

    return producer;
};



export const setErrorTypes = (kafka) => {
    ['unhandledRejection', 'uncaughtException'].map(type => {
        process.on(type, async () => {
            try {
                logger.info(type);
                await kafka.disconnect();
                process.exit(0)
            } catch (_) {
                process.exit(1)
            }
        })
    });
};

export const setSignalTraps = (kafka) => {
    ['SIGTERM', 'SIGINT', 'SIGUSR2'].map(type => {
        process.once(type, async () => {
            try {
                await kafka.disconnect()
            } finally {
                process.kill(process.pid, type)
            }
        })
    });

};

