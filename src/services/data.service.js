import models, {sequelize} from "../models"
import logger from "../util/logger";

export const dataService = {
    connect: () => {
        return sequelize.authenticate()
        .then(() => {
            return sequelize.sync()
        }).catch(err => {
            logger.error(`Unable to connect to the database. ${err.name}: ${err.message}`);

            throw err;
        });
    },

    device: {
        create: (device) => {
            return models.FingerPrintNewDevice.create(device);
        }
    }
};