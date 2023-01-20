<script setup>
    import IconComment from '../../assets/icons/IconComment.vue';
    import IconLike from '../../assets/icons/IconLike.vue';
    import IconRetweet from '../../assets/icons/IconRetweet.vue';
    import IconShare from '../../assets/icons/IconShare.vue';
    import IconThreeDots from '../../assets/icons/IconThreeDots.vue';
    import IconView from '../../assets/icons/IconView.vue';
</script>

<template>
    <div class="tweetBox">
        <article class="ps-3 pe-3">
            <div class="d-flex pt-12">
                <div class="d-flex flex-column me-12">
                    <div style="width: 48px; height: 48px;">
                        <a href="">
                            <div class="tweetProfileWrapper">
                                <div class="position-absolute top-50 start-50 translate-middle rounded-circle tweetProfile">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="d-flex flex-column flex-grow-1 pb-12">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                            <a href="" class="text-black text-decoration-none fw-bold underlineHover">
                                Name
                            </a>
                            <div class="d-flex ms-1">
                                <a href="" class="text-decoration-none fc-gray">
                                    @Username
                                </a>
                                <div class="fc-gray ps-1 pe-1">
                                    ·
                                </div>
                                <a href="" class="text-decoration-none fc-gray underlineHover">
                                    0m
                                </a>
                            </div>
                        </div>
                        <div class="rounded-circle threedots bgBiru">
                            <IconThreeDots/>
                        </div>
                        <!-- <div class=" threedots ">
                        </div> -->
                    </div>
                    <div>
                        Content
                    </div>
                    <div class="d-flex mt-12">
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgBiru">
                                <IconComment/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                1
                            </span>
                        </div>
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgHijau">
                                <IconRetweet/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                
                            </span>
                        </div>
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgMerah">
                                <IconLike/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                
                            </span>
                        </div>
                        <div class="d-flex flex-fill align-items-center">
                            <div class="rounded-circle bgIcon bgBiru">
                                <IconView/>
                            </div>
                            <span class="lh-sm ms-1 fc-gray boxJlh">
                                2
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
        background-image: url('http://localhost:3000/images/61ced9f0f0923e4fd4bf1cb0accf1baa.jpg');
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