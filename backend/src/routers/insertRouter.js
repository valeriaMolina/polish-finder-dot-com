/**
 * @author Valeria Molina Recinos
 */

const logger = require('../config/logger');
const router = require('express').Router();
const brands = require('../models/brandModel');

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

    // // first check if the brand exists
    // const brandRows = await query('SELECT * FROM brands where brand_id = $1', [
    //     brand_id,
    // ]);
    // if (brandRows.rowCount === 0) {
    //     // brand does not exist yet, return error message
    //     // idea: redirect user to add the new brand
    //     return res.status(400).json({ error: 'Brand does not exist' });
    // }

    // const rows = await query(
    //     `INSERT INTO polishes (brand_id, type_id, primary_color_id, effect_colors, formula_ids, name, description)
    //    VALUES ($1, $2, $3, $4, $5, $6, $7)
    //    RETURNING *`,
    //     [
    //         brand_id,
    //         type_id,
    //         primary_color_id,
    //         effect_colors,
    //         formula_ids,
    //         name,
    //         description,
    //     ]
    // );

    // res.status(201).json({ polish: rows[0] });
    res.send('OK');
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
    const project = await brands.findOne({ where: { name: name } });
    if (project) {
        logger.error(`Brand ${name} already exists`);
        return res
            .status(400)
            .json({ error: `${name} is already in the database` });
    }

    // otherwise insert new brand into db
    const newBrand = await brands.create({ name: name });
    logger.info(
        `Added new brand ${name} with auto-generated ID: ${newBrand.brand_id}`
    );
    res.status(201).json({ brand: `${name}`, id: newBrand.brand_id });
});

module.exports = router;
