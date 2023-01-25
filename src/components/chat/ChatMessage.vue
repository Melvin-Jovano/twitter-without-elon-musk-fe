<template>
    <div class="col d-flex justify-content-center align-items-center overflow-auto" v-if="chatStores.showHeading">
        <div class="w-50" >
            <h3 class="fw-bold">Select a message</h3>
            <p class="text-muted px-2 mb-4">
                Choose from your existing conversations, start a new one, or just keep swimming.
            </p>
            <button data-bs-toggle="modal" data-bs-target="#new-message-modal" class="py-3 px-5 btn-primary btn btn-lg border-50px bg-primary-twitter text-sm fw-bold text-sm">
                New message
            </button>
        </div>
    </div>

    <div class="col" v-else>
        <div class="row">
            <div class="col-1">
                <img :src="API_URL + chatStores.photo" class="rounded-circle" width="32" height="32" alt="" srcset="">
            </div>
            <div class="col-5 fw-bold">
                {{ chatStores.name }}
            </div>
            <div class="col text-end">
                <IconInfoVue />
            </div>
        </div>
        <div class="hv-80 mt-3 overflow-auto" @scroll="scrolledToTop($event.target)" id="chat-bubbles">
            <MessageBubble v-for="(chat, idx) in chatStores.messages" :message="chat.content" :time="chat.created_at" :isMe="chat.sender_id === sessionStores.userId" :stacked="idx+2 <= chatStores.messages.length && chatStores.messages[idx+1].sender_id === chat.sender_id" :isFirst="idx === 0" :key="chat.id" :isSeen="chat.is_read"/>
        </div>
        <div>
            <form action="#" @submit.prevent="sendMessage()" class="row py-1 px-2 rounded-50px input-wrapper">
                <div class="col-1">
                    <span class="cursor-pointer">
                        <IconImage />
                    </span>
                </div>
                <div class="col-1">
                    <span class="cursor-pointer">
                        <IconGif />
                    </span>
                </div><div class="col-1">
                    <span class="cursor-pointer">
                        <IconEmote />
                    </span>
                </div>
                <div class="col">
                    <input v-model="chatInput" type="text" class="outline-focus-none border-0 bg-transparent form-control-sm form-control text-sm" placeholder="Start a new message">
                </div>
                <div class="col-1 text-start">
                    <button type="submit" :disabled="!(chatInput.length > 0)" class="border-0 cursor-pointer">
                        <IconSend />
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import MessageBubble from './MessageBubble.vue';
    import IconInfoVue from '../../assets/icons/IconInfo.vue'
    import chat from '../../stores/chat';
    import session from '../../stores/session';
    import IconImage from '../../assets/icons/IconImage.vue';
    import IconSend from '../../assets/icons/IconSend.vue';
    import IconGif from '../../assets/icons/IconGif.vue';
    import IconEmote from '../../assets/icons/IconEmote.vue';
    import { API_URL } from '../../const';
    import { ref, onMounted } from 'vue';
    import { getChatByGroupId } from '../../api/chat';
    import { chatSocket } from '../../main';
    import { scrollTopElement } from '../../utils/util';

    const chatInput = ref('');
    const chatStores = chat();
    const sessionStores = session();

    async function sendMessage() {
        try {
            chatSocket.socket.emit("add-chat", {
                groupId: chatStores.groupId, 
                senderId: sessionStores.userId,
                content: chatInput.value
            });
            chatInput.value = '';
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async function scrolledToTop(div) {
        if(div.scrollTop === 0 && chatStores.messagesLastId !== null) {
            const getChats = await getChatByGroupId({limit: 10, lastId: chatStores.messagesLastId}, {groupId: chatStores.groupId});
            if(getChats.data.message === 'SUCCESS') {
                chatStores.messagesLastId = getChats.data.data.lastId;
                chatStores.messages = [...getChats.data.data.data.reverse(), ...chatStores.messages];
            }
        }
    }

    onMounted(() => {
        chatSocket.socket.on('new-chat', (body) => {
            if(body.group_id === chatStores.groupId) {
                chatStores.messages.push(body);
                setTimeout(() => {
                    const chatBubbles = document.getElementById('chat-bubbles');
                    scrollTopElement(chatBubbles, chatBubbles.scrollHeight);
                }, 1);
            }
        });

        chatSocket.socket.on('seen-chat', (chatIds) => {
            chatStores.messages = chatStores.messages.map(chat => {
                if(chatIds.includes(chat.id)) {
                    chat.is_read = true;
                }
                return chat;
            });
        });
    });
</script>

<style scoped>
    .input-wrapper {
        background-color: rgba(144, 178, 245, 0.15);
    }
</style>