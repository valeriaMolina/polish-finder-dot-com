/**
 * @author Valeria Molina Recinos
 */

const logger = require('../config/logger');
const query = require('../db/index');
const router = require('express').Router();

// define the route to insert a new polish
router.post('/api/uploadPolish', async (req, res) => {
    const {
        brand_id,
        type_id,
        primary_color_id,
        effect_colors,
        formula_ids,
        name,
        description,
    } = req.body;

    // Check if required fields are provided
    if (
        !brand_id ||
        !type_id ||
        !primary_color_id ||
        !effect_colors ||
        !formula_ids ||
        !name ||
        !description
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // first check if the brand exists
    const brandRows = await query('SELECT * FROM brands where brand_id = $1', [
        brand_id,
    ]);
    if (brandRows.rowCount === 0) {
        // brand does not exist yet, return error message
        // idea: redirect user to add the new brand
        return res.status(400).json({ error: 'Brand does not exist' });
    }

    const rows = await query(
        `INSERT INTO polishes (brand_id, type_id, primary_color_id, effect_colors, formula_ids, name, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
        [
            brand_id,
            type_id,
            primary_color_id,
            effect_colors,
            formula_ids,
            name,
            description,
        ]
    );

    res.status(201).json({ polish: rows[0] });
});

// Define the route to insert a new brand
router.post('/api/brand', async (req, res) => {
    logger.info(`Received request to add new brand`);
    const { name } = req.body;

    // Check if the required field is provided
    if (!name) {
        return res.status(400).json({ error: 'Missing required field: name' });
    }

    // Check if brand is already in the database
    const brandRows = await query('SELECT * FROM brands where name = $1', [
        name,
    ]);
    if (brandRows.rowCount > 0) {
        return res.status(400).json({ error: 'Brand already exists' });
    }

    // otherwise insert new brand into db
    const result = await query(
        'INSERT INTO brands (name) VALUES ($1) RETURNING *',
        [name]
    );

    res.status(201).json({ brand: result.rows[0] });
});

module.exports = router;
