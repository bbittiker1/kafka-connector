import process from 'process';

import config from '../../config/config';
import { newInstance, newProducerInstance, producerTopic } from "./base";
import logger from "../../util/logger";
import { kafkaConstants } from "../../config/constants";
import { getRandomNumber } from "../../util/util";
import * as data from "../../test/producer/data/data";

const kafka = newInstance(config);
const producer = newProducerInstance(kafka);
const topic = producerTopic();

const producerData = (topic === kafkaConstants.topics.newDevice) ? data.newDevice : data.deviceEvent;
const dataLimit = producerData.length - 1;

const sendMessage = () => {
    const message = producerData[ getRandomNumber(dataLimit)];

    return producer
        .send({
            topic: topic,
            messages: [{ value: JSON.stringify(message)},],
        })
        .then((res) => {
            const m = res[0];
            logger.debug(`topic: ${m.topicName} part: ${m.partition} error: ${m.errorCode} offset: ${m.baseOffset}`);
        })
        .catch(e => {
            logger.error(e.message);
        })
};

const run = async () => {
    await producer.connect();
    setInterval(sendMessage, 3000)
};

run().catch(e => {
    logger.error( e.message);
});
