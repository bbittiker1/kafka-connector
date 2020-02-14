import axios from "axios";

import config from "../config/app";
import { httpMethods, kafka } from "../config/constants";
import { getHmac } from "./auth.service";
import logger from "../util/logger";
import CryptoJS from "crypto-js";

export class RestService  {
    constructor( topic ) {
        this.baseUrl = config.baseUrl;
        this.topic = topic;
        this.method = config.kafka.topicRestMethod[topic];
        this._setExecute(this.method);

        this._axiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: 15000,
        });

        this._axiosInstance.defaults.headers.common['Content-Type'] = "application/json";

        // this._axiosInstance.defaults.headers.common = {
        //     'Authorization': getHmac(this.method, this.baseUrl, request.body)
        // };
    }

    _setExecute() {
        this.execute = (obj => {
            switch (obj.method ) {
                case httpMethods.post:
                    return obj.post;
                case httpMethods.put:
                    return obj.put;
                default:
                    throw new Error("Invalid kafka topic.")
            }
        })(this);
    }

    async post(message) {
        try {
            const url = this.baseUrl + message.mac;

            const myMessage = JSON.stringify({
                "did": message.did,
                "type": message.type,
                "manufacturer": message.manufacturer,
                "make": "",
                "model": "4K",
                "icon": "appletv"
            });

            this._axiosInstance.defaults.headers.post['Authorization'] = getHmac('POST', url, myMessage);

            // fetch data from a url endpoint
            return await this._axiosInstance.post(url, myMessage);
        } catch(err) {
            logger.error(err);
            throw err;
        }
    }

    async put(message) {
        try {
            // fetch data from a url endpoint
            return await axios.put(this.baseUrl, message);
        } catch(err) {
            logger.error(err);
        }
    }

    async get(message) {
        try {
            return await axios.get(this.baseUrl)
        } catch(err) {
            logger.error(err);
        }
    }
}
