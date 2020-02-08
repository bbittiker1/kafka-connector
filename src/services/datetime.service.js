const moment = require('moment');

export const MomentDateTime = {
    getYesterdayUTC: function() {
        return moment().utc(false).subtract(1, "day");
    },

    getStartOfDayTimestampUTC: function(momentDate) {
        return moment(momentDate).utc().startOf('day').format("X");
    },

    getEndOfDayTimestampUTC: function(momentDate) {
        return moment(momentDate).utc().endOf('day').format("X")
    },

    getFmtDateUTC: function(momentDate, format) {
        return moment(momentDate).utc().format(format);
    }
};
