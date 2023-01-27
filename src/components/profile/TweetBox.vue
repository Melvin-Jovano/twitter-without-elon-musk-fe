<template>
    <div class="tweetBox">
        <article class="ps-3 pe-3">
            <div class="d-flex pt-12">
                <div class="d-flex flex-column me-12">
                    <div style="width: 48px; height: 48px;">
                        <a href="">
                            <div class="tweetProfileWrapper">
                                <div class="position-absolute top-50 start-50 translate-middle rounded-circle tweetProfile" v-if="data.userData.user.photo" :style="{backgroundImage: `url('${API_URL}${data.userData.user.photo}')`}">
                                </div>
                                <div class="position-absolute top-50 start-50 translate-middle rounded-circle tweetProfile" v-else :style="{backgroundImage: `url('${API_URL}${DEFAULT_PHOTO}')`}">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="d-flex flex-column flex-grow-1 pb-12">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                            <a href="" class="text-black text-decoration-none fw-bold underlineHover">
                                {{ data.userData.user.name || "Name" }}
                            </a>
                            <div class="d-flex ms-1">
                                <a href="" class="text-decoration-none fc-gray">
                                    @{{ data.userData.user.username || "Username" }}
                                </a>
                                <div class="fc-gray ps-1 pe-1">
                                    ·
                                </div>
                                <a href="" class="text-decoration-none fc-gray underlineHover">
                                    {{ data.userData.uploadTime }}
                                </a>
                            </div>
                        </div>
                        <div class="rounded-circle threedots bgMerah" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <IconTrash/>
                        </div>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <h3>Delete Tweet?</h3>
                                        <p>This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from
                                        Twitter search results.</p>
                                        <button class="btn btn-danger" type="submit" data-bs-dismiss="modal" @click="deletPost(data.userData.id)">Delete</button>
                                        <button class="btn btn-white" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        {{data.userData.content}}
                        <img v-if="data.userData.img !== null" :src="API_URL + data.userData.img" class="img-fluid mt-2" style="border-radius: 20px;"/>
                    </div>
                    <div class="d-flex mt-12">
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgBiru">
                                <IconComment/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                0
                            </span>
                        </div>
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgHijau">
                                <IconRetweet/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                0
                            </span>
                        </div>
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgMerah">
                                <IconLiked @click="like(data.userData.id)" v-if="data.userData.likes.some(like => like.user_id === sessionStores.userId)" />
                                <IconLike @click="like(data.userData.id)" v-else/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                {{ data.userData.likes.length }}
                            </span>
                        </div>
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgBiru">
                                <IconView/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                0
                            </span>
                        </div>
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgBiru">
                                <IconShare/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script setup>
    import { reactive, watchEffect, ref } from 'vue';
    import IconComment from '../../assets/icons/IconComment.vue';
    import IconLike from '../../assets/icons/IconLike.vue';
    import IconRetweet from '../../assets/icons/IconRetweet.vue';
    import IconShare from '../../assets/icons/IconShare.vue';
    import IconView from '../../assets/icons/IconView.vue';
    import IconTrash from '../../assets/icons/IconTrash.vue'
    import { API_URL, DEFAULT_PHOTO } from '../../const';
    import moment from 'moment';
    import { deleteContent } from '../../api/posts.js';
    import IconLiked from '../../assets/icons/IconLiked.vue';
    import session from '../../stores/session';
    import {likePost} from '../../api/like';

    const sessionStores = session();
    const props = defineProps([
        "tweet"
    ]);

    const emit = defineEmits(["getPosts"]);

    const data = reactive({
        userData : props.tweet,
    });

    watchEffect(()=>{
        data.userData = props.tweet
        data.userData.uploadTime = formatTime(data.userData.created_at)
    });

    async function like(postId) {
        try {
            const like = await likePost({postId});
            if(data.userData.likes.length > like.data.data.post._count.likes) {
                data.userData.likes = data.userData.likes.filter(like => {
                    if(like.user_id === sessionStores.userId) {
                        return false;
                    }
                    return true;
                });
            } else {
                data.userData.likes.push({user_id: sessionStores.userId});
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    function formatTime(val){
        return moment(val).startOf('minutes').fromNow()
    }

    async function deletPost(id) {
        try {
            const deletePost = await deleteContent(id)
            if (deletePost.data.message === 'Post deleted successfully') {
                emit('getPosts')
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style scoped>

.tweetBox{
        cursor: pointer;
    }
    
    .tweetBox:hover{
        background-color: rgba(0, 0, 0, 0.03);
    }

    .pt-12{
        padding-top: 12px;
    }

    .pb-12{
        padding-bottom: 12px;
    }

    .me-12{
        margin-right: 12px;
    }

    .mt-12{
        margin-top: 12px;
    }

    .tweetProfileWrapper{
        width: 100%;
        padding-top: 100%;
        position: relative;
    }

    .tweetProfile{
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

    .fc-gray{
        color: rgb(83, 100, 113) !important;
    }

    .threedots{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px !important;
        height: 20px !important;
        fill: rgb(83, 100, 113);
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

    .bgHijau:hover{
        background-color: rgba(0, 186, 124, 0.1);
        fill: rgb(0, 186, 124);
    }

    .bgMerah:hover{
        background-color: rgba(249, 24, 128, 0.1);
        fill: rgb(249, 24, 128);
    }

    .boxJlh{
        min-width: calc(1rem + 24px);
        font-size: 13px;
    }
</style>