import logger from "../../util/logger";

const formatMacAddress = new RegExp(/:/, 'g');

/**
 * TODO: ADD JSON VALIDATION WHEN WE ARE CERTAIN OF REQUIRED FORMATS
 *
 * ADD MESSAGE TYPE
 */
export async function formatMessage(message, type) {
    try {
        message = JSON.parse(message);

        if (!message.mac) {
            return null;
        }

        message.mac = message.mac.replace(formatMacAddress, "");

        return { mac: message.mac, message: JSON.stringify({
            "did": message.did,
            "type": message.type,
            "manufacturer": message.manufacturer,
            "make": "",
            "model": "4K",
            "icon": "appletv"
        }) };
    } catch(e) {
        logger.error(e);
        throw e;
    }
}