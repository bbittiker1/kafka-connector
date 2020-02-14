import { kafka, httpMethods } from './constants';

export default {
    port: process.env['PORT'],
    origin: process.env['ORIGIN'],
    environment: process.env['NODE_ENV'],
    database: process.env['DATABASE'],
    databaseHost: process.env['DATABASE_HOST'],
    databaseUser: process.env['DATABASE_USER'],
    databasePassword: process.env['DATABASE_PASSWORD'],
    databaseDialect: process.env['DATABASE_DIALECT'],
    databasePort: process.env['DATABASE_PORT'],

    auth: {
        apiKeyId: process.env['API_KEY_ID'],
        apiKey: process.env['API_KEY'],
        schema: process.env['HMAC_SCHEME']
    },
    baseUrl: process.env['REST_HOST'],
    logLevel: process.env['LOG_LEVEL'],

    kafka: {
        topics: [kafka.topics.newDevice, kafka.topics.updateDevice],
        topicRestMethod: {
            [kafka.topics.newDevice]: httpMethods.post,
            [kafka.topics.updateDevice] : httpMethods.put
        },
        host: process.env['KAFKA_HOST'],
        topicOptions: {
            autoCommit: false,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024
        },
        producer: {
            options: {
                requireAcks: 1
            },
            interval: 5000
        },
        consumerGroupOptions: {
            // connect directly to kafka broker (instantiates a KafkaClient)
            kafkaHost: process.env['KAFKA_HOST'],
            groupId: process.env['CONSUMER_GROUP'],
            autoCommit: true,
            autoCommitIntervalMs: 5000,
            sessionTimeout: 15000,
            fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
            // An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for
            // built ins (see below to pass in custom assignment protocol)
            protocol: ['roundrobin'],
            // Offsets to use for new groups other options could be 'earliest' or 'none'
            // (none will emit an error if no offsets were saved) equivalent to Java client's auto.offset.reset
            fromOffset: 'latest',
            // how to recover from OutOfRangeOffset error (where save offset is past server retention)
            // accepts same value as fromOffset
            outOfRangeOffset: 'earliest'
        }
    }
};

