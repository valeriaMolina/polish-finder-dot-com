/**
 * @author Valeria Molina Recinos
 */

import axiosInstance from '@/utils/axios';

export async function reviewDupe(id, status) {
    try {
        const response = await axiosInstance.put(`/update/dupe?id=${id}&status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function reviewBrand(id, status) {
    try {
        const response = await axiosInstance.put(`/update/brand?id=${id}&status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
