<template>
    <div class="container justify-content-between p-4">
        <div class="row">
            <div class="col-3">
                <HeaderSide />
            </div>
            <div class="col-3 hv-95 overflow-auto">
                <div class="row px-2 mb-4">
                    <div class="col-8">
                        <h4>Messages</h4>
                    </div>
                    <div class="col-1">
                        <IconChatSetting />
                    </div>
                    <div class="col-1">
                        <IconChatNewChat />
                    </div>
                </div>
                <div class="px-3">

                    <div v-if="chatListStores.list.length === 0">
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
                        <div v-for="chatList in chatListStores.list" :key="chatList.id">
                            <div>{{ chatList.group_id }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col d-flex justify-content-center align-items-center overflow-auto">
                <div class="w-50">
                    <h3 class="fw-bold">Select a message</h3>
                    <p class="text-muted px-2 mb-4">
                        Choose from your existing conversations, start a new one, or just keep swimming.
                    </p>
                    <button data-bs-toggle="modal" data-bs-target="#new-message-modal" class="py-3 px-5 btn-primary btn btn-lg border-50px bg-primary-twitter text-sm fw-bold text-sm">
                        New message
                    </button>
                </div>
            </div>
        </div>
    </div>

    <NewMessageModal />
</template>

<script setup>
    import HeaderSide from '../components/home/HeaderSide.vue';
    import IconChatSetting from '../assets/icons/IconChatSetting.vue';
    import IconChatNewChat from '../assets/icons/IconChatNewChat.vue';
    import NewMessageModal from '../components/chat/NewMessageModal.vue';
    import chatList from '../stores/chat_list';
    import {getChatLists} from '../api/chat_list';
    import { onMounted, ref } from 'vue';

    const chatListStores = chatList();
    const lastId = ref(null);

    onMounted(async () => {
        try {
            const getChatList = await getChatLists({limit: 10});
            if(getChatList.data.message === 'SUCCESS') {
                chatListStores.list = getChatList.data.data.data;
                lastId.value = getChatList.data.data.lastId;
            }
        } catch (error) {
            return;
        }
    });
</script>