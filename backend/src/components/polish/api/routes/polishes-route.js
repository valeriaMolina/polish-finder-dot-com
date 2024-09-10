const logger = require('../../../../libraries/logger/logger'); //-
const router = require('express').Router();
const polishService = require('../../service/polish-service'); //-
const { validateAllPolishesSearch } = require('../middleware/polish-validator'); //-

/**
 * Handles the GET request to fetch all polishes.
 *
 * @param {import('express').Request} req - The request object containing query parameters.
 * @param {import('express').Response} res - The response object to send back to the client.
 * @returns {void}
 *
 * @throws Will throw an error if there is a problem fetching the polishes.
 *
 * @example
 * GET /polishes/all?page=1&limit=10
 *
 * @author Valeria Molina Recinos
 */
router.get('/all', validateAllPolishesSearch, async (req, res) => {
    logger.info('Fetching all polishes');
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const polishes = await polishService.getAllPolishes(page, limit);
        res.json(polishes);
    } catch (error) {
        logger.error(`Error fetching all polishes: ${error.message}`);
        res.status(500).send({ message: 'Error fetching all polishes' });
    }
});

module.exports = router;
