import axios from "axios";
import {API_URL} from '../const.js';

export async function likePost({postId}) {
    return await axios.put(`${API_URL}like/post/${postId}`);
}