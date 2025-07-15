const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const logger = require('../logger/logger');
const { FileNotSupportedError } = require('../utils/error-handler');

/**
 * Meant for user submission pictures
 * @param {*} image
 * @param {*} name
 */
async function uploadToCloud(image) {
    return new Promise((resolve) => {
        cloudinary.uploader
            .upload_stream((error, response) => {
                return resolve(response);
            })
            .end(image);
    })
        .then((response) => {
            logger.info(
                `Buffer upload_stream with promise success - ${response.public_id}`
            );
            return response;
        })
        .catch((error) => {
            logger.error(`Buffer upload_stream with promise error - ${error}`);
            throw error;
        });
}

/**
 * Get the URl for the given image
 * @param {string} id
 * @returns {string} - The URL of the image
 */
async function getAssetUrl(id) {
    return new Promise((resolve) => {
        cloudinary.api.resource(id).then((asset) => {
            resolve(asset.url);
        });
    });
}

/**
 * Multer middleware for file upload
 */
const upload = multer({
    limits: { fileSize: 10000000 },
    fileFilter: (_, file, cb) => {
        checkFileType(file, cb);
    },
}).single('image'); // limit is 10 MB

/**
 * Ensure that the file type is supported
 * @param {*} file
 * @param {*} cb
 * @returns
 */
function checkFileType(file, cb) {
    // allowed extensions
    const fileTypes = /jpeg|jpg|png|gif/;
    // check extention
    const extName = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // check mime type
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb(new FileNotSupportedError('File type is not supported'));
    }
}

module.exports = { upload, uploadToCloud, getAssetUrl };
