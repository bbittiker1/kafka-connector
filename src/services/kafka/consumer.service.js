import { RestService } from "../rest.service";
import { dataService } from "../data.service";
import { getConsumerGroup } from "./kafka.service";
import logger from '../../util/logger';
import appConfig from "../../config/app";

const util = require('util');

export default class ConsumerService {
    constructor(topic){
        this.consumerGroupOptions = appConfig.kafka.consumerGroupOptions;
        this.topic = topic;
        this.restService = new RestService( this.topic );
    }

    async persist(message) {
        if (!message.mac) {
            return;
        }

        try {
            message.mac = message.mac.replace(/:/g, "");
        } catch(e) {
            logger.error(e);
        }

        return await this.restService.execute(message)
    }

    start() {
        const consumerGroup = getConsumerGroup( this.consumerGroupOptions, this.topic );
        const restService = new RestService( this.topic );
        const that = this;

        consumerGroup.on('message', function (message) {
            try {
                const clientId = this.client.clientId;
                const topic = message.topic;
                const partition = message.partition;
                const offset = message.offset;

                // logger.debug(`clientId: ${clientId} topic: "${topic}" partition: ${partition} offset: ${offset}`);

                const device = JSON.parse(message.value);

                that.persist(device)
                    .then((res, err) => {
                        logger.info( util.format('message: %o', message));
                    })
                    .catch(err => {
                        logger.error(util.format('%o', err.config));
                        logger.error(util.format('%o', err.response.status));
                        logger.error(util.format('%o', err.response.statusText));
                    });

                // dataService.device.create(device)
                //     .catch(err => {
                //         logger.error(err);
                //     })
            } catch (e) {
                logger.error(e);
            }
        });

        consumerGroup.on('error', function onError(error) {
            logger.error(error);
        });

        logger.info(`Started Consumer for topic ${this.topic} in group ${this.consumerGroupOptions.groupId}.`);
    };
}
