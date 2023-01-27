<template>
    <aside id="sidebar-wrapper" class="position-fixed hv-99" style="width:300px;overflow-x:hidden">
        <div class="row">
            <div class="col pt-3">
                <div class="input-wrapper px-1 py-1" style="border-radius:9999px">
                    <div class="row">
                        <div class="col-1 pt-1 px-4">
                            <IconSearch />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control text-sm outline-focus-none bg-transparent border-0" placeholder="Search Twitter">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="list mt-4">
            <div class="list-wrap mt-1 p-3">
                <span style="color: #0f1419; font-size: 20px; font-weight: 800;" class="mb-4">Trends for you</span>
                <a href="#" class="text-decoration-none font-weight-light" v-for="(trend, idx) in trends" :key="idx">
                    <div class="list-trending mb-1 p-2">
                        <div class="d-flex justify-content-between">
                            <span class="d-block" style="font-size: 13px; color: rgb(83, 100, 113);">Trending in Indonesia</span><IconThreeDot />
                        </div>
                        <span class="d-block" style="font-size: 15px; color: #0f1419; font-weight: 700;">{{trend.hashtag}}</span>
                        <span class="d-block" style="font-size: 13px; color: rgb(83, 100, 113);">{{trend._count}} Tweets</span>
                    </div>
                </a>
            </div>
        </div>
    </aside>
</template>

<script setup>
    import IconSearch from '../../assets/icons/IconSearch.vue';
    import IconThreeDot from '../../assets/icons/IconThreeDots.vue';
    import { onMounted, ref } from 'vue';
    import {getTrends} from '../../api/hashtag';

    const trends = ref([]);

    onMounted(async () => {
        const trendings = await getTrends({limit: 10});
        if(trendings.data.message === 'SUCCESS') {
            trends.value = trendings.data.data;
        }
    });
</script>

<style scoped>
.list {
    width: 100%;
    border: none;
    border-radius: 20px;
    background: #181818;
    background-color: rgb(247, 249, 249);
}

.list-trending:hover {
    background-color: rgba(15, 20, 25, 0.1);
}
.input-wrapper {
    background-color: rgba(15, 20, 25, 0.1);
}
</style>