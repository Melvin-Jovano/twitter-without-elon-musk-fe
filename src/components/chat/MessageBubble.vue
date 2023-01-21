<template>
    <div v-if="props.isMe" class="text-end">
        <span class="bg-primary px-3 py-2 text-white text-sm fw-bold bubble">
            {{props.message}}
        </span>
        <div class="mt-2 text-xs">
            {{moment(props.time).fromNow()}}
        </div>
    </div>

    <div v-else class="text-start">
        <span class="fw-bold text-sm bubble-sender px-3 py-2">
            {{props.message}}
        </span>
        <div class="mt-2 text-xs">
            {{moment(props.time).fromNow()}}
        </div>
    </div>
</template>

<script setup>
    import chat from '../../stores/chat';
    import moment from 'moment';

    const props = defineProps({
        isMe: {
            type: Boolean,
            default: () => false
        },
        message: {
            type: String,
            default: () => ''
        },
        time: {
            type: String,
            default: () => moment().toString()
        }
    });
    const chatStores = chat();

</script>

<style scoped>
    .bubble {
        border-radius: 50px 50px 0 50px;
    }

    .bubble-sender {
        border-radius: 50px 50px 50px 0;
        background-color: whitesmoke;
    }
</style>