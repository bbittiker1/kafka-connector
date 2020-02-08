/* jshint: node */
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import appLogger from './util/logger';
import { dataService } from "./services/data.service";
import kafkaConsumer from './services/kafka.consumer.service';

const appConfig = require('./config/app');
const app = express();

//
// Application-Level Middleware
//
app.use(cors());

(async () => {
    try {
        await dataService.connect();

        app.listen(process.env.PORT, () => {
            appLogger.info(`App listening on port ${process.env.PORT}!`);
            console.info("Config: ", appConfig);

            //
            // Start the kafka consumer service, which listens for kafka device events
            // and persists them to a datastore.
            //
            kafkaConsumer();
        });
    } catch(e) {
        appLogger.error(e);
        appLogger.error('Shutting down...');
        process.exit(1);
    }
})();
