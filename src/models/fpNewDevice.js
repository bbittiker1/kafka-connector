// import logger from "../util/logger";
//
// const tableName = "fp_new_device";
//
// const fpIotDevices = (sequelize, Datatypes) => {
//     const FpIotDevices = sequelize.define(tableName, {
//             did: {
//                 type: Datatypes.STRING,
//                 // autoIncrement: true,
//                 // primaryKey: true
//             },
//             mac: {
//                 type: Datatypes.STRING,
//             },
//         }, {
//             tableName: tableName,
//
//             // don't use camelcase for automatically added attributes but underscore style
//             // so updatedAt will be updated_at
//             underscored: true,
//
//             // disable the modification of tablenames; By default, sequelize will automatically
//             // transform all passed model names (first parameter of define) into plural.
//             // if you don't want that, set the following
//             freezeTableName: true,
//
//             classMethods: {
//                 // associate : function(models) {
//                 //     Baseline.belongsToMany(models.Anomaly, { through: 'device_type', foreignKey: 'device_type' });
//                 // },
//             },
//         });
//
//     FpIotDevices.sync({force: false, alter: true})
//         .catch(err => {
//             logger.error(err);
//         });
//
//     /**
//      * Persist new device record
//      * @param device
//      * @returns {Promise<void>}
//      */
//     FpIotDevices.handleInsert = async( device ) => {
//         await FpIotDevices.create(device);
//     };
//
//     return FpIotDevices;
// };
//
// export default fpIotDevices;
