/**
 * API for managing roles and permissions in the admin interface
 */

import axiosInstance from '@/utils/axios';

export async function fetchAllRoles() {
    try {
        const response = await axiosInstance.get('/role/all');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchAllUserRoles() {
    try {
        const response = await axiosInstance.get('/role/user-roles');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
