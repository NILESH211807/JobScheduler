import axios from 'axios';


// Create a dedicated axios instance
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchData = async (url, options = {}) => {
    try {
        const response = await apiClient(url, options);
        return response.data;
    } catch (error) {
        // Optionally format the error
        console.error('API request failed:', error);
        throw error.response?.data || error;
    }
};