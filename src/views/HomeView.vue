<script setup>
import MainContentVue from '../components/home/MainContent.vue';
import HeaderSide from '../components/home/HeaderSide.vue';
import SideMenuVue from '../components/home/SideMenu.vue';
</script>

<template>
    <div class="container justify-content-between p-4">
        <div class="row">
            <div class="col">
                <HeaderSide />
            </div>
            <div class="col">
                <MainContentVue />
            </div>
            <div class="col">
                <SideMenuVue />
            </div>
        </div>
    </div>
</template>
