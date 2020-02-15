/* jshint: node */
import express from 'express';
import process from 'process';
import 'dotenv/config';

// import { kafkaInstance } from "./services/kafka/kafka.service"
import ConsumerService from "./services/kafka/consumer.service";
import config from './config/app';
import logger from './util/logger';

const app = express();

// Log important environment variables
['NODE_ENV', 'KAFKA_HOST', 'REST_HOST', 'CONSUMER_GROUP', 'API_KEY_ID', 'PORT', 'HMAC_SCHEME', 'KAFKA_TOPICS', 'KAFKA_HOSTS'].map(e =>
    logger.debug(`ENV ${e}: ${process.env[e]}`)
);

// async function doKafka() {
//     const kafka = kafkaInstance(config);
//     const consumer = kafka.consumer({ groupId: config.kafka.groupId });
//     await consumer.connect();
//
//     config.kafka.topics.map(async t => {
//         await consumer.subscribe({topic: t, fromBeginning: true});
//     });
//
//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 topic: topic,
//                 partition: partition,
//                 value: message.value.toString()
//             })
//         },
//     })
// }

(async () => {
    try {
        const port = config.port;
        app.listen(port, () => {
            logger.info(`App listening on port ${port}!`);

            config.kafka.topics.map(async topic => {
                new ConsumerService(config, topic).start();
            });
        });
    } catch(e) {
        logger.error(e);
        logger.error('Shutting down...');
        process.exit(1);
    }
})();
