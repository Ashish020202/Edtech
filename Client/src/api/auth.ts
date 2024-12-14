import axios from 'axios';

const API_URL = 'https://edtech-7q57.onrender.com/api/auth';

export const signup = (data: { email: string; password: string; role: string }) => {
    return axios.post(`${API_URL}/signup`, data);
};

export const login = (data: { email: string; password: string;role:string }) => {
    return axios.post(`${API_URL}/login`, data);
};

export const Userapi = axios.create({
    baseURL: `${API_URL}`, 
    headers: {
        'Content-Type': 'application/json',
    },
});
