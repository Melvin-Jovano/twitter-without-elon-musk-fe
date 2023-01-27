<template>
    <div class="main overflow-auto hv-99" @scroll="scrolledToBottom($event.target)">
        <div class="tablist-top">
            <h5 class="fw-bold m-3">Home</h5>
            <div class="tablist justify-content-between d-flex">
                <div class="p-3 present w-50 cursor-pointer">
                    <div class="text-center">
                        <span class="text text-forYou p-3">For you</span>
                    </div>
                </div>
                <div class="p-3 present w-50 cursor-pointer">
                    <div class="text-center">
                        <span class="text text-foll p-3">Following</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="all-content">
            <div class="form-content d-flex p-2" style="margin-top: 40px">
                <div class="profile-pict p-2">
                    <img :src="API_URL + sessionStores.photo" alt="Profile" class="img">
                </div>
                <div class="form-input p-2 w-100">
                    <form action="#" @submit.prevent="createPosts($event.target)">
                        <textarea v-model="newPost" class="text-input border-0 w-100" placeholder="What's happening?" rows="3"></textarea>
                        <div class="mt-3">
                            <img class="rounded mx-auto d-block" :src="API_URL + previewImg" v-if="previewImg" width="400" />
                        </div>
                        <div class="media-upload mt-4">
                            <div class="d-flex justify-content-between">
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
                                </div>
                                <div class="p-2 float-right">
                                    <button type="submit" class="btn btn-primary text-center fw-bold" :disabled="isDisabled(newPost)">Tweet</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="content p-2 overflow-auto" v-for="post in posts" :key="post.id">
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
                                        <time style="color: #536471; font-size: 15px;">{{moment(post.created_at).fromNow()}}</time>
                                    </span>
                                </div>
                                
                                <div @click="selectedPostId = post.id" v-if="sessionStores.userId === post.user.id" class="rounded-circle threedots bgBiru" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <IconTrash />
                                </div>

                                <div class="modal fade" id="exampleModal">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <h3>Delete Tweet?</h3>
                                                <p>This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from
                                                Twitter search results.</p>
                                                <button data-bs-dismiss="modal" class="btn btn-danger" type="submit" @click="deletPost()">Delete</button>
                                                <button class="btn btn-white" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <router-link :to="{name: 'detail', params: {id: post.id}}">
                                <div class='mb-2'>
                                    <!-- TODO Add Blue Text Color If Its Hashtag -->
                                    <span>{{ post.content }}</span>
                                </div>
                                <div class='text-center'>
                                    <img v-if="post.img !== null" class='post img-fluid' :src='API_URL + post.img '>
                                </div>
                            </router-link>
                            <div class="content-icon">
                                <div class="d-flex">
                                    <div class="icon-range d-flex">
                                        <IconComment />
                                        <span id="count">0</span>
                                    </div>
                                    <div class="icon-range d-flex">
                                        <IconRetweet />
                                        <span id="count">0</span>
                                    </div>
                                    <div class="icon-range d-flex">
                                        <IconLiked @click="like(post.id)" v-if="post.likes.some(like => like.user_id === sessionStores.userId)" />&nbsp;
                                        <IconLike @click="like(post.id)" v-else />&nbsp;
                                        <span id="count">{{post.likes.length}}</span>
                                    </div>
                                    <div class="icon-range d-flex">
                                        <IconView />
                                        <span id="count">0</span>
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
            <!-- <button @click="loadMore">show more reviews</button> -->
        </div>
    </div>
</template>

<script setup>
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
    import IconTrash from '../../assets/icons/IconTrash.vue'
    import { ref, onMounted } from 'vue';
    import IconLiked from '../../assets/icons/IconLiked.vue';
    import moment from 'moment';
    import { getAllPosts, addPosts, addImg, deleteContent } from '../../api/posts.js'
    import { API_URL } from '../../const';
    import session from '../../stores/session';
    import home from '../../stores/home';
    import {likePost} from '../../api/like';

    const selectedPostId = ref(null);
    const homeStores = home();
    const sessionStores = session();
    const limit = ref(5);
    const posts = ref([]);
    const newPost = ref("");
    let previewImg = ref(null);
    const lastPostId = ref(null);

    async function like(postId) {
        try {
            const like = await likePost({postId});
            posts.value = posts.value.map(post => {
                if(post.id === postId) {
                    if(post.likes.length > like.data.data.post._count.likes) {
                        post.likes = post.likes.filter(like => {
                            if(like.user_id === sessionStores.userId) {
                                return false;
                            }
                            return true;
                        });
                    } else {
                        post.likes.push({user_id: sessionStores.userId});
                    }
                }
                return post;
            });
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async function getPosts() {
        try {
            const getContents = await getAllPosts({ limit: limit.value });
            if (getContents.data.message === 'SUCCESS') {
                posts.value = getContents.data.data.data;
                lastPostId.value = getContents.data.data.lastId;
            }
        } catch (error) {
            return;
        }
    }

    async function scrolledToBottom(div) {
        if(div.scrollTop + div.clientHeight >= div.scrollHeight && lastPostId.value !== null) {
            const getPosts = await getAllPosts({ lastId: lastPostId.value, limit: limit.value });
            if (getPosts.data.message === 'SUCCESS') {
                posts.value.push(...getPosts.data.data.data);
                lastPostId.value = getPosts.data.data.lastId;
            }
        }
    }

    async function createPosts() {
        try {
            const createNewPost = await addPosts({ content: newPost.value, img: previewImg.value });
            if (createNewPost.data.message === 'Create new post success') {
                posts.value = [createNewPost.data.data, ...posts.value];
                homeStores.trendKey++;
                newPost.value = '';
            }
        } catch (error) {
            return;
        }
    }

    async function uploadImg(e) {
        const uploadImg = await addImg(e.target.files[0]);
        previewImg.value = uploadImg.data.data;
    }

    async function deletPost() {
        try {
            const deletePost = await deleteContent(selectedPostId.value)
            if (deletePost.data.message === 'Post deleted successfully') {
                posts.value = posts.value.filter(post => post.id !== deletePost.data.data.id);
                homeStores.trendKey++;
            }
        } catch (error) {
            return;
        }
    }

    function isDisabled() {
        return newPost.value.length <= 0
    }

    onMounted(async () => {
        await getPosts();
    });
</script>

<style scoped>
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
        outline: none;        
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

    .btn-primary{
        background-color: rgb(29, 155, 240);
        border: none;
        border-radius: 50px;
        padding: 10px;
        width: 90px;
    }
</style>