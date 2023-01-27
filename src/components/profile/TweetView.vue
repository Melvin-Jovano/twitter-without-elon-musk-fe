<template>
    <RouterView/>
    <div class="d-flex align-items-center head" v-if="showComp">
        <div class="flex-shrink-1 me-4 pe-2">
            <div class="rounded-circle backButton bgHover">
                <IconBack/>
            </div>
        </div>
        <div class="d-flex flex-column flex-grow-1">
            <span class="fs-5 fw-bold lh-1">
                {{ data.userData.name || "Name" }}
            </span>
            <span class="fs-13 text-muted mb-1">
                {{ data.tweetsCount || 0 }} Tweets
            </span>
        </div>
    </div>
    <div class="d-flex flex-column mt-53" v-if="showComp">
        <div class="d-flex flex-column">
            <div class="w-100 bg-profile" v-if="data.userData.cover" :style="{backgroundImage: `url('${API_URL}${data.userData.cover}')`}"></div>
            <div class="w-100 bg-profile" v-else></div>
            <div class="d-flex flex-column profileInfo mb-3">
                <div class="d-flex w-100 justify-content-between">
                    <div class="w-25 mw-48 mt-15">
                        <div class="w-100 rounded-circle">
                            <a href="#">
                                <div class="square">
                                    <div class="position-absolute rounded-circle profileWrapper">
                                        <div class="position-absolute top-50 start-50 translate-middle rounded-circle profilePicture" v-if="data.userData.photo" :style="{backgroundImage: `url('${API_URL}${data.userData.photo}')`}">
                                        </div>
                                        <div class="position-absolute top-50 start-50 translate-middle rounded-circle profilePicture" v-else :style="{backgroundImage: `url('${API_URL}${DEFAULT_PHOTO}')`}">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <button type="button" class="rounded-pill d-flex align-items-center text-decoration-none bg-transparent editProfile bgHover fs-6 lh-sm fw-bold text-black" @click="openModal()" style="max-height: 36px;">
                        Edit profile
                    </button>
                </div>
                <div class="d-flex flex-column mt-1" style="margin-bottom: 12px;">
                    <span class="fw-bold fs-5 lh-sm">
                        {{ data.userData.name || "Name" }}
                    </span>
                    <div class="fc-gray fs-15 lh-sm">
                        @{{ data.userData.username || "Username" }}
                    </div>
                </div>
                <div v-if="data.userData.bio" style="margin-bottom: 12px;">
                    <span class="lh-sm fw-normal">
                        {{ data.userData.bio }}
                    </span>
                </div>
                <div v-else class="mt-1"></div>
                <div class="d-flex" style="margin-bottom: 12px;line-height: 12px; ">
                    <div class="fc-gray" style="margin-right: 12px;" v-if="data.userData.location">
                        <IconLocation class="me-1 align-text-bottom" style="width: 19px; height: 19px; fill: rgb(83, 100, 113) ;"/>
                        <span>
                            {{ data.userData.location }}
                        </span>
                    </div>
                    <div class="fc-gray">
                        <IconCalender class="me-1 align-text-bottom fc-gray"/>
                        <span>
                            Joined {{ data.userData.joinDate || "Year Month" }}
                        </span>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="me-3 pe-1">
                        <router-link to="/profile/following" class="text-decoration-none text-black underlineHover">
                            <span class="fw-bold fs-14">
                                {{ data.followingCount || 0 }}
                            </span>
                            <span class="fc-gray fs-14">
                                Following
                            </span>
                        </router-link>
                    </div>
                    <div>
                        <router-link to="/profile/follower" class="text-decoration-none text-black underlineHover">
                            <span class="fw-bold fs-14">
                                {{ data.followerCount || 0 }}
                            </span>
                            <span class="fc-gray fs-14">
                                Follower
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="border-bottom">
                <div class="d-flex">
                    <a href="" class="flex-fill text-decoration-none text-black d-flex justify-content-center align-items-center bgHover">
                        <div class="pt-3 pb-3 fb-500 menuClicked">
                            Tweets
                        </div>
                    </a>
                    <a href="" class="flex-fill text-decoration-none text-black d-flex justify-content-center align-items-center bgHover">
                        <div class="pt-3 pb-3 fc-gray fb-500">
                            Tweets & replies
                        </div>
                    </a>
                    <a href="" class="flex-fill text-decoration-none text-black d-flex justify-content-center align-items-center bgHover">
                        <div class="pt-3 pb-3 fc-gray fb-500">
                            Media
                        </div>
                    </a>
                    <a href="" class="flex-fill text-decoration-none text-black d-flex justify-content-center align-items-center bgHover">
                        <div class="pt-3 pb-3 fc-gray fb-500">
                            Likes
                        </div>
                    </a>
                </div>
            </div>
            <TweetBox
            v-if="data.tweetData"
            v-for="tweet in data.tweetData"
            :tweet = "tweet"
            :key="tweet.id"
            />
        </div>
        <EditModal :show = "data.isShow" :dataUser = data.userData @setModal="closeModal" @getData="getData" />
    </div>
</template>

<script setup>
    import IconBack from '../../assets/icons/IconBack.vue';
    import IconCalender from '../../assets/icons/IconCalender.vue';
    import IconLocation from '../../assets/icons/IconLocation.vue'
    import TweetBox from './TweetBox.vue'
    import EditModal from './EditModal.vue';
    import { reactive, ref, watchEffect } from 'vue';
    import { useRoute } from 'vue-router';
    import { API_URL, DEFAULT_PHOTO } from '../../const.js';
    import moment from 'moment';
    import { getUser } from '../../api/profile.js';
    import { getAllPostsById } from '../../api/posts.js';
    import { getAllFollowers, getAllFollowing } from '../../api/follow.js';

    const data = reactive({
        isShow : false,
        userData : {},
        tweetsCount : 0,
        tweetData : [],
        followerCount : 0,
        followingCount : 0
    })

    const showComp = ref(true)
    const router = useRoute()
    watchEffect(()=>{
        if(router.name == "follower" || router.name == "following"){
            showComp.value = false
        }
    })
    
    function openModal(){
        data.isShow = true
    }
    
    function closeModal(){
        data.isShow = false
    }

    function format_date(val){
        return moment(val).format('MMMM YYYY')
    }

    async function getData(){
        try{
            const user = await getUser()
            if(user.data.message === "SUCCESS"){
                data.userData = user.data.data
                data.userData.joinDate = format_date(data.userData.created_at)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function getPosts(){
        try {
            const posts = await getAllPostsById({})
            if(posts.data.message === "SUCCESS"){
                data.tweetsCount = posts.data.data.length
                data.tweetData = posts.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getFollowers(){
        try {
            const followers = await getAllFollowers()
            if(followers.data.message === "SUCCESS"){
                data.followerCount = followers.data.data.length
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getFollowing(){
        try {
            const following = await getAllFollowing()
            if(following.data.message === "SUCCESS"){
                data.followingCount = following.data.data.length
            }
        } catch (error) {
            console.log(error)
        }
    }

    getData()
    getPosts()
    getFollowers()
    getFollowing()
</script>

<style scoped>
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

    .underlineHover:hover{
        text-decoration: underline !important;
    }

    .fs-13{
        font-size: 13px;
    }

    .bg-profile{
        background-color: rgb(207, 217, 222);
        padding-bottom: 33.3333%;
        background-size: cover ;
        background-repeat: no-repeat;
        background-position: center top;
    }

    .profileInfo{
        padding: 12px 16px 0;
    }

    .mw-48{
        min-width: 48px;
    }

    .mt-15{
        margin-top: -15%;
    }

    .square{
        width: 100%;
        padding-top: 100%;
        position: relative;
    }

    .profileWrapper{
        background-color: white;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .profilePicture{
        width: calc(100% - 7px);
        height: calc(100% - 7px);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-color: rgb(207, 217, 222);
    }

    .editProfile{
        margin-bottom: 12px;
        min-width: 36px;
        min-height: 36px;
        padding: 0 16px;
        border: 1px solid rgb(207, 217, 222);
        color: black;
    }

    .fc-gray{
        color: rgb(83, 100, 113);
    }
    
    .fs-15{
        font-size: 15px;
    }

    .fs-14{
        font-size: 14px;
    }

    .fb-500{
        font-weight: 500;
    }

    .head{
        position: fixed;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 6px 16px;
        z-index: 10;
        width: inherit;
        box-sizing: border-box;
        max-width: 659px;
    }

    .mt-53{
        margin-top: 57px;
        width: 100%;
    }

    .menuClicked{
        color: rgb(15, 20, 25) !important;
        font-weight: bold !important;
        border-bottom: 4px solid rgb(29, 155, 240) !important;
    }
</style>