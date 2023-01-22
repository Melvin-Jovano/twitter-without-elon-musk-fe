import axios from "axios";
import { API_URL } from "../const.js";

export async function getUser(){
    const user = await axios.get(`${API_URL}user`)
    return user
}

export async function deleteBackground(coverLink){
    const deleteCover = await axios.put(`${API_URL}user/delcover`, {
        cover : coverLink
    })
    return deleteCover
}

export async function updateBackground(){
    
}