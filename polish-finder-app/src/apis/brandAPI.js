/**
 * @author Valeria Molina Recinos
 */

import axios from 'axios';
import config from '@/config';

const SERVER = config.SERVER;

/**
 * Get all the available brands
 * @returns {Promise<Array>} - Array of brands
 */
export async function fetchBrands() {
    try {
        const request = await axios.get(`${SERVER}/brands/all`);
        return request.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
