<template>
    <div id="wrapper">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand p-2">
                <IconTwitter />
            </div>

            <router-link to="/home" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconHomes />&emsp;Home
            </router-link>

            <router-link to="/" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconHash />&emsp;Explore
            </router-link>

            <router-link to="/" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconNotification />&emsp;Notifications
            </router-link>

            <router-link to="/message" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconMessage/>&emsp;Messages
            </router-link>

            <router-link to="/" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconBookmarks />&emsp;Bookmarks
            </router-link>

            <router-link to="/" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconLists />&emsp;Lists
            </router-link>

            <router-link to="/profile" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconProfile />&emsp;Profile
            </router-link>

            <router-link to="/" class="text-decoration-none py-2 px-3 my-2 navbar-list rounded-50px">
                <IconMore />&emsp;More
            </router-link>

            <div class="p-2 mt-4">
                <button type="button" class="btn btn-primary btn-lg text-center fw-bold">Tweet</button>
            </div>
        </aside>
        <section data-event="removeOptions" class="p-2 pt-1 content-wrapper mt-2 cursor-pointer">
            <div data-event="removeOptions" class="d-flex mt-3">
                <div v-if="appStores.showOption" class="text-sm rounded bg-white position-absolute py-2 border shadow" style="width:280px;margin-top: -120px">
                    <div class="cursor-pointer py-2 px-3 profile-option fw-bold">Add an existing account</div>
                    <div @click="signOut()" class="cursor-pointer py-2 px-3 profile-option fw-bold">Log out @{{ sessionStores.username }}</div>
                </div>

                <div data-event="removeOptions" class="row">
                    <div data-event="removeOptions" class="col-3">
                        <img data-event="removeOptions" :src="API_URL + sessionStores.photo" alt="Profile" class="img">
                    </div>
                    <div data-event="removeOptions" class="col-6">
                        <span data-event="removeOptions" class="fw-bold text-sm">{{sessionStores.name}}</span>
                        <p data-event="removeOptions" class="text-sm">@{{sessionStores.username}}</p>
                    </div>
                    <div data-event="removeOptions" class="col">
                        <div data-event="removeOptions" class="cursor-pointer">
                            <IconThreeDotsWithDataset />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import IconHash from '../../assets/icons/IconHash.vue';
    import IconHomes from '../../assets/icons/IconHomes.vue';
    import IconMessage from '../../assets/icons/IconMessage.vue';
    import IconNotification from '../../assets/icons/IconNotification.vue';
    import IconBookmarks from '../../assets/icons/IconBookmarks.vue';
    import IconLists from '../../assets/icons/IconLists.vue';
    import IconProfile from '../../assets/icons/IconProfile.vue'
    import IconMore from '../../assets/icons/IconMore.vue';
    import IconTwitter from '../../assets/icons/IconTwitter.vue';
    import IconThreeDotsWithDataset from '../../assets/icons/IconThreeDotsWithDataset.vue';
    import session from '../../stores/session';
    import { API_URL } from '../../const';
    import { logout } from '../../api/auth';
    import router from '../../router';
    import app from '../../stores/app';

    const appStores = app();
    const sessionStores = session();

    async function signOut() {
        try {
            await logout();
            localStorage.clear();
            await router.push({name: 'login'});
        } catch (error) {
            return;
        }
    }
</script>

<style scoped>
    #wrapper{
        position: fixed;
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

    .navbar-list{
        transition: 0.3s;
        display: block;
    }

    .navbar-list:hover{
        border-radius: 50px 50px 50px 50px;
        background-color: rgba(15, 20, 25, 0.1);
    }

    .content-wrapper:hover{
        border-radius: 50px 50px 50px 50px;
        background-color: rgba(15, 20, 25, 0.1);
    }
    .profile-option:hover {
        background-color: rgba(15, 20, 25, 0.1);
    }
    .router-link-active {
        font-weight: bold;
    }
</style>

