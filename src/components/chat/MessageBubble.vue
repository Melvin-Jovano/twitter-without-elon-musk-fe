<template>
    <div v-if="props.isMe" :class="`text-end px-3 py-1 ${props.isFirst ? 'mt-3' : ''}`">
        <span :class="`bg-primary-twitter px-3 py-3 text-white text-sm fw-bold ${props.stacked ? 'rounded-50px' : 'bubble'}`">
            {{props.message}}
        </span>
        <div v-if="!props.stacked" class="my-3 text-xs">
            {{moment(props.time).fromNow()}}
        </div>
        <div v-else>&nbsp;</div>
    </div>
    <div v-else :class="`text-start px-3 py-1 ${props.isFirst ? 'mt-3' : ''}`">
        <span :class="`fw-bold text-sm px-3 py-3 bg-whitesmoke ${props.stacked ? 'rounded-50px' : 'bubble-sender'}`">
            {{props.message}}
        </span>
        <div v-if="!props.stacked" class="my-3 text-xs">
            {{moment(props.time).fromNow()}}
        </div>
        <div v-else>&nbsp;</div>
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