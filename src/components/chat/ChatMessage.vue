<template>
    <div class="col d-flex justify-content-center align-items-center overflow-auto" v-if="chatStores.messages.length === 0">
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
        <!-- TODO Get userId -->
        <MessageBubble v-for="chat in chatStores.messages" :message="chat.content" :isMe="chat.sender_id === 3"  />
    </div>
</template>


<script setup>
    import MessageBubble from './MessageBubble.vue';
    import chat from '../../stores/chat';

    const chatStores = chat();
</script>