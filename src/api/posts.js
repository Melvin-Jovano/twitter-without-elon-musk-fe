import axios from "axios";
import {API_URL} from '../const.js';

export async function getAllPosts({limit, page}) {
    return await axios.get(`${API_URL}posts`, {
        params: {
            limit: limit || 10,
            page: page || 1
        }
    })
}

export async function addPosts(content) {
    return await axios.post(`${API_URL}posts`, {
        content: content
    })
}