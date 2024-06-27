/**
 * @author Valeria Molina Recinos
 */

const polishSubmissionsModel = require('../db/polish-submissions');

async function insertNewPolishSubmission(attributes) {
    // assuming it's not in db already
    const newSubmission = await polishSubmissionsModel.create(attributes);
    return newSubmission;
}

module.exports = {
    insertNewPolishSubmission,
};
