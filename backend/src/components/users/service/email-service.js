/**
 * @author Valeria Molina Recinos
 */

const nodemailer = require('nodemailer');

const config = require('../../../libraries/config/config');
const logger = require('../../../libraries/logger/logger');

const transporter = nodemailer.createTransport({
    host: config.emailHost,
    name: config.emailHost,
    port: config.emailPort,
    secure: true,
    auth: {
        user: config.emailId,
        pass: config.emailCode,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

function verifyEmailClient() {
    transporter
        .verify()
        .then((success) => {
            logger.info('Email client verified');
            logger.debug(success);
        })
        .catch((error) => {
            logger.error(`Error verifying email client: ${error.message}`);
        });
}

async function sendAccountVerificationEmail(email) {
    const mailOptions = {
        from: config.noReplyMail,
        to: email,
        subject: 'Verify your Polish Finder',
        text: 'Verify your account btch',
    };

    await transporter
        .sendMail(mailOptions)
        .then((info) => {
            logger.info(`Verification email sent to ${email}`);
            logger.debug(info);
            return info;
        })
        .catch((error) => {
            logger.error(
                `Error sending verification email to ${email}: ${error.message}`
            );
            throw new Error(`Error sending verification email to ${email}`);
        });
}

module.exports = {
    sendAccountVerificationEmail,
    verifyEmailClient,
};
