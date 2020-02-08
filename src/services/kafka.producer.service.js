import kafkaConfig from "../config/kafka";
import {connect, getProducer} from "./kafka.service";

import * as data from "../../data/data";

try {
    const testData = data.data;

    /**
     * Attempt to connect to Kafka.
     */
    const {connection, _} = connect(kafkaConfig);
    const topic = kafkaConfig.kafkaTopic;

    /**
     * Attempt to create Producer.
     */
    const producer = getProducer(connection, kafkaConfig.kafkaProducer.options);

    let count = 0;

    /**
     * Produce/send messages handler.
     */
    producer.on("ready", async function () {
        //
        // Successfully connected to Kafka and ready to send messages...
        //
        setInterval(function () {
            // Construct payload to send.
            const payloads = [
                {
                    topic: topic,
                    messages: [JSON.stringify(testData[count])],
                    partitions: 0
                }
            ];

            producer.send(payloads, (err, data) => {
                console.log(data);
                count += 1;

                if (count === 99) {
                    count = 0;
                }
            });
        }, kafkaConfig.kafkaProducer.interval);
    });

    /**
     * Error handler.
     */
    producer.on("error", function (err) {
        console.log(err);
        console.log("[kafka-producer -> " + topic + "]: connection errored");
        throw err;
    });
} catch (e) {
    console.log(e);
}
