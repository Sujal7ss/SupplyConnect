import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Use your Vite environment variable
    timeout: 10000, // Set a timeout (optional)
});

export default api;