<script setup>
    import IconBack from '../../assets/icons/IconBack.vue';
    import IconCalender from '../../assets/icons/IconCalender.vue';
    import TweetBox from './TweetBox.vue'
</script>

<template>
    <div class="d-flex align-items-center head">
        <div class="flex-shrink-1 me-4 pe-2">
            <div class="rounded-circle backButton bgHover">
                <IconBack/>
            </div>
        </div>
        <div class="d-flex flex-column flex-grow-1">
            <span class="fs-5 fw-bold lh-1">
                Name
            </span>
            <span class="fs-13 text-muted mb-1">
                0 Tweets
            </span>
        </div>
    </div>
    <div class="d-flex flex-column mt-53">
        <div class="d-flex flex-column">
            <div class="w-100 bg-profile"></div>
            <div class="d-flex flex-column profileInfo mb-3">
                <div class="d-flex w-100 justify-content-between">
                    <div class="w-25 mw-48 mt-15">
                        <div class="w-100 ratio ratio-1x1 rounded-circle">
                            <a href="#">
                                <div class="square">
                                    <div class="position-absolute rounded-circle profileWrapper">
                                        <div class="position-absolute top-50 start-50 translate-middle rounded-circle profilePicture">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <a href="#" class="rounded-pill d-flex align-items-center text-decoration-none editProfile bgHover">
                        <div class="fs-6 lh-sm fw-bold text-black">
                            Edit profile
                        </div>
                    </a>
                </div>
                <div class="d-flex flex-column mt-1 mb-2 pb-1">
                    <span class="fw-bold lh-base fs-5 lh-sm">
                        Name
                    </span>
                    <div class="fc-gray fs-15 lh-sm">
                        @Username
                    </div>
                </div>
                <div class="fc-gray mb-2 pb-1">
                    <IconCalender class="me-1 align-text-bottom fc-gray"/>
                    <span>Joined January 2023</span>
                </div>
                <div class="d-flex">
                    <div class="me-3 pe-1">
                        <a href="#" class="text-decoration-none text-black follow">
                            <span class="fw-bold fs-14">
                                0
                            </span>
                            <span class="fc-gray fs-14"> 
                                Following
                            </span>
                        </a>
                    </div>
                    <div>
                        <a href="#" class="text-decoration-none text-black follow">
                            <span class="fw-bold fs-14">
                                0
                            </span>
                            <span class="fc-gray fs-14"> 
                                Follower
                            </span>
                        </a>
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
            <TweetBox/>
            <TweetBox/>
        </div>
    </div>
</template>

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
        background-color: rgba(15, 20, 25, 0.1);
    }

    .fs-13{
        font-size: 13px;
    }

    .bg-profile{
        background-color: rgb(207, 217, 222);
        padding-bottom: 33.3333%;
        background-image: url('../../assets/john-towner-JgOeRuGD_Y4-unsplash.jpg');
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
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        background-image: url('http://localhost:3000/images/61ced9f0f0923e4fd4bf1cb0accf1baa.jpg');
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

    .follow:hover{
        text-decoration: underline !important;;
    }

    .head{
        position: fixed;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 6px 16px;
        z-index: 10;
        width: inherit;
        box-sizing: border-box;
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