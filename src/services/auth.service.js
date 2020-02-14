import appConfig from '../config/app';
import CryptoJS from 'crypto-js';
import logger from '../util/logger';

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

// export const getHmac = (method, targetUrl, data) => {
//     const apiKeyId = appConfig.auth.apiKeyId;
//     // const apiKey = "0000";
//     const apiKey = appConfig.auth.apiKey;
//     const schema = appConfig.auth.schema;
//
//     const strData = JSON.stringify(data);
//
//     const ts = computeTimestamp();
//     const fmtTargetUrl = formatTargetUrl(targetUrl);
//     const fmtMethod = formatMethod(method);
//     const targetData = formatData(fmtMethod, fmtTargetUrl, ts, strData);
//
//     const hmac = CryptoJS.HmacSHA256(targetData, apiKey);
//     const base64hmac = CryptoJS.enc.Base64.stringify(hmac);
//
//     return formatHmac(schema, ts, apiKeyId, base64hmac);
//
//
//     // return `mcafee-hmac ${ts} shp:Czn4Zdb6Z+jIWR2dfPKGLxh3kEGv5La2ekCYEqGCk18=`;
// };


export const getHmac = (m, url, d) => {
    var keyid = appConfig.auth.apiKeyId;
    var key = appConfig.auth.apiKey;
    let schema = "mcafee-hmac";

    var ts = Math.floor(Date.now() / 1000);
    var targetUrl = (url).toString().trim(); // there may be surrounding ws
    targetUrl = targetUrl.replace(new RegExp('^https?://[^/]+/'),'/'); // strip hostname
    var method = 'POST';

    var data = method+targetUrl+ts+(typeof(d) != "string" ? '' : d);
    var hmac = CryptoJS.HmacSHA256(data, key);
    var base64hmac = CryptoJS.enc.Base64.stringify(hmac);
    return schema + " " + ts + " " + keyid + ":" + base64hmac;
};