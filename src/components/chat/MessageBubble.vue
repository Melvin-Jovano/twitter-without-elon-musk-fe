<template>
    <div v-if="props.isMe" class="text-end">
        <span class="bg-primary px-3 py-2 text-white fw-bold rounded-50px">
            {{props.message}}
        </span>
    </div>

    <div v-else>
        {{props.message}}
    </div>
</template>

<script setup>
    import chat from '../../stores/chat';

    const props = defineProps({
        isMe: {
            type: Boolean,
            default: () => false
        },
        message: {
            type: String,
            default: () => ''
        }
    });
    const chatStores = chat();

</script>