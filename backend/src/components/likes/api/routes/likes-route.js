/**
 * @author Valeria Molina Recinos
 */

const router = require('express').Router();
const logger = require('../../../../libraries/logger/logger');

router.post('/like', async (req, res) => {
    logger.info('Received like request');
    try {
        const userId = req.body.userId;
        const polishId = req.body.polishId;
        return res.json({ userId, polishId });
    } catch (error) {
        logger.error(`Error while liking polish: ${error.message}`);
        return res.status(500).send({ error: 'Internal server error' });
    }
});

router.post('/unlike', async (req, res) => {
    logger.info('Received unlike request');
    try {
        const userId = req.body.userId;
        const polishId = req.body.polishId;
        return res.json({ userId, polishId });
    } catch (error) {
        logger.error(`Error while unliking polish: ${error.message}`);
        return res.status(500).send({ error: 'Internal server error' });
    }
});

router.get('/:userId/likes', async (req, res) => {
    logger.info('Received request to get likes for a user');
    try {
        const userId = req.params.userId;
        return res.json({ userId });
    } catch (error) {
        logger.error(`Error while getting likes for user: ${error.message}`);
        return res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;
