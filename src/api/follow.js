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

export async function followUser(id){
    const createFollow = await axios.post(`${API_URL}follower`, {
        followerId : id
    })
    return createFollow
}

export async function deleteFollowing(id){
    const delFollowing = await axios.delete(`${API_URL}delFollowing`,{
        data:{
            followerId : id
        }
    })
    return delFollowing
}