
export default  {
    kafkaTopic: 'iotdevice',
    kafkaHost: 'localhost:9092',

    kafkaTopicOptions: {
        autoCommit: false,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024
    },

    kafkaProducer: {
        options: {
            requireAcks: 1
        },
        interval: 5000
    },
};
