/**
 * @author Valeria Molina Recinos
 */

const router = require('express').Router();
const logger = require('../../../../libraries/logger/logger');
const likesService = require('../../service/likes-service');
const {
    validateLikeRequest,
    validateGetLikesRequest,
} = require('../middleware/likes-validator');
const {
    authenticateToken,
} = require('../../../rbac/api/middleware/rbac-middeware');

router.post('/like', validateLikeRequest, async (req, res) => {
    logger.info('Received like request');
    try {
        const email = req.body.email;
        const polishId = req.body.polishId;
        const like = await likesService.likePolish(email, polishId);
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

router.post('/unlike', validateLikeRequest, async (req, res) => {
    logger.info('Received unlike request');
    try {
        const email = req.body.email;
        const polishId = req.body.polishId;
        await likesService.unlikePolish(email, polishId);
        return res.end();
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error not anticipated
            logger.error(`Error unliking polish: ${error.message}`);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }
});

router.get(
    '/:email/likes',
    authenticateToken,
    validateGetLikesRequest,
    async (req, res) => {
        logger.info('Received request to get likes for a user');
        try {
            const email = req.params.email;
            const likes = await likesService.getUserLikes(email);
            return res.json(likes);
        } catch (error) {
            logger.error(
                `Error while getting likes for user: ${error.message}`
            );
            return res.status(500).send({ error: 'Internal server error' });
        }
    }
);

module.exports = router;
