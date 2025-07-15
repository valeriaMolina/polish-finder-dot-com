/**
 * @author Valeria Molina Recinos
 */

import axiosInstance from '@/utils/axios';

/**
 * This is a protected endpoint
 * @param {*} firstPolishId
 * @param {*} secondPolishId
 * @returns
 */
export async function submitDupe(firstPolishId, secondPolishId) {
    try {
        const response = await axiosInstance.post(`/submit/dupe`, {
            polishId: firstPolishId,
            dupeId: secondPolishId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * this is a protected endpoint
 * @param {String} brandName
 * @param {String} brandUrl
 * @returns
 */
export async function submitBrand(brandName, brandUrl) {
    const body = {
        brandName,
    };
    if (brandUrl) {
        body.brandUrl = brandUrl;
    }
    try {
        const response = await axiosInstance.post(`/submit/brand`, body);
        return response.data;
    } catch (error) {
        console.error(error);
        if (error.response.data.error === 'SubmissionDuplicate') {
            throw new Error('SubmissionDuplicate');
        } else if (error.response.data.error === 'SubmissionAlreadyExists') {
            throw new Error('SubmissionAlreadyExists');
        } else {
            throw error;
        }
    }
}

export async function submitPolish(body) {
    try {
        console.log(body);
        const response = await axiosInstance.post('/submit/polish', body);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function submitPolishImage(file, submissionId) {
    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('submissionId', submissionId);
        const response = await axiosInstance.put('/submit/polish-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);
    } catch (error) {
        throw new Error('UploadImageFailed');
    }
}

/**
 * This is a protected endpoint
 * @returns
 */
export async function getDupeSubmissions() {
    try {
        const response = await axiosInstance.get('/submissions/dupes');
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * This is a protected endpoint
 * @returns
 */
export async function getBrandSubmissions() {
    try {
        const response = await axiosInstance.get('/submissions/brands');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getPolishSubmissions() {
    try {
        const response = await axiosInstance.get('/submissions/polish');
        return response.data;
    } catch (error) {
        throw error;
    }
}
