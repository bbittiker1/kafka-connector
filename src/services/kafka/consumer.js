import {newConsumerInstance, newInstance} from "./base";
import { RestService } from "../rest.service";
import logger from '../../util/logger';
import { formatMacAddress } from "../../util/util";

export class BaseConsumerService {
    constructor(topic, config){
        this.config = config;
        this.formatMacAddress = formatMacAddress;
        this.topic = topic;
        this.topicName = this.topic.topic;
        this.restService = new RestService();
        this.consumer = newConsumerInstance( newInstance(config), this.config.kafkaGroupId );
    }

    async formatMac(message) {
        // console.log("format mac: " + message.mac);
        if(!message.mac) {
            return null;
        }

        return message.mac.replace(this.formatMacAddress, "");
    }


    async persist(message) {
        console.log("base persist: " + message);
    }

    async run() {
        logger.info(`Attempting to subscribe to topic: ${this.topicName.toString()}`);

        await this.consumer.connect();
        await this.consumer.subscribe({topic: this.topicName, fromBeginning: true});

        await this.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                message = message.value.toString();

                logger.debug({topic: topic, partition: partition, value: message});

                await this.persist(message)
                    .then(res => {
                        logger.info(`status: ${res.status} statusText: ${res.statusText || ""}`)
                    })
                    .catch(e => {
                        logger.error(e);
                        this.checkDisconnect(e).then(() => logger.info("check disconnect."));
                    })
            }
        }).catch(e => {
            logger.error(e);
            this.checkDisconnect(e).then(() => logger.info("check disconnect."));
        })
    };

    async checkDisconnect(error) {
        if(error && error.errno && error.errno === "ECONNREFUSED") {
            await this.consumer.disconnect();
        }
    }
}

/**
 New device event format from router.

    {
      "router_id":"OJ-0O-NA-OONI5ZLWN3P7LKZAH9TQPQUOXMZH1KTYNYQVQM4A1A9XIYGUA5XHJRQSLIPT0VJD",
      "event_type":"new_device",
      "did":"FN-ZS-ZZ-3HL2URXSLFKLLNHOL4DQUBLUSQVSETNQHVUAILNES2M7WTTR8D8GQPLKCKJQ9W3O",
      "ip":"02.06.7.55",
      "tot_dev_cnt":7,
      "hostname":"BAEJQHS9OB",
      "aff_id":"756",
      "topic":"new_device",
      "mac":"9F:0B:8E:8A:5E:3C",
      "account_id":"IRPI1HvF-DQYV-9U5z-w8NP-JYZJ3lHmHfx",
      "type":"IOT",
      "manufacturer":"Espressif",
      "model":"",
      "icon":""
    }
 */
export class NewDeviceConsumerService extends BaseConsumerService {
    constructor(topic, config) {
        super(topic, config);
    }

    static async formatUrl(options) {
        return `${this.config.baseUrl}${options.mac}`;
    }

    static async formatMessage(message) {
        try {
            if(!message) {
                return {};
            }

            // TODO: UPDATE WHEN GET ALL REQS
            return JSON.stringify({
                "did": message.did,
                "type": message.type,
                "manufacturer": message.manufacturer,
                "make": "",
                "model": "4K",
                "icon": "appletv"
            });
        } catch(e) {
            logger.error(e);
            throw e;
        }
    }

    async persist(message) {
        if( !message ) {
            return;
        }

        try {
            message = JSON.parse(message);

            const mac = await this.formatMac(message);

            if(!mac) {
                return;
            }

            const msg = await NewDeviceConsumerService.formatMessage(message);
            const url = await NewDeviceConsumerService.formatUrl({mac: mac});

            return await this.restService.post(url, msg);
        } catch(e) {
            logger.error(e);
            throw e;
        }
    }
}


/**
  Device event (fingerprint_update, etc) message format. CIC ?

 "device_id":"HI-VY-EV-LLRAJS2TSJDDKUO2ASFZQVB1KBMUVFHOWXZTDXMOCUGHYARFSEJIFKCLTJ123456",
 "router_id":"YB-TV-G3-FQPPPDEYAXZFGS4FAQFDXMWA7RXHA2TKGXCSYOHJ1EO6FC9X6IMLMPBGCB8T6KR4",
 "device_name":"iPhone-x",
 "os":"iOS",
 "aff_id":"1234",
 "device_type":"Multimedia Extender",
 "manufacturer":"Netgear",
 "confidence":1,
 "device_model":"iPhoneX",
 "event_type":"fingerprint_changed"
*/
export class DeviceEventConsumerService extends NewDeviceConsumerService {
    constructor(topic, config) {
        super(topic, config);
        this.postUrl = `${this.config.baseUrl}by/did`;
    }

    static async formatMessage(message) {
        try {
            if(!message) {
                return {};
            }

            // TODO: UPDATE WHEN GET ALL REQS
            return JSON.stringify({
                "did": message.device_id,
                "type": message.device_type,
                "manufacturer": message.manufacturer,
                "make": message.device_model,
                "os": message.os
            });
        } catch(e) {
            logger.error(e);
            throw e;
        }
    }


    async persist(message) {
        if( !message ) {
            return;
        }

        try {
            const msg = await DeviceEventConsumerService.formatMessage(JSON.parse(message));

            return await this.restService.post(this.postUrl, msg);
        } catch(e) {
            logger.error(e);
            throw e;
        }
    }
}
