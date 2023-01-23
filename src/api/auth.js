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

export async function getUsers({username, name}, {limit, lastId}) {
    const usernameFilter = (username !== undefined) 
        ? {
            username
        }
        : {};

    const nameFilter = (name !== undefined) 
        ? {
            name
        }
        : {};

    return await axios.get(`${API_URL}user`, {
        params: {
            ...nameFilter,
            ...usernameFilter,
            limit: limit || 10,
            lastId: lastId || 0
        }
    });
}