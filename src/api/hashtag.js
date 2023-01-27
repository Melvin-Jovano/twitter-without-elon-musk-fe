import axios from "axios";
import {API_URL} from '../const.js';

export function getTrends({limit}) {
    return axios.get(`${API_URL}hashtags`, {
        params: {
            limit
        }
    });
}