<template>
    <div class="main">
        <div class="tablist-top">
            <h5 class="fw-bold m-3">Home</h5>
            <div class="tablist justify-content-between d-flex">
                <div class="p-3 present w-50">
                    <div class="text-center">
                        <span class="text text-forYou p-3">For you</span>
                    </div>
                </div>
                <div class="p-3 present w-50">
                    <div class="text-center">
                        <span class="text text-foll p-3">Following</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="all-content">
            <div class="form-content d-flex p-2" style="margin-top: 40px">
                <div class="profile-pict p-2">
                    <img src="../../assets/cat.jpg" alt="Profile" class="img">
                </div>
                <div class="form-input p-2 w-100">
                    <form>
                        <input type="text" class="text-input" accept="image/*" multiple="multiple" @change="previewMultiImage" v-model="newPost" placeholder="What's happening?">
                        <div class="mt-3">
                            <img class="rounded mx-auto d-block" :src="API_URL + previewImg" v-if="previewImg" width="400" />
                        </div>
                        <div class="media-upload mt-4">
                            <div class="icon-list d-flex">
                                <div class="icon m-2">
                                    <label for="file-input">
                                        <IconMedia />
                                    </label>
                                    <input id="file-input" type="file" @change="uploadImg" />
                                </div>
                                <div class="icon m-2">
                                    <IconGif />
                                </div>
                                <div class="icon m-2">
                                    <IconPoll />
                                </div>
                                <div class="icon m-2">
                                    <IconEmote />
                                </div>
                                <div class="icon m-2">
                                    <IconDate />
                                </div>
                                <div class="icon m-2">
                                    <IconMap />
                                </div>
                                <div class="p-2 float-right">
                                    <button type="button" class="btn btn-primary text-center fw-bold"
                                        @click="createPosts">Tweet</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="content p-2" v-for="post in posts" :key="post.id">
                <div class="content-header p-2">
                    <div class="d-flex">
                        <div class="profile-pict mt-3 m-2">
                            <img :src="API_URL + post.user.photo" alt="Profile" class="img" />
                        </div>
                        <div class="content-body p-2">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <span style="margin: 2px">
                                        <span id="nickname" style="font-size: 15px; font-weight: 700;">{{
                                            post.user.name
                                        }}</span>
                                    </span>
                                    <span style="margin: 2px">
                                        <span id="username" style="color: #536471; font-weight: 400; font-size: 15px;">@{{
                                            post.user.username
                                        }}</span>
                                    </span>
                                    <span style="margin: 2px">
                                        <span asd>·</span>
                                    </span>
                                    <span style="margin: 2px">
                                        <time style="color: #536471; font-size: 15px;">13h</time>
                                    </span>
                                </div>
                                <div class="rounded-circle threedots bgBiru" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <IconTrash />
                                </div>
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <h3>Delete Tweet?</h3>
                                                <p>This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from
                                                Twitter search results.</p>
                                                <button class="btn btn-danger" @click="deletPost">Delete</button>
                                                <button class="btn btn-white" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <router-link :to="{name: 'detail', params: {id: post.id}}">
                                <div class='mb-2'>
                                    <span>{{ post.content }}</span>
                                </div>
                                <div class='text-center'>
                                    <img class='post img-fluid' :src='API_URL + post.img '>
                                </div>
                            </router-link>
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
            <button @click="loadMore">show more reviews</button>
        </div>
    </div>
</template>

<script setup>
// import icon
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

// import api
import { ref, onMounted } from 'vue';
import { getAllPosts, addPosts, addImg } from '../../api/posts.js'
import { API_URL, DEFAULT_PHOTO } from '../../const';

const page = ref(0);
const limit = ref();
const posts = ref([]);
const newPost = ref("");
let previewImg = ref(null);

async function getPosts() {
    try {
        const getPosts = await getAllPosts({ page: page.value, limit: limit.value });
        if (getPosts.data.message === 'get all post success') {
            posts.value = getPosts.data.data;
        }
    } catch (error) {
        return
    }
}

async function createPosts(e) {
    try {
        e.preventDefault();
        const createNewPost = await addPosts({ content: newPost.value, img: previewImg.value });
        if (createNewPost.data.message === 'Create new post success') {
            console.log(newPost.value);
        }
    } catch (error) {
        console.log(error);
    }
}

async function uploadImg(e) {
    const uploadImg = await addImg(e.target.files[0]);
    previewImg.value = uploadImg.data.data;
}

// async function deletPost() {
//     try {
//         const deletePost = await deleteContent()
//         if (deletePost.data.message === 'Post deleted successfully') {
//             posts.value.id = deletePost.data.data
//             console.log(posts.value.id);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }



onMounted(async () => {
    await getPosts();
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