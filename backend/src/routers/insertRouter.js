/**
 * @author Valeria Molina Recinos
 */

const logger = require('../config/logger');
const router = require('express').Router();
const brandService = require('../services/brandService');
const polishService = require('../services/polishService');
const userService = require('../services/userService');
const typeService = require('../services/typeService');
const colorService = require('../services/colorService');
const formulaService = require('../services/formulaService');
const {
    validateInsertPolish,
    validateInsertBrand,
} = require('../utils/insertPolishValidator');

router.post('/api/uploadPolish', validateInsertPolish, async (req, res) => {
    logger.info('Received request to upload a new polish');
    const {
        name,
        brandName,
        type,
        primaryColor,
        effectColors,
        formulas,
        description,
    } = req.body;
    // check for the brand name
    const brand = await brandService.findBrandNameInTable(brandName);
    if (!brand) {
        // if the brand is not found, we return an error
        return res
            .status(400)
            .json({ error: `Brand ${name} is not in database` });
    }

    // check for the type
    const typeQuery = await typeService.findTypeByName(type);
    const typeId = typeQuery.type_id;

    // check for color id's
    const primaryColorQuery = await colorService.findColorByName(primaryColor);
    const primaryColorId = primaryColorQuery.color_id;
    let effectColorIds = await Promise.all(
        effectColors.map(async (color) =>
            colorService.findColorByName(color).then((color) => color.color_id)
        )
    );
    let formulaIds = await Promise.all(
        formulas.map(async (formula) =>
            formulaService
                .findFormulaByName(formula)
                .then((formula) => formula.formula_id)
        )
    );

    // insert into polish database with the following attributes
    const attributes = {
        brand_id: brand.brand_id,
        type_id: typeId,
        primary_color: primaryColorId,
        effect_colors: effectColorIds,
        formula_ids: formulaIds,
        name: name,
        description: description,
    };

    // INSERT new polish into database
    logger.info(`Adding new polish ${name}`);
    const newPolish = await polishService.insertNewPolish(attributes);
    logger.info(
        `Added new polish ${name} with auto-generated ID: ${newPolish.polish_id}`
    );
    res.status(201).json({ newPolish });
});

// Define the route to insert a new brand
router.post('/api/brand', validateInsertBrand, async (req, res) => {
    logger.info(`Received request to add new brand`);
    const { name } = req.body;

    // Check if brand is already in the database
    const brandQuery = await brandService.findBrandNameInTable(name);
    if (brandQuery) {
        logger.error(`Brand ${name} already exists`);
        return res
            .status(400)
            .json({ error: `${name} is already in the database` });
    }

    // otherwise insert new brand into db
    const newBrand = await brandService.insertNewBrand(name);
    logger.info(
        `Added new brand ${name} with auto-generated ID: ${newBrand.brand_id}`
    );
    res.status(201).json({ brand: `${name}`, id: newBrand.brand_id });
});

module.exports = router;
