<script setup>
import IconHash from '../../assets/icons/IconHash.vue';
import IconHomes from '../../assets/icons/IconHomes.vue';
import IconMessage from '../../assets/icons/IconMessage.vue';
import IconNotification from '../../assets/icons/IconNotification.vue';
import IconBookmarks from '../../assets/icons/IconBookmarks.vue';
import IconLists from '../../assets/icons/IconLists.vue';
import IconProfile from '../../assets/icons/IconProfile.vue'
import IconMore from '../../assets/icons/IconMore.vue';
import IconTwitter from '../../assets/icons/IconTwitter.vue'
import IconThreeDots from '../../assets/icons/IconThreeDots.vue'
</script>

<template>
    <div id="wrapper">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand p-2">
                <IconTwitter />
            </div>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconHomes />
                    <span class="p-4">Home</span>
                </div>
            </a>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconHash />
                    <span class="p-4">Explore</span>
                </div>
            </a>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconNotification />
                    <span class="p-4">Notifications</span>
                </div>
            </a>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconMessage />
                    <span class="p-4">Messages</span>
                </div>
            </a>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconBookmarks />
                    <span class="p-4">Bookmarks</span>
                </div>
            </a>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconLists />
                    <span class="p-4">Lists</span>
                </div>
            </a>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconProfile />
                    <span class="p-4">Profile</span>
                </div>
            </a>
            <a href="#" class="text-decoration-none font-weight-light">
                <div class="p-2 navbar-list">
                    <IconMore />
                    <span class="p-4">More</span>
                </div>
            </a>
            <div class="p-2 mt-4">
                <button type="button" class="btn btn-primary btn-lg text-center fw-bold">Tweet</button>
            </div>
        </aside>
        <section class="content-wrapper" style="margin-top: 20px">
            <div class="d-flex mt-3">
                <div class="row">
                    <div class="col">
                        <img src="../../assets/cat.jpg" alt="Profile" class="img">
                    </div>
                    <div class="col">
                        <span id="name fw-bold">Ambatukam</span>
                        <p id="username">@username</p>
                    </div>
                    <div class="col">
                        <IconThreeDots />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
#wrapper{
    position: fixed;
    border-right: 1px solid rgba(0, 0, 0, 0.075);
}

.img{
    width: 50px;
    height: 50px;
    border-radius: 100%;
}

.btn-primary{
    background-color: rgb(29, 155, 240);
    border-radius: 50px 50px 50px 50px;
    width: 100%;
    border: none;
}

.btn-primary:hover{
    background-color: rgb(26, 140, 216);
}

ul {
    list-style-type: none;
}
a {
    color: #0f1419;
    font-size: 21px;
}

a:hover{
    color: #0f1419;
}

.navbar-list:hover{
    border-radius: 50px 50px 50px 50px;
    background-color: rgba(15, 20, 25, 0.1);
}

.content-wrapper{
    padding: 10px;
}

.content-wrapper:hover{
    border-radius: 50px 50px 50px 50px;
    background-color: rgba(15, 20, 25, 0.1);
}
</style>

