import axios from "axios";
import { API_URL } from "../const.js";

export async function getAllFollowers(){
    const Followers = await axios.get(`${API_URL}followers`)
    return Followers
}

export async function getAllFollowing(){
    const Following = await axios.get(`${API_URL}following`)
    return Following
}