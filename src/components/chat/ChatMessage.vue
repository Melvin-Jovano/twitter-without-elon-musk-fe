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
        <div class="hv-80 mt-3 overflow-auto">
            <MessageBubble v-for="(chat, idx) in chatStores.messages" :message="chat.content" :time="chat.created_at" :isMe="chat.sender_id === sessionStores.userId" :stacked="idx+2 <= chatStores.messages.length && chatStores.messages[idx+1].sender_id === chat.sender_id" :isFirst="idx === 0" :key="chat.id" />
        </div>
        <div class="row py-1 px-2 rounded-50px input-wrapper">
            <div class="col-1">
                <IconImage />
            </div>
            <div class="col-1">
                <IconGif />
            </div><div class="col-1">
                <IconEmote />
            </div>
            <div class="col">
                <input type="text" class="outline-focus-none border-0 bg-transparent form-control-sm form-control text-sm" placeholder="Start a new message">
            </div>
            <div class="col-1 text-start">
                <IconSend />
            </div>
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

    const chatStores = chat();
    const sessionStores = session();
</script>

<style scoped>
    .input-wrapper {
        background-color: rgba(144, 178, 245, 0.15);
    }
</style>