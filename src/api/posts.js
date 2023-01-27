import axios from "axios";
import {API_URL} from '../const.js';

export async function getAllPosts({limit, lastId}) {
    let lastIdFilter = {};
    if(lastId !== undefined) {
        lastIdFilter = {
            last_id: lastId
        }
    }

    return await axios.get(`${API_URL}posts`, {
        params: {
            limit: limit || 10,
            ...lastIdFilter
        }
    })
}

export async function getAllPostsById({limit, lastId}){
    let lastIdFilter = {};
    if(lastId !== undefined) {
        lastIdFilter = {
            last_id: lastId
        }
    }

    return await axios.get(`${API_URL}userposts`, {
        params:{
            limit : limit || 10,
            ...lastIdFilter
        }
    })
}

export async function getPostsById(id) {
    return await axios.get(`${API_URL}posts/${id}`)
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

export async function deleteContent(id) {
    return await axios.delete(`${API_URL}posts/${id}`)
}