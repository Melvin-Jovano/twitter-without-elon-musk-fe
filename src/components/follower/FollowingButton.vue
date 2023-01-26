<template>
    <div class="d-flex" style="margin-left: 12px; min-width: 97px;">
        <button type="button" class="rounded-pill d-flex align-items-center text-decoration-none bg-transparent followingBtn followingTxt" :class="{unfollowBtn : hover}" @mouseover="hover = true" @mouseleave="hover = false" @click="delFollowing(data.compKey)">
            {{ hover ? "Unfollow" : "Following" }}
        </button>
    </div>
</template>

<script setup>
    import { ref, reactive, watchEffect } from 'vue';
    import { deleteFollowing } from '../../api/follow.js';

    const props = defineProps(["id"])
    const data = reactive({
        compKey : props.id,
        test : true
    })

    const emit = defineEmits(["reloadData"])
    const hover = ref(false)

    watchEffect(()=>{
        data.compKey = props.id
    })

    async function delFollowing(val){
        const delFol = await deleteFollowing(val)
        if(delFol.data.message === "SUCCESS"){
            emit('reloadData')
        }
    }

</script>

<style scoped>
    .unfollowBtn{
        background-color: rgba(244, 33, 46, 0.1) !important;
        border-color: rgb(253, 201, 206);
        color: rgb(244, 33, 46) !important;
        font-weight: 700;
    }

    .followingBtn{
        min-width: 32px;
        min-height: 32px;
        padding: 0 16px;
        border: 1px solid rgb(207, 217, 222);
    }

    .followingTxt{
        font-size: 14px;
        line-height: 16px;
        color: rgb(15, 20, 25);
        font-weight: 700;
    }
</style>