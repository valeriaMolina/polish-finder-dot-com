/**
 * @author Valeria Molina Recinos
 */

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
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

/**
 * Verifies the email client by sending a test email to the configured email address.
 *
 * @function verifyEmailClient
 *
 * @returns {void}
 *
 * @throws {Error} - Throws an error if there is an issue verifying the email client.
 *
 * @example
 * verifyEmailClient();
 */
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

/**
 * Sends a password reset email to the provided email address.
 *
 * @param {string} email - The email address to send the password reset email to.
 * @param {string} username - The username of the user associated with the email.
 * @param {string} passwordResetToken - The unique password reset token to include in the email link.
 *
 * @returns {Promise<object>} - A Promise that resolves with the info object returned by nodemailer's sendMail function.
 * If the email is successfully sent, the info object will contain details about the sent email.
 * If there is an error sending the email, the Promise will be rejected with an error.
 *
 * @throws {Error} - Throws an error if there is an issue sending the password reset email.
 * The error message will contain details about the failure.
 */
async function sendPasswordResetEmail(email, username, passwordResetToken) {
    const passwordResetLink = `${config.homePage}/reset-password?token=${passwordResetToken}`;

    const template = fs.readFileSync(
        path.join(
            __dirname,
            '..',
            '..',
            '..',
            'libraries',
            'templates',
            'password-reset.ejs'
        ),
        'utf8'
    );
    const emailContent = await ejs.render(template, {
        username,
        resetPasswordLink: passwordResetLink,
        homePage: config.homePage,
    });
    const mailOptions = {
        from: `Polish Finder <${config.noReplyMail}>`,
        to: email,
        subject: 'Reset your password',
        html: emailContent,
    };

    await transporter
        .sendMail(mailOptions)
        .then((info) => {
            logger.info(`Password reset email sent to ${email}`);
            logger.debug(info);
            return info;
        })
        .catch((error) => {
            logger.error(
                `Error sending password reset email to ${email}: ${error.message}`
            );
            throw new Error(`Error sending verification email to ${email}`);
        });
}

/**
 * Sends a verification email to the provided email address.
 *
 * @param {string} email - The email address to send the verification email to.
 * @param {string} username - The username of the user associated with the email.
 * @param {string} verificationToken - The unique verification token to include in the email link.
 *
 * @returns {Promise<object>} - A Promise that resolves with the info object returned by nodemailer's sendMail function.
 *
 * @throws {Error} - Throws an error if there is an issue sending the verification email.
 */
async function sendAccountVerificationEmail(
    email,
    username,
    verificationToken
) {
    const verifyLink = `${config.homePage}/verify?token=${verificationToken}`;

    const template = fs.readFileSync(
        path.join(
            __dirname,
            '..',
            '..',
            '..',
            'libraries',
            'templates',
            'verify-email.ejs'
        ),
        'utf8'
    );

    const emailContent = await ejs.render(template, {
        username,
        verificationLink: verifyLink,
        homePage: config.homePage,
    });

    const mailOptions = {
        from: `Polish Finder <${config.noReplyMail}>`,
        to: email,
        subject: 'Verify your Polish Finder',
        html: emailContent,
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
    sendPasswordResetEmail,
};
