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

(async () => {
    try {
        // const port = config.port;
        const server = app.listen(config.port, () => {
            logger.info(`App listening on port ${server.address().port}!`);

            // Start Kafka consumer service.
            new ConsumerService(config).start();
        });
    } catch(e) {
        logger.error(e);
        logger.error('Shutting down...');
        process.exit(1);
    }
})();
