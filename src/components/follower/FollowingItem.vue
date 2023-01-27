<template>
    <article class="ps-3 pe-3 followersItem">
        <div class="d-flex">
            <div class="d-flex flex-column" style="margin-right: 12px;">
                <div style="width: 48px; height: 48px;">
                    <a href="">
                        <div class="followerProfileWrapper">
                            <div class="position-absolute top-50 start-50 translate-middle rounded-circle followerProfile" v-if="data.followingData.user.photo" :style="{backgroundImage: `url('${API_URL}${data.followingData.user.photo}')`}">
                            </div>
                            <div class="position-absolute top-50 start-50 translate-middle rounded-circle followerProfile" v-else :style="{backgroundImage: `url('${API_URL}${DEFAULT_PHOTO}')`}">
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="d-flex flex-column flex-grow-1">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-column">
                        <a href="" class="text-black text-decoration-none fw-bold underlineHover" style="line-height: 20px;">
                            {{ data.followingData.user.name || "Name" }}
                        </a>
                        <div class="d-flex">
                            <a href="" class="text-decoration-none fc-gray" style="line-height: 20px;">
                                @{{ data.followingData.user.username || "Username" }}
                            </a>
                            <div v-if="isTag" class="ps-1 pe-1 d-flex justify-content-center align-items-center followSign fc-gray ms-1">
                                Follows you
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <FollowingButton :id="data.followingItem" @reloadData="reloadData" />
                    </div>
                </div>
                <div class="pt-1">
                    {{ data.followingData.user.bio }}
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
    import { API_URL, DEFAULT_PHOTO } from '../../const';
    import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
    import FollowingButton from './FollowingButton.vue';

    const props = defineProps([
        "following",
        "followerFollowing"
    ])
    
    const data = reactive({
        followingData : props.following,
        followerFollowing : props.followerFollowing,
        followingItem : null
    })

    const emit = defineEmits(["reloadData"])
    
    const comp = getCurrentInstance()
    const isTag = ref(false)

    onMounted(()=>{
        data.followingItem = comp.vnode.key
        showTag(data.followingData.user)
    })

    function reloadData(){
        emit("reloadData")
    }
    
    function showTag(val){
        data.followerFollowing.forEach(element => {
            if(val.username == element.follower.username){
                isTag.value = true
            }
        });
    }
</script>

<style scoped>
    .followersItem{
        padding: 12px 16px;
    }
    .followersItem:hover{
        background-color: rgba(0, 0, 0, 0.03);
        cursor: pointer;
    }

    .followerProfileWrapper{
        width: 100%;
        padding-top: 100%;
        position: relative;
    }

    .followerProfile{
        background-color: rgb(207, 217, 222);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        padding-top: 100%;
    }

    .underlineHover:hover{
        text-decoration: underline !important;
    }

    .followSign{
        padding-top: 2px;
        padding-bottom: 2px;
        line-height: 12px;
        font-size: 11px;
        background-color: rgb(239, 243, 244);
    }

    .fc-gray{
        color: rgb(83, 100, 113) !important;
    }
</style>