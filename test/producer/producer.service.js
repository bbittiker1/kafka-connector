import {} from 'dotenv/config';

import {connect, getProducer} from "../../src/services/kafka/kafka.service";
import * as data from "./data/data";
import logger from '../../src/util/logger';

const config = require("../../src/config/app").default;

try {
    const testData = data.data;

    /**
     * Attempt to connect to Kafka.
     */
    const {connection, _} = connect( config.kafka );
    const topic = config.kafka.topics[0];

    /**
     * Attempt to create Producer.
     */
    const producer = getProducer(connection, config.kafka.producer.options);

    let count = 0;

    /**
     * Produce/send messages handler.
     */
    producer.on("ready", async function () {
        //
        // Successfully connected to Kafka and ready to send messages...
        //
        setInterval(function () {
            // Construct payload to send.
            const payloads = [{
                    topic: topic,
                    messages: [JSON.stringify(testData[count])],
                    partitions: 0
            }];

            producer.send(payloads, (err, data) => {
                    if (err) {
                        logger.error(err);
                    } else {

                        logger.debug(JSON.stringify(data));
                        count += 1;

                        if (count === 99) {
                            count = 0;
                        }
                    }
            });
        }, config.kafka.producer.interval);
    });

    /**
     * Error handler.
     */
    producer.on("error", function (err) {
        logger.error(err);
        logger.error(`[kafka-producer -> ${topic}"]: connection error occurred.`);
        throw err;
    });
} catch (e) {
    logger.error(e);
    throw e;
}
