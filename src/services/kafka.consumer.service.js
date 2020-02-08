import kafkaConfig from '../config/kafka';
import { connect, getConsumer, configureTopic } from './kafka.service';
import logger from "../util/logger";
import { dataService } from "../services/data.service";

export default () => {
    const topic = kafkaConfig.kafkaTopic;

    /**
     * Attempt to connect to Kafka.
     */
    const {connection, offset} = connect(kafkaConfig);

    /**
     * Attempt to create Kafka consumer.
     */
    const consumer = getConsumer(connection, configureTopic(topic), kafkaConfig.kafkaTopicOptions);

    /**
     * Message handler.
     */
    consumer.on("message", function (message) {
        try {
            logger.info(message.value);

            const device = JSON.parse(message.value);

            dataService.device.create(device)
            .catch(err => {
                logger.error(err);
            })
        } catch (e) {
            logger.error(e);
        }
    });

    /**
     * Error handler.
     */
    consumer.on('error', function (err) {
        logger.error(err);
    });

    /**
     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset.
     */
    consumer.on('offsetOutOfRange', function (topic) {
        topic.maxNum = 2;

        offset.fetch([topic], function (err, offsets) {
            if (err) {
                return console.error(err);
            }

            const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
            consumer.setOffset(topic.topic, topic.partition, min);
        });
    });
}
