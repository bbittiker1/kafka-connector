import axios from "axios";

import config from "../config/app";
import { httpMethods } from "../config/constants";
import { getHmac } from "./auth.service";
import logger from "../util/logger";

export class RestService  {
    constructor( topic ) {
        this.baseUrl = config.baseUrl;
        this.topic = topic;
        // this.method = config.kafka.topicRestMethod[topic];

        this._axiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: 15000,
        });

        this._axiosInstance.defaults.headers.common['Content-Type'] = "application/json";
    }

    async post(url, message) {
        try {
            // const hmac =  getHmac(httpMethods.post, url, message);
            this._axiosInstance.defaults.headers.post['Authorization'] = getHmac(httpMethods.post, url, message);

            // fetch data from a url endpoint
            return await this._axiosInstance.post(url, message);
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
