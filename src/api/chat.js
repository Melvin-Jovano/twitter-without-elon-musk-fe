import axios from "axios";
import {API_URL} from '../const.js';

export async function getChatByGroupId({limit, lastId}, {groupId}) {
    return await axios.get(`${API_URL}chat/group/${groupId}`, {
        params: {
            limit,
            last_id: lastId
        }
    });
}

export async function addChatList({userIds, name}) {
    return await axios.post(`${API_URL}chat-list`, {
        userIds, 
        name
    });
}

export async function getChatLists({limit, lastId}) {
    return await axios.get(`${API_URL}chat-list`, {
        params: {
            limit, 
            last_id: lastId
        }
    });
}

export async function sendChat({groupId, senderId, content}) {
    return await axios.post(`${API_URL}chat`, {
        groupId, 
        senderId, 
        content
    });
}