import axios from "axios";
import {API_URL} from '../const.js';

export async function getChatByGroupId({limit, lastId}, {groupId}) {
    return await axios.get(`${API_URL}chat/group/${groupId}`, {
        limit,
        last_id: lastId
    });
}