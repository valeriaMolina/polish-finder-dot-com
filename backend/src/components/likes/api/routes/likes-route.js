/**
 * @author Valeria Molina Recinos
 */

const router = require('express').Router();
const logger = require('../../../../libraries/logger/logger');
const likesService = require('../../service/likes-service');

router.post('/like', async (req, res) => {
    logger.info('Received like request');
    try {
        const userId = req.body.userId;
        const polishId = req.body.polishId;
        const like = await likesService.likePolish(userId, polishId);
        return res.json({ like });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error not anticipated
            logger.error(`Error liking polish: ${error.message}`);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }
});

router.post('/unlike', async (req, res) => {
    logger.info('Received unlike request');
    try {
        const userId = req.body.userId;
        const polishId = req.body.polishId;
        await likesService.unlikePolish(userId, polishId);
        return res.end();
    } catch (error) {
        logger.error(`Error while unliking polish: ${error.message}`);
        return res.status(500).send({ error: 'Internal server error' });
    }
});

router.get('/:userId/likes', async (req, res) => {
    logger.info('Received request to get likes for a user');
    try {
        const userId = req.params.userId;
        const likes = await likesService.findLikesByUserId(userId);
        return res.json(likes);
    } catch (error) {
        logger.error(`Error while getting likes for user: ${error.message}`);
        return res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;
