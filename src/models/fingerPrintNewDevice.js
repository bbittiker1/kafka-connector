import logger from "../util/logger";

const tableName = "fp_new_device";

const fpIotDevices = (sequelize, Datatypes) => {
    const FpIotDevices = sequelize.define(tableName, {
            did: {
                type: Datatypes.STRING,
                // autoIncrement: true,
                // primaryKey: true
            },
            aff_id: {
                type: Datatypes.STRING,
            },
            router_id: {
                type: Datatypes.STRING,
            },
            mac: {
                type: Datatypes.STRING,
            },
            ip: {
                type: Datatypes.STRING,
            },
            hostname: {
                type: Datatypes.STRING,
            },
            topic: {
                type: Datatypes.STRING,
            },
            event_type: {
                type: Datatypes.STRING,
            },
            tot_dev_cnt: {
                type: Datatypes.INTEGER,
            },
        },
        {
            tableName: tableName,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
            createdAt: false,
            deletedAt: false,
            updatedAt: false,

            classMethods: {
                // associate : function(models) {
                //     Baseline.belongsToMany(models.Anomaly, { through: 'device_type', foreignKey: 'device_type' });
                // },
            },
        });

    FpIotDevices.sync({force: false, alter: true})
        .catch(err => {
            logger.error(err);
        });

    /**
     * Persist new device record
     * @param device
     * @returns {Promise<void>}
     */
    FpIotDevices.handleInsert = async( device ) => {
        await FpIotDevices.create(device);
    };

    return FpIotDevices;
};

export default fpIotDevices;
