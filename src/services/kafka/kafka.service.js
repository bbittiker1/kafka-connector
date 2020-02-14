const kafka = require('kafka-node');

export const connect = (config, options) => {
    const connection =  new kafka.KafkaClient({ host: config.host });
    const offset = new kafka.Offset(connection);

    return { connection, offset };
};

export const getConsumer = (connection, topics, topicOptions) => {
    return new kafka.Consumer(
        connection,
        topics,
        topicOptions );
};

export const getConsumerGroup = (options, topicName) => {
    return new kafka.ConsumerGroup(options, topicName);
};

export const getProducer = (connection, options) => {
    return new kafka.Producer(connection, options);
};

export const configureTopic = (topic) => {
    return [{
        topic: topic, partitions: 1
    }, {
        topic: topic, partitions: 0
    }];
};
