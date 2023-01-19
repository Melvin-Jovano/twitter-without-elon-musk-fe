import axios from "axios";
import {API_URL} from '../const.js';

export async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return await axios.post(`${API_URL}auth/refresh`, {
        refreshToken
    });
}

export async function logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    return await axios.post(`${API_URL}auth/logout`, {
        refreshToken
    });
}