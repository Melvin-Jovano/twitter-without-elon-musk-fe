<template>
    <div class="d-flex flex-column head">
        <div class="d-flex align-items-center" style="padding: 6px 16px;">
            <div class="flex-shrink-1 me-4 pe-2">
                <a href="/profile" class="rounded-circle backButton bgHover">
                    <IconBack/>
                </a>
            </div>
            <div class="d-flex flex-column flex-grow-1">
                <span class="fs-5 fw-bold" style="line-height: 24px;">
                    {{ data.userData.name || "Name" }}
                </span>
                <span class="text-muted mb-1" style="font-size: 14px;">
                    @{{ data.userData.username || "Username"}}
                </span>
            </div>
        </div>
        <div class="d-flex">
            <button href="/follower" class="border-0 bg-transparent flex-fill text-decoration-none text-black d-flex justify-content-center align-items-center pse-16 bgHover" @click="selected = true">
                <div class="pt-3 pb-3 fb-500 fc-gray" :class="{menuClicked : selected}">
                    Followers
                </div>
            </button>
            <button href="" class="border-0 bg-transparent flex-fill text-decoration-none d-flex justify-content-center align-items-center pse-16 bgHover" @click="selected = false">
                <div class="pt-3 pb-3 fc-gray fb-500" :class="{menuClicked : !selected}">
                    Following
                </div>
            </button>
        </div>
    </div>
    <div style="margin-top: 120px;" >
        <FollowerItem
        v-if="data.followerData && selected"
        v-for="follower in data.followerData"
        :follower = "follower"
        :key="follower.id"
        :followerFollowing="data.followerAndFollowing"
        />

        <FollowingItem
        v-else-if="data.followingData && !selected"
        v-for="following in data.followingData"
        :following = "following"
        :key="following.id"
        :followerFollowing="data.followerAndFollowing"
        />
    </div>
</template>

<script setup>
    import IconBack from '../../assets/icons/IconBack.vue';
    import { reactive, onMounted, ref, watchEffect } from 'vue';
    import { getUser } from '../../api/profile';
    import FollowerItem from './FollowerItem.vue';
    import { getAllFollowers, getAllFollowing } from '../../api/follow.js'
    import FollowingItem from './FollowingItem.vue';

    const data = reactive({
        userData: {},
        followerData : [],
        followingData : [],
        followerAndFollowing : []
    })

    const selected = ref(true)

    function getFollowEachOther(){
        try {
            data.followerData.forEach(follower => {
                data.followingData.forEach(following => {
                    if(follower.follower.username == following.user.username){
                        data.followerAndFollowing.push(follower)
                    }
                })
            });
        } catch (error) {
            console.log(error)
        }
    }

    watchEffect(()=>{
        getFollowEachOther()
    })

    async function getData(){
        try{
            const user = await getUser()
            if(user.data.message === "SUCCESS"){
                data.userData = user.data.data
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function getFollowers(){
        try {
            const followers = await getAllFollowers()
            if(followers.data.message === "SUCCESS"){
                data.followerData = followers.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getFollowing(){
        try {
            const following = await getAllFollowing()
            if(following.data.message === "SUCCESS"){
                data.followingData = following.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    onMounted(()=>{
        getData()
        getFollowers()
        getFollowing()
        getFollowEachOther()
    })
</script>

<style scoped>
    .head{
        position: fixed;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 10;
        width: inherit;
        max-width: 658px;
    }

    .backButton{
        min-width: 34px;
        min-height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .bgHover:hover{
        background-color: rgba(15, 20, 25, 0.1) !important;
    }

    .fb-500{
        font-weight: 500;
    }

    .fc-gray{
        color: rgb(83, 100, 113);
    }

    .menuClicked{
        color: rgb(15, 20, 25) !important;
        font-weight: bold !important;
        border-bottom: 4px solid rgb(29, 155, 240) !important;
    }

    .pse-16{
        padding: 0px 16px;
    }
</style>