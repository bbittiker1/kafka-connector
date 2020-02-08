import Sequelize from 'sequelize';
import config from '../config/app'

const Op = Sequelize.Op;

const sequelize = new Sequelize(config.database, config.databaseUser, config.databasePassword, {
    host: config.databaseHost,
    dialect: config.databaseDialect,
    port: config.datbasePort,
    omitNull: true,
    // logging: (msg) => console.log(msg)
    logging: false
});

const models = {
    FingerPrintNewDevice: sequelize.import('./fingerPrintNewDevice')
};

async function executeRawSqlQuery(q, options) {

    let myOptions = {
        type: sequelize.QueryTypes.SELECT,
        plain: false,
        raw: true,
        logging: (options && options.logging) ? options.logging : false
    };

    if (options) {
        myOptions = {...options, ...myOptions};
    }

    return await sequelize.query(q, myOptions)
}

export {sequelize, Op, executeRawSqlQuery};

export default models;

