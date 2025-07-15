/**
 * @author Valeria Molina Recinos
 */

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const config = require('../../../libraries/config/config');
const logger = require('../../../libraries/logger/logger');
const userService = require('../service/user-service');

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

function close() {
    transporter.close();
    logger.info('Email client closed');
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
    const passwordResetLink = `${config.homePage}/reset-password/${passwordResetToken}`;

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

/**
 * Send a password changed email to the user associated with
 * the provided userId.
 * @function sendPasswordChangedEmail
 * @param {string} userId - The unique identifier of the user whose
 * password has been changed.
 * @returns {Promise<object>} - A Promise that resolves with the info object returned by nodemailer's sendMail function.
 * If the email is successfully sent, the info object will contain details about the sent email.
 * If there is an error sending the email, the Promise will be rejected with an error.
 * @throws {Error} - Throws an error if there is an issue sending the password changed email.
 * The error message will contain details about the failure.
 */
async function sendPasswordChangedEmail(userId) {
    // get the user based on userId
    try {
        const template = fs.readFileSync(
            path.join(
                __dirname,
                '..',
                '..',
                '..',
                'libraries',
                'templates',
                'password-reset-success.ejs'
            ),
            'utf8'
        );

        const user = await userService.getUserByUserId(userId);
        const username = user.username;

        const emailContent = await ejs.render(template, {
            username,
            homePage: config.homePage,
            resetPasswordRoute: '/password-reset',
            email: user.email,
        });

        const mailOptions = {
            from: `Polish Finder <${config.noReplyMail}>`,
            to: user.email,
            subject: 'Your password has been changed',
            html: emailContent,
        };

        await transporter
            .sendMail(mailOptions)
            .then((info) => {
                logger.info('Password changed email sent');
                return info;
            })
            .catch((error) => {
                logger.error(
                    `Error sending password change email: ${error.message}`
                );
                throw new Error(`Error sending password change email`);
            });
    } catch (error) {
        logger.error(
            `Error fetching user for password change email: ${error.message}`
        );
        throw new Error('Error fetching user for password change email');
    }
}

/**
 * Sends an email to the user to notify them about the status of their submission.
 *
 * @param {*} userId - The ID of the user to whom the email will be sent.
 * @param {*} type - The type of submission.
 * @param {*} status - The status of the submission.
 * @param {*} details - Additional details about the submission.
 * @returns {Promise<void>} A promise that resolves when the email has been sent.
 * @throws {Error} Throws an error if there is an issue fetching the user or sending the email.
 */
async function sendSubmissionStatusEmail(userId, type, status, details) {
    try {
        const template = fs.readFileSync(
            path.join(
                __dirname,
                '..',
                '..',
                '..',
                'libraries',
                'templates',
                'submission-update.ejs'
            ),
            'utf8'
        );

        const user = await userService.getUserByUserId(userId);
        const username = user.username;
        const email = user.email;

        const emailContent = await ejs.render(template, {
            homePage: config.homePage,
            username: username,
            type: type,
            details: details,
            status: status,
        });

        const mailOptions = {
            from: `Polish Finder <${config.noReplyMail}>`,
            to: email,
            subject: 'Your submission has been reviewed!',
            html: emailContent,
        };
        await transporter
            .sendMail(mailOptions)
            .then((info) => {
                logger.info('Submission status email sent');
                return info;
            })
            .catch((error) => {
                logger.error(
                    `Error sending submission status email: ${error.message}`
                );
                throw new Error(`Error sending submission status email`);
            });
    } catch (error) {
        logger.error(
            `Error fetching user for submission status email: ${error.message}`
        );
        throw error;
    }
}

module.exports = {
    sendAccountVerificationEmail,
    close,
    verifyEmailClient,
    sendPasswordResetEmail,
    sendPasswordChangedEmail,
    sendSubmissionStatusEmail,
};
