/* jshint: node */
import 'dotenv/config';
import process from 'process';
import config from "./config/config";
import express from 'express';
import logger from './util/logger';

const app = express();

(async () => {
    try {
        const server = app.listen(config.port, () => {
            logger.info(`App listening on port ${server.address().port}!`);

            config.kafkaTopics.map(async t => {
                    await new t.consumerInstance(t, config)
                        .run()
                        .catch(err => {
                            logger.error(err);
                            throw e;
                        });
            });
        });
    } catch(e) {
        logger.error(e);
        logger.error('Shutting down...');
        process.exit(1);
    }
})();
