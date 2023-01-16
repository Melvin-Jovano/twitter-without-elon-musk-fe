<script setup>
import IconMedia from '../../assets/icons/IconMedia.vue';
import IconGif from '../../assets/icons/IconGif.vue';
import IconPoll from '../../assets/icons/IconPoll.vue';
import IconMap from '../../assets/icons/IconMap.vue';
import IconDate from '../../assets/icons/IconDate.vue';
import IconEmote from '../../assets/icons/IconEmote.vue';
</script>

<template>
    <div class="main">
        <div class="tablist-top" style="margin-top: -112px">
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
            <div class="form-content d-flex p-2" style="margin-top: 110px">
                <div class="profile-pict p-2">
                    <img src="../../assets/cat.jpg" alt="Profile" class="img">
                </div>
                <div class="form-input p-2">
                    <input type="text" id="input" class="text-input" placeholder="What's happening?">
                    <div class="media-upload mt-4">
                        <div class="icon-list d-flex">
                            <div class="icon m-2">
                                <label for="file-input">
                                    <IconMedia />
                                </label>
                                <input id="file-input" type="file" />
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .tablist */


.main{
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}


.tablist-top{
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    z-index: 99999999;
    position: fixed;
    left: 29%;
    right: 29%;
}

.present{
    transition: 0.3s;
}

.present:hover{
    background-color: rgba(15, 20, 25, 0.1);
}
.text{
    color: rgb(83, 100, 113);
    font-weight: 500;
    font-size: 15-px;
}

.text-forYou{
    border-bottom: 4px solid rgb(29, 155, 240);;
    border-radius: 4px;
}

.text-input{
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

::placeholder {
    font-size: 20px;
    font-weight: 400;
}

.img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}
</style>
