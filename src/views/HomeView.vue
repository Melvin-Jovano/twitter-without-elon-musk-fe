<script setup>
import MainContentVue from '../components/home/MainContent.vue';
import HeaderSide from '../components/home/HeaderSide.vue';
import SideMenuVue from '../components/home/SideMenu.vue';
import DetailPosts from '../components/home/DetailPosts.vue';
</script>

<template>
    <div class="container justify-content-center">
        <div class="row">
            <div class="col-3">
                <HeaderSide />
            </div>
            <div class="col-6">
                <!-- <DetailPosts /> -->
                <MainContentVue />
            </div>
            <div class="col-3">
                <SideMenuVue />
            </div>
        </div>
    </div>
</template>
