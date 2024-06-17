/**
 * @author  Valeria Molina Recinos
 */

const colorModel = require('../models/colorModel');

async function findColorByName(name) {
    const color = await colorModel.findOne({ where: { name: name } });
    return color;
}

module.exports = {
    findColorByName,
};
