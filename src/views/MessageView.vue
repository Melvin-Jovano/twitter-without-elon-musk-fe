<template>
    <div class="container justify-content-between p-4">
        <div class="row">
            <div class="col-3">
                <HeaderSide />
            </div>
            <ChatList :key="chatStores.chatListKey" />
            <ChatMessage />
        </div>
    </div>

    <NewMessageModal />
</template>

<script setup>
    import HeaderSide from '../components/home/HeaderSide.vue';
    import ChatMessage from '../components/chat/ChatMessage.vue';
    import NewMessageModal from '../components/chat/NewMessageModal.vue';
    import ChatList from '../components/chat/ChatList.vue';
    import chat from '../stores/chat';

    const chatStores = chat();
</script>