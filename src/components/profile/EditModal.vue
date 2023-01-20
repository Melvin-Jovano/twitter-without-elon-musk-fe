<script setup>
    import IconClose from '../../assets/icons/IconClose.vue'
    import IconUpload from '../../assets/icons/IconUpload.vue'
    import IconArrowRight from '../../assets/icons/IconArrowRight.vue'
    import {reactive, onMounted, watchEffect, onUpdated} from 'vue';

    const props = defineProps({
        show: Boolean
    })

    const emit = defineEmits(['setModal'])

    const state = reactive({
        editModal: null,
        displayModal: props.show
    })
    
    onMounted(()=>{
        state.editModal = new bootstrap.Modal('#editModal', {})
    });

    watchEffect(()=>{
        state.displayModal = props.show
    })

    onUpdated(()=>{
        if(state.displayModal == true){
            state.editModal.show()
        }
    })

    function closeModal(event){
        state.editModal.hide()
        emit('setModal')
    }
</script>

<style scoped>
    #editModal{
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-dialog{
        max-width: 40%;
    }

    .modal-header{
        padding-left: 10px;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(12px);
    }

    .modal-content{
        border-radius: 20px !important;
    }

    .bgClose{
        min-width: 34px;
        min-height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bgHover:hover{
        background-color: rgba(15, 20, 25, 0.1)!important;
    }

    .ptb-2{
        padding: 2px 0px;
    }

    .saveButton{
        min-height: 32px;
        background-color: rgb(15, 20, 25);
        min-width: 32px;
        border: 1px solid black;
    }

    .bg-profile{
        background-color: rgba(0, 0, 0, 0.3);
        padding-bottom: 33.3333%;
        background-image: url('');
        background-size: cover ;
        background-repeat: no-repeat;
        background-position: center top;
    }

    .square{
        width: 100%;
        padding-top: 100%;
        position: relative;
    }

    .uploadField{
        display: none;
        position: absolute;
    }

    .uploadWrapper{
        background-color: rgba(15, 20, 25, 0.75);
        backdrop-filter: blur(4px);
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: absolute;
        fill: white;
        cursor: pointer;
    }

    .uploadWrapper:hover{
        background-color: rgba(39, 44, 48, 0.75);
    }

    .uploadBtnSize{
        min-width: 44px;
        min-height: 44px;
    }

    .marginProfile{
        max-width: 8rem;
        margin-left: 1rem;
        margin-top: -3rem;
    }

    .profileWrapper{
        background-color: white;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .profileUser{
        width: calc(100% - 7px);
        height: calc(100% - 7px);
        background-image: url('http://localhost:3000/images/61ced9f0f0923e4fd4bf1cb0accf1baa.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-color: rgb(207, 217, 222);
    }

    .boxPadding{
        padding: 12px 16px;
    }

    .fc-gray{
        color: rgb(83, 100, 113);
    }

    .fc-blue{
        color: rgb(29, 155, 240);
    }

    .fs-17{
        font-size: 17px;
    }

    .fs-lh{
        font-size: 20px;
        line-height: 24px;
    }

    .switchPro:hover{
        background-color: rgb(247,249,249);
    }
</style>

<template>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true" @click="closeModal()">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" @click.stop>
            <div class="modal-content">
                <div class="modal-header pt-2 pb-2 border-bottom-0">
                    <button class="rounded-circle bgClose bgHover border-0 bg-transparent" type = "button" @click="closeModal()" data-bs-dismiss="modal" aria-label="close">
                        <IconClose/>
                    </button>
                    <div class="flex-fill ms-4">
                        <h2 class="fs-5 mb-0 fw-bold ptb-2">
                            Edit profile
                        </h2>
                    </div>
                    <button class="rounded-pill saveButton" type="button">
                        <span class="ps-2 pe-2 text-white fw-bold">
                            Save
                        </span>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <div class="d-flex flex-column" style="padding-bottom: 64px;">
                        <div class="ps-1 pe-1">
                            <div class="w-100 bg-profile">
                                <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                    <div class="square">
                                        <label class="uploadWrapper rounded-circle" for="bgImgUpload" title="Add photo">
                                            <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                        </label>
                                        <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="bgImgUpload">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-25 marginProfile">
                            <div class="w-100 rounded-circle">
                                <div class="square">
                                    <div class="position-absolute rounded-circle profileWrapper">
                                        <div class="position-absolute top-50 start-50 translate-middle rounded-circle profileUser">
                                            <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                                <div class="square">
                                                    <label class="uploadWrapper rounded-circle" for="profileImgUpload" title="Add photo">
                                                        <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                                    </label>
                                                    <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="profileImgUpload">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <input type="text" class="form-control fs-17" id="editName" placeholder="Name" value="Name">
                                <label for="editName" class="fc-gray fs-17">
                                    Name
                                </label>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <textarea id="editBio" class="form-control fs-17" placeholder="Bio" style="height: 100px;"></textarea>
                                <label for="editName" class="fc-gray fs-17">
                                    Bio
                                </label>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <input type="text" class="form-control fs-17" id="editLoc" placeholder="Name" value="">
                                <label for="editLoc" class="fc-gray fs-17">
                                    Location
                                </label>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <input type="text" class="form-control fs-17" id="editWeb" placeholder="Name" value="">
                                <label for="editWeb" class="fc-gray fs-17">
                                    Website
                                </label>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="padding: 16px;">
                            <div class="d-flex">
                                <span class="fc-gray">
                                    Birth date
                                </span>
                                <span class="ps-1 pe-1 fc-gray">
                                    ·
                                </span>
                                <span class="fc-blue">
                                    Edit
                                </span>
                            </div>
                            <span class="fs-lh">
                                December 20, 2003
                            </span>
                        </div>
                        <a href="#" class="boxPadding text-black text-decoration-none switchPro">
                            <div class="d-flex align-items-center">
                                <span class="flex-grow-1 fs-lh">
                                    Switch to professional
                                </span>
                                <IconArrowRight style="height: 20px; width: 20px;"/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>