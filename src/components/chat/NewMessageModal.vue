<template>
    <div class="modal fade" id="new-message-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <div class="modal-title">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>&emsp;
                        <h5 class="fw-bold d-inline">
                            New Message
                        </h5>
                    </div>
                    <div>
                        <button class="py-1 px-3 btn-primary btn btn-lg border-50px bg-primary-twitter text-sm fw-bold text-sm">
                            Next
                        </button>
                    </div>
                </div>

                <div class="border-bottom">
                    <div class="input-group">
                        <span class="mx-3 my-2" id="basic-addon1"><IconSearch /></span>
                        <input @keyup="filterUsers($event.target.value)" type="search" class="form-control form-control-sm border-0 outline-none outline-focus-none" placeholder="Search people">
                    </div>
                </div>

                <div class="hv-65 overflow-auto">
                    <div class="px-3 py-2 cursor-pointer profil-card" v-for="user in users" :key="user.id">
                        <table>
                            <tr>
                                <td rowspan="2" class="">
                                    <img v-if="user.photo !== null" :src="API_URL + user.photo" alt="" class="rounded-circle" width="40" height="40" />
                                    <img v-else :src="API_URL + DEFAULT_PHOTO" alt="" class="rounded-circle" width="40" height="40" />
                                    &nbsp;&nbsp;
                                </td>
                                <td class="fw-bold text-sm">{{ user.name }}</td>
                            </tr>
                            <tr>
                                <td class="text-muted">@{{ user.username }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import IconSearch from '../../assets/icons/IconSearch.vue';
    import {getUsers} from  '../../api/auth';
    import {API_URL, DEFAULT_PHOTO} from '../../const';

    const lastId = ref(0);
    const users = ref([]);

    async function filterUsers(input) {
        try {
            const findUsers = await getUsers({name: input}, {lastId: lastId.value});
            if(findUsers.data.message === 'SUCCESS') {
                lastId.value = findUsers.data.data.lastId;
                users.value = findUsers.data.data.data;
            }
        } catch (error) {
            return;
        }
    }

    async function scrollUsers() {
        try {
            if(lastId.value !== null) {
                const findUsers = await getUsers({name: input}, {lastId: lastId.value});
                if(findUsers.data.message === 'SUCCESS') {
                    lastId.value = findUsers.data.data.lastId;
                    users.value.push(findUsers.data.data.data);
                }
            }
        } catch (error) {
            return;
        }
    }
</script>

<style scoped>
    .profil-card:hover {
        background-color: rgba(144, 178, 245, 0.15);
    }
</style>