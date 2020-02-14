const { createLogger, format, transports } = require('winston');
const path = require('path');
const PROJECT_ROOT = path.join(__dirname, '..');
const appRoot = require('app-root-path');

import appConfig from '../config/app';

const { combine, timestamp, printf, prettyPrint, splat, colorize } = format;

/**
 * Attempts to add file and line number info to the given log arguments.
 */
const formatLogArguments = (args) => {
    args = Array.prototype.slice.call(args);

    const stackInfo = getStackInfo(1);

    if (stackInfo) {
        // get file path relative to project root
        var calleeStr = '[' + stackInfo.relativePath + ':' + stackInfo.line + ']';

        if (typeof (args[0]) === 'string') {
            args[0] = calleeStr + ' ' + args[0]
        } else {
            args.unshift(calleeStr)
        }
    }

    return args
};

/**
 * Parses and returns info about the call stack at the given index.
 */
const getStackInfo = (stackIndex) => {
    // get call stack, and analyze it
    // get all file, method, and line numbers
    const stacklist = (new Error()).stack.split('\n').slice(3);

    // stack trace format:
    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
    const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

    const s = stacklist[stackIndex] || stacklist[0];
    const sp = stackReg.exec(s) || stackReg2.exec(s);

    if (sp && sp.length === 5) {
        return {
            method: sp[1],
            relativePath: path.relative(PROJECT_ROOT, sp[2]),
            line: sp[3],
            pos: sp[4],
            file: path.basename(sp[2]),
            stack: stacklist.join('\n')
        }
    }
};

const _logger = createLogger({
    format: combine(
        timestamp(),
        colorize(),
        splat(),
        format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new transports.Console({
            level: appConfig.logLevel || 'debug'
        }),
        new transports.File({
            filename: `${appRoot}/logs/info.log`,
            level: appConfig.logLevel || 'debug'
        }),
        new transports.File({
            filename: `${appRoot}/logs/app.log`,
            level: appConfig.logLevel
        })
    ]
});


class Logger {
    constructor(logger) {
        this.logger = logger;
    }

    _info(msg) { this.logger.info(msg); }
    _debug(msg) { this.logger.debug(msg); }
    _warn(msg) { this.logger.warn(msg); }
    _error(msg) { this.logger.error(msg); }
}

const logger = new Logger(_logger);

module.exports = logger;

module.exports.info = function () {
    const m = formatLogArguments(arguments);
    logger._info(m);
};

module.exports.warn = function () {
    const m = formatLogArguments(arguments);
    logger._warn(m);
};

module.exports.debug = function () {
    const m = formatLogArguments(arguments);
    logger._debug(m);
};

module.exports.error = function () {
    const m = formatLogArguments(arguments);
    logger._error(m);
};

