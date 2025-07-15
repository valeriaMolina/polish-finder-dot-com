/**
 * @author: Valeria Molina Recinos
 * Config for backend
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    postgresUri: process.env.POSTGRES_URI,
    saltRounds: process.env.SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRES,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRES,
    emailHost: process.env.SMTP_EMAIL_HOST,
    emailPort: process.env.SMTP_EMAIL_PORT,
    emailId: process.env.EMAIL_USERNAME,
    emailCode: process.env.EMAIL_PASSWORD,
    noReplyMail: process.env.NO_REPLY_EMAIL,
    homePage: process.env.HOME_PAGE,
    cloudinaryKey: process.env.CLOUDINARY_URL,
};
