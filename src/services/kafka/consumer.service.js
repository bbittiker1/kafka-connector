import {kafkaInstance} from "./kafka.service";
import { RestService } from "../rest.service";

import logger from '../../util/logger';

const util = require('util');

export default class ConsumerService {
    constructor(config, topic){
        // this.consumerGroupOptions = appConfig.kafka.consumerGroupOptions;
        this.topic = topic;
        this.restService = new RestService( this.topic );
        this.kafka = kafkaInstance(config);
        this.config = config;
    }

    async persist(device) {
        if(!device) {
            return;
        }

        const message = JSON.parse(device);

        if (!message.mac) {
            return;
        }

        try {
            message.mac = message.mac.replace(/:/g, "");

            const url = this.config.baseUrl + message.mac;

            const cleanMessage = JSON.stringify({
                "did": message.did,
                "type": message.type,
                "manufacturer": message.manufacturer,
                "make": "",
                "model": "4K",
                "icon": "appletv"
            });

            return await this.restService.post(url, cleanMessage)
        } catch(e) {
            logger.error(e);
        }
    }

    async start() {
        const consumer = this.kafka.consumer({ groupId: this.config.kafka.groupId });
        await consumer.connect();

        this.config.kafka.topics.map(async t => {
            await consumer.subscribe({topic: t, fromBeginning: true});
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {

                const device = message.value.toString();

                logger.info(util.format('%o', {
                    topic: topic,
                    partition: partition,
                    value: device
                }));

                await this.persist(device);
            },
        })
    };
}