<template>
    <div class="container justify-content-between p-4">
        <div class="row">
            <div class="col">
                <HeaderSide />
            </div>
            <div class="col">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At blanditiis velit architecto perspiciatis maiores, repellat modi asperiores assumenda magni perferendis quae nam dolor, aliquam expedita deserunt quos eveniet. Quam, fuga.
            </div>
            <div class="col">
                <SideMenuVue />
            </div>
        </div>
    </div>
</template>

<script setup>
    import HeaderSide from '../components/home/HeaderSide.vue';
    import SideMenuVue from '../components/home/SideMenu.vue';
</script>