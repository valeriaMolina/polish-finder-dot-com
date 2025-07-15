/**
 * Utility functions for creating request objects
 * @author Valeria Molina Recinos
 */

/**
 * format request for requesting a new polish
 * @param {Object} data
 * @returns {Object} request body object
 */
export function formatPolishSubmission(data) {
    return {
        brandName: data.brandName,
        type: data.polishType,
        primaryColor: data.primaryColor.name,
        effectColors: data.secondaryColors.map((color) => color.name),
        formulas: data.selectedFormulas.map((formula) => formula.name),
        name: data.polishName,
        description: data.description,
    };
}
