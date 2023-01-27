<template>
    <div class="container justify-content-center">
        <div class="row">
            <div class="col-3">
                <HeaderSide />
            </div>
            <div class="col-6">
                <MainContentVue />
            </div>
            <div class="col-3">
                <SideMenuVue :key="homeStores.trendKey" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import MainContentVue from '../components/home/MainContent.vue';
    import HeaderSide from '../components/home/HeaderSide.vue';
    import SideMenuVue from '../components/home/SideMenu.vue';
    import home from '../stores/home';

    const homeStores = home();
</script>