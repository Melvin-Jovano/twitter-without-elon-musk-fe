<template>
    <button data-bs-toggle="modal" id="click-modal-register" data-bs-target="#register-modal" class="d-none"></button>

    <div class="modal fade" id="register-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="row">
                    <div class="col-1">
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="col">
                        <h4 class="fw-bold">
                            Step {{ step }} of 3
                        </h4>
                    </div>
                </div>

                <div class="container items-center">
                    <h3 class="fw-bold my-4">Create your account</h3>
                    
                    <form @submit.prevent="createSession()" action="#">
                        <input :value="name" type="text" class="form-control d-inline mb-3 mt-1" placeholder="Name" />
                        <br>

                        <input v-model="username" type="password" class="form-control mt-1" placeholder="Username" />
                        
                        <br>
                        <button type="submit" data-bs-dismiss="modal" class="text-sm my-3 rounded-50px bg-black text-white fw-bold py-1">Log in</button>
                    </form>
                    
                    <br>
                    <div class="mt-5 mb-2">
                        Don't have an account?&nbsp;
                        <a href="/register" class="text-decoration-none">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import {login, findUserByUsername} from '../api/auth';
    import session from '../stores/session';

    const username = ref('');
    const name = ref('');
    const isUsernameFound = ref(false);

    async function checkUsername() {
        try {
            const findUser = await findUserByUsername({username: username.value});
            if(findUser.data.message === 'SUCCESS') {
                if(findUser.data.data.id !== undefined) {
                    return isUsernameFound.value = true;
                }
                alert('No User Found');
            }
        } catch (error) {
            return;
        }
    }

    onMounted(() => {
        document.getElementById('click-modal-register').click();
    });
</script>

<style scoped>

</style>