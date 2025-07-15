import config from '@/config';
import axios from 'axios';

const SERVER = config.SERVER;

// create a single instance of axios
const axiosInstance = axios.create({
    baseURL: SERVER,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    /**
     * Interceptor handles errors received from the server
     * @param {*} error
     * @returns
     */
    async (error) => {
        console.log(`Interceptor at work: ${error.message}`);
        const originalRequest = error.config;
        if (!originalRequest._retry) {
            // if the request is not a retry and the error is due to expired token, refresh the token and retry the request
            if (
                error.response.data.name === 'TokenExpiredError' ||
                error.response.data.name === 'JsonWebTokenError' ||
                error.response.data.name === 'Forbidden' ||
                error.response.data.name === 'MissingTokenError'
            ) {
                originalRequest._retry = true;
                console.log(`Retrying refreshing token...`);
                try {
                    await axiosInstance.post(`${SERVER}/refresh`);
                    // tokens are stored in http cookies
                    console.log(`Token refreshed!`);
                    // retry the original request
                    return axiosInstance(originalRequest);
                } catch (error) {
                    // if refreshing token fails, log out the user and redirect to login page
                    console.error('Error refreshing token: ', error.message);
                    return Promise.reject(new Error('InvalidTokenError'));
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
