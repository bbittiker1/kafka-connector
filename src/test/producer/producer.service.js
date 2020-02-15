const { Kafka, CompressionTypes, logLevel  } = require('kafkajs');
const fs = require('fs');
const util = require('util');

import config from '../../config/app';
import logger from "../../util/logger";
import * as data from "./data/data";

const kafka = new Kafka({
    logLevel: logLevel.WARN,
    brokers: config.kafka.hosts,
    clientId: config.kafka.clientId,
});

const topic = "new_device";
const producer = kafka.producer();
const testData = data.data;

const getRandomNumber = (limit) => Math.round(Math.random() * limit);

// const createMessage = num => ({
//     key: `key-${num}`,
//     value: `value-${num}-${new Date().toISOString()}`,
// });

const sendMessage = () => {
    const message = testData[ getRandomNumber(testData.length - 1)];

    return producer
            .send({
                topic: topic,
                messages: [{
                        value: JSON.stringify(message)
                    },],
            })
            .then((res) => {
                const m = res[0];
                logger.debug(`topic: ${m.topicName} partition: ${m.partition} errorCode: ${m.errorCode} baseOffset: ${m.baseOffset}`);
            })
            .catch(e => logger.error(util.format('%o', e.message)))
};

const run = async () => {
    await producer.connect();
    setInterval(sendMessage, 3000)
};

run().catch(e => logger.error(util.format('%o', e.message)));

const errorTypes = ['unhandledRejection', 'uncaughtException'];
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

errorTypes.map(type => {
    process.on(type, async () => {
        try {
            logger.info(util.format('%o', type));
            await producer.disconnect();
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
});

signalTraps.map(type => {
    process.once(type, async () => {
        try {
            await producer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
});