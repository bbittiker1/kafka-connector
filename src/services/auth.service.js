import appConfig from '../config/config';
import CryptoJS from 'crypto-js';
// import logger from '../util/logger';

const stripHostnameRegex = new RegExp('^https?://[^/]+/');

const formatTargetUrl = (targetUrl) => {
  return targetUrl.replace(stripHostnameRegex,'/'); // strip hostname
};

const computeTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

const formatMethod = method => {
    return method.toUpperCase();
};

const formatData = (method, url, ts, data) => {
    return method + url + ts + (typeof(data) !== "string" ? '' : data);
};

const formatHmac = (schema, ts, apiKeyId, base64hmac) => {
    return `${schema} ${ts} ${apiKeyId}:${base64hmac}`;
    // logger.debug(hmac);
    // return hmac;
};

export const getHmac = (method, targetUrl, data) => {
    const apiKeyId = appConfig.auth.apiKeyId;
    const apiKey = appConfig.auth.apiKey;
    const schema = appConfig.auth.schema;
    const ts = computeTimestamp();
    const fmtTargetUrl = formatTargetUrl(targetUrl);
    const fmtMethod = formatMethod(method);
    const targetData = formatData(fmtMethod, fmtTargetUrl, ts, data);
    const hmac = CryptoJS.HmacSHA256(targetData, apiKey);
    const base64hmac = CryptoJS.enc.Base64.stringify(hmac);

    return formatHmac(schema, ts, apiKeyId, base64hmac);
};
