import logger from '../util/logger';

const router = require('express').Router();

router.get('/', async (req, res) => {
    return res.json({ message: 'Kafka-Connector Admin', ts: new Date() })
});

export default router;