import axios from 'axios';
import config from '@/config';

const SERVER = config.SERVER;

/**
 * Fetches a list of polishes from the server.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The maximum number of polishes to return per page.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the fetched polishes.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function fetchPolish(page, limit) {
    try {
        const request = await axios.get(`${SERVER}/polish/all?page=${page}&limit=${limit}`);
        return request.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Fetches a single polish from the server by its id.
 *
 * @param {number} polishId - The id of the polish to fetch.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the fetched polish.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function findOnePolish(polishId) {
    try {
        const request = await axios.get(`${SERVER}/polish/${polishId}`);
        return request.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Fetch polishes associated with the given brand id
 * @param {*} brandId
 * @param {*} page
 * @param {*} limit
 * @returns
 * todo: make page and limit optional to just return all the polishes associated with this brand
 */
export async function getPolishesByBrandId(brandId, page, limit) {
    try {
        const request = await axios.get(
            `${SERVER}/polish/by-brand/${brandId}?page=${page}&limit=${limit}`
        );
        return request.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Fetch all the colors in the database
 * @returns {Promise<Array<Object>} - A promise that resolves to an object containing the fetched brands.
 */
export async function fetchAllColors() {
    try {
        const request = await axios.get(`${SERVER}/colors/all`);
        return request.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchAllFormulas() {
    try {
        const request = await axios.get(`${SERVER}/formulas/all`);
        return request.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
