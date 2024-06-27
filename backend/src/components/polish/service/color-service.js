/**
 * @author  Valeria Molina Recinos
 */

const colorModel = require('../db/colors');

async function findColorByName(name) {
    const color = await colorModel.findOne({ where: { name: name } });
    return color;
}

module.exports = {
    findColorByName,
};
