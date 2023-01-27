import axios from "axios";
import { API_URL, DEFAULT_PHOTO } from "../const.js";

export async function getUser(){
    const user = await axios.get(`${API_URL}user`)
    return user
}

export async function updateBackground(img, oldImg){
    if(oldImg){
        await deleteBackground(oldImg)
    }
    const formData = new FormData();
    formData.append('cover', img);
    const updateCover = await axios.put(`${API_URL}user/cover`, formData, {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    })
    return updateCover
}

export async function deleteBackground(coverLink){
    const deleteCover = await axios.put(`${API_URL}user/delcover`, {
        cover : coverLink
    })
    return deleteCover
}

export async function updatePhoto(img, oldImg){
    if(oldImg !== DEFAULT_PHOTO){
        deletePhoto(oldImg)
    }
    const formData = new FormData();
    formData.append('photo', img);
    const updatePhotoProfile = await axios.put(`${API_URL}user/photo`, formData, {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    })
    return updatePhotoProfile
}

export async function deletePhoto(photo){
    const deletePhoto = await axios.put(`${API_URL}user/delphoto`, {
        oldImg : photo
    })
    return deletePhoto
}

export async function updateUserInfo(bio, name, location){
    const userInfo = await axios.put(`${API_URL}user`, {
        bio: bio,
        name: name,
        location: location
    })
    return userInfo
}