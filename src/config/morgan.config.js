import path from 'path';
import morgan from 'morgan';

const rfs = require('rotating-file-stream');

export const morganConfig = () => {
    // create a write stream (in append mode)
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../../logs')
    });

    return morgan('combined', { stream: accessLogStream });
};
