<template>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true" @click="closeModal">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" @click.stop>
            <div class="modal-content">
                <div class="modal-header pt-2 pb-2 border-bottom-0">
                    <button class="rounded-circle bgClose bgHover border-0 bg-transparent" type = "button" @click="closeModal" data-bs-dismiss="modal" aria-label="close">
                        <IconClose/>
                    </button>
                    <div class="flex-fill ms-4">
                        <h2 class="fs-5 mb-0 fw-bold ptb-2">
                            Edit profile
                        </h2>
                    </div>
                    <button class="rounded-pill saveButton" type="button" @click="submitData" ref="submitButton">
                        <span class="ps-2 pe-2 text-white fw-bold">
                            Save
                        </span>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <div class="d-flex flex-column" style="padding-bottom: 64px;">
                        <div class="ps-1 pe-1">
                            <div class="w-100 bg-profile" v-if="data.editData.coverURL" :style="{backgroundImage: `url('${data.editData.coverURL}')`}">
                                <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                    <div class="d-flex">
                                        <div style="min-width: 44px;">
                                            <div class="square">
                                                <label class="picBtnWrapper rounded-circle" for="bgImgUpload" title="Add photo">
                                                    <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                                </label>
                                                <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="bgImgUpload" @change="handleCoverUpload($event)">
                                            </div>
                                        </div>
                                        <div style="min-width: 44px; margin-left: 20px;">
                                            <div class="square">
                                                <button class="picBtnWrapper rounded-circle border-0" type="button" title="Delete photo" @click="deleteBg" >
                                                    <IconClose class="position-absolute top-50 start-50 translate-middle"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 bg-profile" v-else-if="data.userData.cover && data.showCover" :style="{backgroundImage: `url('${API_URL}${data.userData.cover}')`}">
                                <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                    <div class="d-flex">
                                        <div style="min-width: 44px;">
                                            <div class="square">
                                                <label class="picBtnWrapper rounded-circle" for="bgImgUpload" title="Add photo">
                                                    <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                                </label>
                                                <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="bgImgUpload" @change="handleCoverUpload($event)">
                                            </div>
                                        </div>
                                        <div style="min-width: 44px; margin-left: 20px;">
                                            <div class="square">
                                                <button class="picBtnWrapper rounded-circle border-0" type="button" title="Delete photo" @click="handleDeleteCover">
                                                    <IconClose class="position-absolute top-50 start-50 translate-middle"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 bg-profile" v-else>
                                <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                    <div class="square">
                                        <label class="picBtnWrapper rounded-circle" for="bgImgUpload" title="Add photo">
                                            <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                        </label>
                                        <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="bgImgUpload" @change="handleCoverUpload($event)">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-25 marginProfile">
                            <div class="w-100 rounded-circle">
                                <div class="square">
                                    <div class="position-absolute rounded-circle profileWrapper">
                                        <div class="position-absolute top-50 start-50 translate-middle rounded-circle profileUser" v-if="data.editData.photoURL" :style="{backgroundImage: `url('${data.editData.photoURL}')`}">
                                            <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                                <div class="square">
                                                    <label class="picBtnWrapper rounded-circle" for="profileImgUpload" title="Add photo">
                                                        <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                                    </label>
                                                    <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="profileImgUpload" @change="handlePhotoUpload($event)">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="position-absolute top-50 start-50 translate-middle rounded-circle profileUser" v-else-if="data.userData.photo" :style="{backgroundImage: `url('${API_URL}${data.userData.photo}')`}">
                                            <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                                <div class="square">
                                                    <label class="picBtnWrapper rounded-circle" for="profileImgUpload" title="Add photo">
                                                        <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                                    </label>
                                                    <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="profileImgUpload" @change="handlePhotoUpload($event)">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="position-absolute top-50 start-50 translate-middle rounded-circle profileUser" v-else :style="{backgroundImage: `url('${API_URL}/images/default.jpeg')`}">
                                            <div class="position-absolute top-50 start-50 translate-middle uploadBtnSize">
                                                <div class="square">
                                                    <label class="picBtnWrapper rounded-circle" for="profileImgUpload" title="Add photo">
                                                        <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                                                    </label>
                                                    <input type="file" accept="image/jpeg, image/png, image/jpg" class="uploadField" title="Add photo" id="profileImgUpload" @change="handlePhotoUpload($event)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <input type="text" class="form-control fs-17 was-validated" id="editName" placeholder="Name" ref="inputName" :value="data.editData.inputName ? data.editData.name : data.userData.name" @input="handleUpdateName($event)" required>
                                <label for="editName" class="fc-gray fs-17">
                                    Name
                                </label>
                                <div id="validationName" class="invalid-feedback">
                                    Name can't be blank
                                </div>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <textarea id="editBio" class="form-control fs-17" placeholder="Bio" style="height: 100px;" :value="data.editData.inputBio ? data.editData.bio : data.userData.bio" @input="handleUpdateBio($event)"></textarea>
                                <label for="editName" class="fc-gray fs-17">
                                    Bio
                                </label>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <input type="text" class="form-control fs-17" id="editLoc" placeholder="Name" :value="data.editData.inputLocation ? data.editData.location : data.userData.location" @input="handleUpdateLocation($event)">
                                <label for="editLoc" class="fc-gray fs-17">
                                    Location
                                </label>
                            </div>
                        </div>
                        <div class="boxPadding">
                            <div class="form-floating">
                                <input type="text" class="form-control fs-17" id="editWeb" placeholder="Name" disabled>
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
                                {{ data.userData.birthDate || "MMMM DD, YYYY"}}
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

<script setup>
    import IconClose from '../../assets/icons/IconClose.vue'
    import IconUpload from '../../assets/icons/IconUpload.vue'
    import IconArrowRight from '../../assets/icons/IconArrowRight.vue'
    import {reactive, onMounted, watchEffect, onUpdated, ref} from 'vue';
    import { API_URL } from '../../const';
    import { updateBackground, updatePhoto, deleteBackground, updateUserInfo } from '../../api/profile.js'
    import moment from 'moment';

    const props = defineProps({
        show: Boolean,
        dataUser: Object
    })

    const emit = defineEmits(['setModal', 'getData'])

    const data = reactive({
        editModal: null,
        userData : props.dataUser,
        editData : {},
        showCover: true
    })
    const showModal = ref(props.show)
    const submitButton = ref(null)
    const inputName = ref(null)
    
    onMounted(()=>{
        data.editModal = new bootstrap.Modal('#editModal', {})
    });

    watchEffect(()=>{
        showModal.value = props.show
        data.userData = props.dataUser
        data.userData.birthDate = formatDate(data.userData.created_at)
    })

    onUpdated(()=>{
        if(showModal.value == true){
            data.editModal.show()
        }
    })

    function closeModal(){
        data.editModal.hide()
        data.editData = {}
        inputName.value.classList.remove('is-invalid')
        emit('setModal')
    }

    function formatDate(val){
        return moment(val).subtract(20, 'years').format('LL')
    }
    
    function handleCoverUpload( event ){
        data.editData.coverFile = event.target.files[0]
        data.editData.coverURL = URL.createObjectURL(data.editData.coverFile)
        data.showCover = true
    }

    function handlePhotoUpload( event ){
        data.editData.photoFile = event.target.files[0]
        data.editData.photoURL = URL.createObjectURL(data.editData.photoFile)
    }

    function handleDeleteCover(){
        data.showCover = false
    }

    function handleUpdateName( event ){
        data.editData.name = event.target.value
        data.editData.inputName = true
        if(data.editData.name.length === 0){
            event.target.classList.toggle('is-invalid')
            submitButton.value.classList.toggle('disabled')
        }
        else{
            event.target.classList.remove('is-invalid')
            submitButton.value.classList.remove('disabled')
        }
    }

    function handleUpdateLocation( event ){
        data.editData.location = event.target.value
        data.editData.inputLocation = true
    }

    function handleUpdateBio( event ){
        data.editData.bio = event.target.value
        data.editData.inputBio = true
    }
    
    function submitData(){
        if(data.editData.coverFile){
            updateCover(data.editData.coverFile)
        }
        if(data.editData.photoFile){
            updateUserPhoto(data.editData)
        }
        if(!data.showCover && data.userData.cover){
            deleteBg(data.userData)
        }
        if(!(data.editData.name && data.editData.name.length === 0) || data.editData.bio || data.editData.location){
            updateUser(data.editData)
        }
        closeModal()
    }
    
    async function updateCover(value){
        try {
            const updateCover = await updateBackground(value, data.userData.cover)
            if(updateCover.data.message === "SUCCESS"){
                data.userData.cover = updateCover.data.data
                value.coverURL = null
                value.coverFile = null
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async function updateUserPhoto(value){
        try {
            const updatePhotoProfile = await updatePhoto(value, data.userData.photo)
            if (updatePhotoProfile.data.message === "SUCCESS"){
                data.userData.photo = updatePhotoProfile.data.data
                value.photoURL = null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteBg(value){
        try{
            if(value.cover){
                const delCover = await deleteBackground(value.cover)
                if(delCover.data.message === "SUCCESS"){
                    data.userData.cover = null
                    value.deleteCover = false
                }
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function updateUser(value){
        try {
            const updateInfoUser = await updateUserInfo(value.bio, value.name, value.location)
            if(updateInfoUser.data.message === "SUCCESS"){
                emit('getData')
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>

<style scoped>
    .disabled{
        pointer-events: none;
    }

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

    .picBtnWrapper{
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

    .picBtnWrapper:hover{
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