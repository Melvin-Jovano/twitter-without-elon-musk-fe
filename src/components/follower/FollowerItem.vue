<template>
    <article class="ps-3 pe-3 followersItem" v-if="data.followerData">
        <div class="d-flex">
            <div class="d-flex flex-column" style="margin-right: 12px;">
                <div style="width: 48px; height: 48px;">
                    <a href="">
                        <div class="followerProfileWrapper">
                            <div class="position-absolute top-50 start-50 translate-middle rounded-circle followerProfile" v-if="data.followerData.photo" :style="{backgroundImage: `url('${API_URL}${data.followerData.photo}')`}">
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
                            {{ data.followerData.name || "Name" }}
                        </a>
                        <div class="d-flex">
                            <a href="" class="text-decoration-none fc-gray" style="line-height: 20px;">
                                @{{ data.followerData.username || "Username" }}
                            </a>
                            <div class="ps-1 pe-1 d-flex justify-content-center align-items-center followSign fc-gray ms-1">
                                Follows you
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div v-if="isFollowed" class="d-flex" style="margin-left: 12px; min-width: 97px;">
                            <button type="button" class="rounded-pill d-flex align-items-center text-decoration-none bg-transparent followingBtn followingTxt" :class="{unfollowBtn : hover}" @mouseover="hover = true" @mouseleave="hover = false">
                                {{ hover ? "Unfollow" : "Following" }}
                            </button>
                        </div>
                        <div v-else-if="!isFollowed" class="d-flex" style="margin-left: 12px;">
                            <button type="button" class="rounded-pill d-flex align-items-center text-decoration-none followBtn followTxt">
                                Follow
                            </button>
                        </div>
                        <div style="margin-left: 12px;">
                            <div class="rounded-circle bgIcon bgBiru">
                                <IconThreeDots style="width: 18px; height: 18px;"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-1">
                    {{ data.followerData.bio }}
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
    import { API_URL, DEFAULT_PHOTO } from '../../const';
    import IconThreeDots from '../../assets/icons/IconThreeDots.vue';
    import { reactive, watchEffect, ref, onMounted } from 'vue';

    const props = defineProps([
        "follower",
        "followerFollowing"
    ])

    const data = reactive({
        followerData : props.follower,
        followerFollowing : props.followerFollowing
    })

    const hover = ref(false)
    const isFollowed = ref(false)

    watchEffect(()=>{
        data.followerData = props.follower.follower
        data.followerFollowing = props.followerFollowing
        showFollowed(data.followerData)
    })

    function showFollowed(val){
        data.followerFollowing.forEach(element => {
            if(val.username == element.follower.username){
                isFollowed.value = true
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

    .unfollowBtn{
        background-color: rgba(244, 33, 46, 0.1) !important;
        border-color: rgb(253, 201, 206);
        color: rgb(244, 33, 46) !important;
        font-weight: 700;
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

    .followBtn{
        min-width: 32px;
        min-height: 32px;
        padding: 0 16px;
        border: 1px solid rgb(0, 0, 0);
        background-color: rgb(15, 20, 25);
    }

    .followTxt{
        font-size: 14px;
        line-height: 16px;
        color: white;
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

    .bgIcon{
        min-width: 34px;
        min-height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        fill: rgb(83, 100, 113);
    }
    
    .bgBiru:hover{
        background-color: rgba(29, 155, 240, 0.1);
        fill: rgb(29, 155, 240) !important;
    }

    .fc-gray{
        color: rgb(83, 100, 113) !important;
    }
</style>