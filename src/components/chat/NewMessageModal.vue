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
                        <input type="search" class="form-control form-control-sm border-0 outline-none outline-focus-none" placeholder="Search people">
                    </div>
                </div>

                <div class="hv-65 overflow-auto">
                    <div class="px-3 py-2 cursor-pointer profil-card">
                        <table>
                            <tr>
                                <td rowspan="2" class="">
                                    <img src="https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80" alt="" class="rounded-circle" width="40" height="40" srcset="">
                                    &nbsp;&nbsp;
                                </td>
                                <td class="fw-bold text-sm">Joki Tugasmu</td>
                            </tr>
                            <tr>
                                <td class="text-muted">@joki</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import IconSearch from '../../assets/icons/IconSearch.vue';
</script>

<style scoped>
    .profil-card:hover {
        background-color: rgba(144, 178, 245, 0.15);
    }
</style>