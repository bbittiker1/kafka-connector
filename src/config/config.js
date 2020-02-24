import process from 'process';

import {
    NewDeviceConsumerService,
    DeviceEventConsumerService
} from "../services/kafka/consumer";

const config = (function() {
    const common = {
        auth: {
            "apiKeyId": process.env['API_KEY_ID'],
            "apiKey": process.env['API_KEY'],
            "schema": process.env['HMAC_SCHEME']
        },
        baseUrl: process.env['REST_HOST'],
        logLevel: process.env['LOG_LEVEL'],
        port: process.env['PORT'],
        kafkaClientId:  process.env['KAFKA_CLIENT_ID'],
        kafkaGroupId: process.env['KAFKA_CONSUMER_GROUP'],
        kafkaHosts: process.env['KAFKA_HOSTS'].split(","),
    };

    const environment = {
        "local": {
            environment: "local",
            kafkaTopics: [
                {
                    "topicName": "new_device",
                    "topic": "new_device",
                    "consumerInstance": NewDeviceConsumerService
                },
                {
                    "topicName": "device_event",
                    "topic": new RegExp(/shp-fp-csdev_*/i),
                    "consumerInstance": DeviceEventConsumerService
                }
            ]
        },
        "development": {
            environment: "development",
            kafkaTopics: [
                {
                    topicName: "new_device",
                    topic: "new_device",
                    consumerInstance: NewDeviceConsumerService
                },
                {
                    topicName: "device_event",
                    topic: new RegExp(/shp-fp-csdev_*/i),
                    consumerInstance: DeviceEventConsumerService
                }
            ]
        },
        "qaBeta5": {
            environment: "qaBeta5",
            kafkaTopics: [
                {
                    "topicName": "new_device",
                    "topic": "new_device",
                    "consumerInstance": NewDeviceConsumerService
                }
            ]

        },
        "qaCommon": {
            environment: "qaCommon",
            kafkaTopics: [
                {
                    "topicName": "device_event",
                    "topic": new RegExp(/shp-fp-csdev_*/i),
                    "consumerInstance": DeviceEventConsumerService
                }
            ],
        },
    };

   return Object.assign({}, common, environment[process.env['NODE_ENV']] );
})();

export default config;
