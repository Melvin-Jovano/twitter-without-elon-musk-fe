<template>
    <div class="container justify-content-between">
        <div class="row">
            <div class="col-3">
                <HeaderSide />
            </div>
            <div class="col-6 min-vh-100 p-0 position-relative border-start border-end" style="max-width: 660px;">
                <FollowerList />
            </div>
            <div class="col-3">
                <SideMenuVue />
            </div>
        </div>
    </div>
</template>

<script setup>
    import FollowerList from '../components/follower/FollowerList.vue';
    import HeaderSide from '../components/home/HeaderSide.vue';
    import SideMenuVue from '../components/home/SideMenu.vue';
</script>