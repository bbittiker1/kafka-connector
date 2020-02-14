/* jshint: node */
import express from 'express';
import process from 'process';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import models from './models';

import appLogger from './util/logger';
import { dataService } from "./services/data.service";
import ConsumerService from './services/kafka/consumer.service';
import { setRoutes } from './routes';
import { morganConfig } from "./config/morgan.config";
import { passportConfig } from "./config/passport.config";
import { responseHeaders } from "./config/response.config";

import config from "./config/app";

const app = express();

//
// Application-Level Middleware
//
app.use(cors());

//
// HTTP request logger middleware.
//
app.use(morganConfig());

//
// Initialize passport configuration.
//
// Imports our configuration file which holds our verification callbacks and things
// like the secret for signing.
//
passportConfig(app, passport);

//
// Application-Level Middleware
//
app.use(cors());
app.use(responseHeaders);

app.disable( 'x-powered-by' ) ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser(config.secret));

// Log important environment variables
['NODE_ENV', 'KAFKA_HOST', 'REST_HOST', 'CONSUMER_GROUP', 'API_KEY_ID', 'PORT', 'HMAC_SCHEME'].map(e =>
    appLogger.debug(`ENV ${e}: ${process.env[e]}`)
);

//
// Resources available for each request.
//
app.use(async (req, res, next) => {
    req.context = {
        models,
        // currentUser: await loginService.getCurrentUser()
    };
    next();
});

//
// Set and secure our routes.
//
setRoutes(app, passport);

(async () => {
    try {
        // Attempt to connect to DB.
        await dataService.connect();

        app.listen(process.env.PORT, () => {
            appLogger.info(`App listening on port ${process.env.PORT}!`);

            //
            // Start the kafka consumer service, which listens for kafka device events
            // and persists them to a datastore.
            //
            config.kafka.topics.map(topic => {
                new ConsumerService(topic).start();
            })
        });
    } catch(e) {
        appLogger.error(e);
        appLogger.error('Shutting down...');
        process.exit(1);
    }
})();
