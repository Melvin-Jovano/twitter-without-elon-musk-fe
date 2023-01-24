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

export async function getPostsById({limit, page}) {
    return await axios.get(`${API_URL}posts`)
}

export async function addPosts({content, img}) {
    return await axios.post(`${API_URL}posts`, {
        content, 
        img
    })
}

export async function addImg(img) {
    const data = new FormData();
    data.append('img', img);
    return await axios.post(`${API_URL}post/upload-img`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}