<template>
    <div v-if="props.isMe" :class="`text-end px-3 py-1 ${props.isFirst ? 'mt-3' : ''}`">
        <span :class="`bg-primary-twitter px-3 py-3 text-white text-sm fw-bold ${props.stacked ? 'rounded-50px' : 'bubble'}`">
            {{props.message}}
        </span>
        <div v-if="!props.stacked" class="my-3 text-xs">
            {{moment(props.time).fromNow()}}
            <span v-if="props.isSeen && props.isMe && !props.isGroup">&nbsp;·&nbsp;Seen</span>
            <span v-if="!props.isSeen && props.isMe && !props.isGroup">&nbsp;·&nbsp;Sent</span>
        </div>
        <div v-else>&nbsp;</div>
    </div>

    <div v-else :class="`text-start px-3 py-1 ${props.isFirst ? 'mt-3' : ''}`">
        <img v-if="props.isGroup" :src="API_URL + props.img" width="40" class="rounded-circle">&nbsp;
        <span :class="`fw-bold text-sm px-3 py-3 bg-whitesmoke ${props.stacked ? 'rounded-50px' : 'bubble-sender'}`">
            {{props.message}}
        </span>
        <div v-if="!props.stacked" class="my-3 text-xs">
            <span v-if="props.isGroup">{{props.name}}</span>&nbsp;{{moment(props.time).fromNow()}}
            <span v-if="props.isSeen && props.isMe && !props.isGroup">&nbsp;·&nbsp;Seen</span>
            <span v-if="!props.isSeen && props.isMe && !props.isGroup">&nbsp;·&nbsp;Sent</span>
        </div>
        <div v-else>&nbsp;</div>
    </div>
</template>

<script setup>
    import chat from '../../stores/chat';
    import moment from 'moment';
    import { API_URL, DEFAULT_PHOTO } from '../../const';

    const props = defineProps({
        isSeen: {
            type: Boolean,
            default: () => false
        },
        isMe: {
            type: Boolean,
            default: () => false
        },
        stacked: {
            type: Boolean,
            default: () => false
        },
        isFirst: {
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
        },
        isGroup: {
            type: Boolean,
            default: () => false
        },
        img: {
            type: String,
            default: () => DEFAULT_PHOTO
        },
        name: {
            type: String,
            default: () => ''
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
    }

    .bg-whitesmoke {
        background-color: whitesmoke;
    }
</style>