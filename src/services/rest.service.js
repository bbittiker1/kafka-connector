import axios from "axios";

import config from "../config/app";
import { httpMethods } from "../config/constants";
import { getHmac } from "./auth.service";
import logger from "../util/logger";

export class RestService  {
    constructor() {
        this.baseUrl = config.baseUrl;

        this._http = axios.create({
            baseURL: this.baseUrl,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this._http.interceptors.request.use( config => {
            config.headers.post['Authorization'] = getHmac(httpMethods.post, config.url, config.data);
            return config;
        });
    }

    async post(url, data) {
        try {
            return await this._http.post(url, data);
        } catch(err) {
            logger.error(err);
            throw err;
        }
    }

    async put(url, data) {
        try {
            return await this._http.put(url, data);
        } catch(err) {
            logger.error(err);
        }
    }

    async get(url) {
        try {
            return await this._http.get(url)
        } catch(err) {
            logger.error(err);
        }
    }
}
