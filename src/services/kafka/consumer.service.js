import {kafkaInstance} from "./kafka.service";
import { RestService } from "../rest.service";
import { formatMessage } from "./message.service";  // TODO: ADD MESSAGE TYPE
import logger from '../../util/logger';

export default class ConsumerService {
    constructor(config){
        this.config = config;
        this.kafka = kafkaInstance(this.config);
        this.topics = this.config.kafka.topics;

        this.restService = new RestService();
    }

    async formatUrl(messageType, options) {
        // TODO: IMPLEMENT message type for different urls.
        return this.config.baseUrl + options.mac;
    }

    async persist(device) {
        if(!device) {
            return;
        }

        try {
            const messageType = 0;
            const { mac, message } = await formatMessage(device, messageType);
            const url = await this.formatUrl(messageType, { mac: mac, message: message });

            return await this.restService.post(url, message)
        } catch(e) {
            logger.error(e);
            throw e;
        }
    }

    async start() {
        const consumer = this.kafka.consumer({ groupId: this.config.kafka.groupId });
        await consumer.connect();

        this.topics.map(async t => {
            await consumer.subscribe({ topic: t, fromBeginning: true });
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const device = message.value.toString();

                logger.debug({ topic: topic, partition: partition, value: device });

                await this.persist(device)
                    .then(res => {
                        logger.debug(res.config);
                        logger.info(`status: ${res.status} statusText: ${res.statusText || ""}`)
                    })
                    .catch(err => logger.error(err));
            },
        })
    };
};
