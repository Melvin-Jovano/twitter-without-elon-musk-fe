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

export async function getAllPostsById({limit, page}){
    return await axios.get(`${API_URL}user/posts`, {
        params: {
            limit: limit || 10,
            page: page || 1
        }
    })
}