<template>
    <div class="col-4 hv-95 overflow-auto">
        <div class="row px-2 mb-4">
            <div class="col-8">
                <h4>Messages</h4>
            </div>
            <div class="col-1 cursor-pointer">
                <IconChatSetting />
            </div>
            <div class="col-1 cursor-pointer" data-bs-toggle="modal" data-bs-target="#new-message-modal" >
                <IconChatNewChat />
            </div>
        </div>
        <div class="px-3">
            <div v-if="chatStores.list.length === 0">
                <h2 class="fw-bold">
                    Welcome to your inbox!
                </h2>
                <p class="text-muted mb-4">
                    Drop a line, share Tweets and more with private conversations between you and others on Twitter. 
                </p>
                <div>
                    <button data-bs-toggle="modal" data-bs-target="#new-message-modal" class="p-3 px-4 btn-primary btn btn-lg border-50px bg-primary-twitter text-sm fw-bold text-sm">
                        Write a message
                    </button>
                </div>
            </div>

            <div v-else>
                <div v-for="chatList in chatStores.list" :key="chatList.id" @click="selectChatList(chatList.id, chatList.name, chatList.photo)" class="chat-list cursor-pointer p-2 chat-list">
                    <table>
                        <tr>
                            <td rowspan="2" class="">
                                <img v-if="chatList.photo !== null" :src="API_URL + chatList.photo" alt="" class="rounded-circle" width="40" height="40" />
                                <img v-else :src="API_URL + DEFAULT_PHOTO" alt="" class="rounded-circle" width="40" height="40" />
                                &nbsp;&nbsp;
                            </td>
                            <td class="fw-bold text-sm">
                                {{ chatList.name }}&nbsp;
                                
                                <span class="text-muted text-xs">
                                    <span v-if="chatList.username !== null">
                                        @{{ chatList.username }}&nbsp;
                                    </span>
                                    ·&nbsp;
                                    <span v-if="chatList.time !== null">
                                        {{ moment(chatList.time).fromNow() }}
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted text-sm">
                                <span v-if="chatList.lastChat === null">
                                    &nbsp;
                                </span>
                                <span v-else>
                                    {{ chatList.lastChat }}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {getChatByGroupId, getChatLists} from '../../api/chat';
    import { onMounted, ref } from 'vue';
    import { API_URL } from '../../const';
    import moment from 'moment';
    import chat from '../../stores/chat';
    import IconChatSetting from '../../assets/icons/IconChatSetting.vue';
    import IconChatNewChat from '../../assets/icons/IconChatNewChat.vue';

    const chatStores = chat();
    const lastId = ref(null);

    async function selectChatList(groupId, name, photo) {
        try {
            const getChats = await getChatByGroupId({}, {groupId});
            if(getChats.data.message === 'SUCCESS') {
                chatStores.showHeading = false;
                chatStores.messages = getChats.data.data.data.reverse();
                chatStores.name = name;
                chatStores.photo = photo;
                chatStores.groupId = groupId;
            }
        } catch (error) {
            return;
        }
    }

    onMounted(async () => {
        try {
            const getChatList = await getChatLists({limit: 10});
            if(getChatList.data.message === 'SUCCESS') {
                chatStores.list = getChatList.data.data.data;
                lastId.value = getChatList.data.data.lastId;
            }
        } catch (error) {
            return;
        }
    });
</script>

<style scoped>
    .chat-list:hover {
        background-color: rgba(144, 178, 245, 0.15);
    }
</style>