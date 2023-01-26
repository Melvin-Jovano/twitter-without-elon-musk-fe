<template>
    <div class="container justify-content-center">
        <div class="row">
            <div class="col-3">
                <HeaderSide />
            </div>
            <div class="col-6">
                <div class="content p-2">
                    <div class="content-header p-2">
                        <div class="d-flex">
                            <div class="profile-pict mt-3 m-2">
                                <img v-if="postId !== null" :src="API_URL + postId.user.photo" alt="Profile" class="img" />
                            </div>
                            <div class="content-body p-2">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex">
                                        <span style="margin: 2px">
                                            <span v-if="postId !== null" id="nickname" style="font-size: 15px; font-weight: 700;">{{postId.user.name}}</span>
                                        </span>
                                        <span style="margin: 2px">
                                            <span v-if="postId !== null" id="username" style="color: #536471; font-weight: 400; font-size: 15px;">@{{postId.user.username}}</span>
                                        </span>
                                        <span style="margin: 2px">
                                            <span asd>·</span>
                                        </span>
                                        <span style="margin: 2px">
                                            <time v-if="postId !== null" style="color: #536471; font-size: 15px;">{{moment(postId.created_at).fromNow()}}</time>
                                        </span>
                                    </div>
                                    <div class="rounded-circle threedots bgBiru" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <IconTrash />
                                    </div>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-body">
                                                    <h3>Delete Tweet?</h3>
                                                    <p>This can’t be undone and it will be removed from your profile, the timeline of
                                                        any accounts that follow you, and from
                                                        Twitter search results.</p>
                                                    <button class="btn btn-danger" @click="deletPost">Delete</button>
                                                    <button class="btn btn-white" data-bs-dismiss="modal"
                                                        aria-label="Close">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='mb-2'>
                                    <span v-if="postId !== null">{{ postId.content }}</span>
                                </div>
                                <div class='text-center'>
                                    <img v-if="postId !== null && postId.img !== null" class='post img-fluid' :src='API_URL + postId.img'>
                                </div>
                                <div class="content-icon">
                                    <div class="d-flex">
                                        <div class="icon-range d-flex">
                                            <IconComment />
                                            <span id="count">35</span>
                                        </div>
                                        <div class="icon-range d-flex">
                                            <IconRetweet />
                                            <span id="count">35</span>
                                        </div>
                                        <div class="icon-range d-flex">
                                            <IconLike />
                                            <span id="count">35</span>
                                        </div>
                                        <div class="icon-range d-flex">
                                            <IconView />
                                            <span id="count">35</span>
                                        </div>
                                        <div class="icon-range d-flex">
                                            <IconShare />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <SideMenuVue />
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
import IconMedia from '../../assets/icons/IconMedia.vue';
import IconGif from '../../assets/icons/IconGif.vue';
import IconPoll from '../../assets/icons/IconPoll.vue';
import IconMap from '../../assets/icons/IconMap.vue';
import IconDate from '../../assets/icons/IconDate.vue';
import IconEmote from '../../assets/icons/IconEmote.vue';
import IconView from '../../assets/icons/IconView.vue';
import IconComment from '../../assets/icons/IconComment.vue';
import IconLike from '../../assets/icons/IconLike.vue';
import IconRetweet from '../../assets/icons/IconRetweet.vue';
import IconShare from '../../assets/icons/IconShare.vue'
import IconThreeDots from '../../assets/icons/IconThreeDots.vue'
import IconTrash from '../../assets/icons/IconTrash.vue'

import { API_URL, DEFAULT_PHOTO } from '../../const';
import { ref, onMounted } from 'vue';
import { getPostsById } from '../../api/posts.js'
import HeaderSide from './HeaderSide.vue';
import SideMenuVue from './SideMenu.vue';
import {useRoute} from "vue-router";

const postId = ref(null);

const route = useRoute();

async function getPostsId() {
    try {
        const getPosts = await getPostsById(route.params.id);
        if (getPosts.data.message === 'get all post success') {
            postId.value = getPosts.data.data;
        }
    } catch (error) {
        console.log(error);
    }
}


onMounted(async () => {
    await getPostsId();
});
</script>

<style scoped>
/* .tablist */

.content {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: 0.3s;
}

.content:hover {
    background-color: rgba(15, 20, 25, 0.1);
    cursor: pointer;
}

.form-content {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.main {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.post {
    border-radius: 20px;
}

.tablist-top {
    background-color: rgba(255, 255, 255, 0.884);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    /* z-index: 99999999; */
    position: relative;
    width: 100%;
}

.present {
    transition: 0.3s;
}

.present:hover {
    background-color: rgba(15, 20, 25, 0.1);
}

.text {
    color: rgb(83, 100, 113);
    font-weight: 500;
    font-size: 15px;
}

.text-forYou {
    border-bottom: 4px solid rgb(29, 155, 240);
    ;
    border-radius: 4px;
}

.text-input {
    border: none;
}

input:focus {
    outline: none
}

input[type="text"] {
    font-size: 20px;
}

input[type="file"] {
    display: none;
}

a {
    color: black;
    text-decoration: none;
}

::placeholder {
    font-size: 20px;
    font-weight: 400;
}

.img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

#count {
    padding: 10px;
}

.icon-range {
    margin-right: 50px;
    margin-top: 10px;
}

.bgBiru:hover {
    background-color: rgba(29, 155, 240, 0.1);
    fill: rgb(29, 155, 240) !important;
}
</style>