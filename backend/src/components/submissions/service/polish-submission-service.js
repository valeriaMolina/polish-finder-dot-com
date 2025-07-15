/**
 * @author Valeria Molina Recinos
 */
// external dependencies
const brands = require('../../brands/db/brands');
const colors = require('../../polish/db/colors');
const types = require('../../polish/db/types');
const users = require('../../users/db/users');
const polishSubmissionsModel = require('../db/polish-submissions');
const formulaService = require('../../polish/service/formula-service');
const colorService = require('../../polish/service/color-service');

async function insertNewPolishSubmission(attributes) {
    // assuming it's not in db already
    const newSubmission = await polishSubmissionsModel.create(attributes);
    return newSubmission;
}

async function addImageUrlToPolishSubmissions(submissionId, imageUrl) {
    const submission = await findSubmissionById(submissionId);
    submission.image_url = imageUrl;
    await submission.save();
    return submission;
}

async function submissionExists(brandId, name) {
    const submissionExists = await polishSubmissionsModel.findOne({
        where: {
            brand_id: brandId,
            name: name,
        },
    });
    return submissionExists;
}

async function findSubmissionById(submissionId) {
    const submission = await polishSubmissionsModel.findOne({
        where: {
            submission_id: submissionId,
        },
    });
    return submission;
}

async function updatePolishSubmissionStatus(polishSubmission, status) {
    polishSubmission.status = status;
    await polishSubmission.save();
    return polishSubmission;
}

async function getAllPolishSubmissions() {
    const allSubmissions = await polishSubmissionsModel.findAll({
        include: [
            {
                model: users,
                attributes: ['username'],
            },
            {
                model: brands,
                attributes: ['name'],
            },
            {
                model: types,
                attributes: ['name'],
            },
            {
                model: colors,
                attributes: ['name'],
            },
        ],
    });

    let returnObject = [];
    for (const submission of allSubmissions) {
        const polishInfo = {};
        polishInfo.secondary = await Promise.all(
            submission.effect_colors_ids.map(async (colorId) => {
                const color = await colorService.findColorById(colorId);
                return color.name;
            })
        );
        polishInfo.formulas = await Promise.all(
            submission.formula_ids.map(async (formulaId) => {
                const formula = await formulaService.findFormulaById(formulaId);
                return formula.name;
            })
        );
        returnObject.push({ ...submission.toJSON(), ...polishInfo });
    }
    return returnObject;
}

module.exports = {
    insertNewPolishSubmission,
    submissionExists,
    findSubmissionById,
    updatePolishSubmissionStatus,
    addImageUrlToPolishSubmissions,
    getAllPolishSubmissions,
};
