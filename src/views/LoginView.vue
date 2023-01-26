<template>
    <button data-bs-toggle="modal" id="click-modal-login" data-bs-target="#login-modal" class="d-none"></button>

    <div class="modal fade" id="login-modal">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="row">
                    <div class="col-1 position-absolute">
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="col text-center">
                        <IconTwitter />
                    </div>
                </div>

                <div>
                    <h3 v-if="!isUsernameFound" class="fw-bold text-center my-4">Sign In To Twitter</h3>
                    <h3 v-else class="fw-bold text-center my-4">Enter your password</h3>
                </div>

                <div class="text-center align-center items-center">
                    
                    <form @submit.prevent="checkUsername()" action="#" v-if="!isUsernameFound">
                        <button class="w-50 border text-sm my-3 rounded-50px bg-transparent text-black fw-bold py-1">
                            <IconApple />&nbsp;
                            Sign in with Apple
                        </button>

                        <div class="d-flex justify-content-center">
                            <div class="text-end">
                                <div class="border-top mt-2">
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                </div>
                            </div>
                            <div class="px-3">or</div>
                            <div class="">
                                <div class="border-top mt-2">
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                </div>
                            </div>
                        </div>

                        <input v-model="username" type="text" class="form-control w-50 d-inline mb-3 mt-1" placeholder="Username" />
                        <br>
                        <button type="submit" class="border-0 w-50 text-sm my-3 rounded-50px bg-black text-white fw-bold py-1">Next</button>
                        <br>
                        <button class="w-50 mt-2 mb-3 rounded-50px bg-black border bg-transparent text-black fw-bold py-1 text-sm">Forgot Password?</button>
                    </form>

                    <form @submit.prevent="createSession()" action="#" v-else>
                        <input :value="username" type="text" class="form-control w-50 d-inline mb-3 mt-1" placeholder="Username" disabled="true" />
                        <br>

                        <div class="w-50 d-inline-block">
                            <input v-model="password" type="password" class="form-control mt-1" placeholder="Password" />
                            <div class="text-start w-50">
                                <a href="#" class="text-xs text-decoration-none">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        
                        <br>
                        <button type="submit" data-bs-dismiss="modal" class="w-50 text-sm my-3 rounded-50px bg-black text-white fw-bold py-1">Log in</button>
                    </form>
                    
                    <br>
                    <div class="mt-5 mb-2">
                        Don't have an account?&nbsp;
                        <a href="/register" class="text-decoration-none text-primary-twitter">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import IconTwitter from '../assets/icons/IconTwitter.vue';
    import IconApple from '../assets/icons/IconApple.vue';
    import {login, findUserByUsername} from '../api/auth';
    import router from '../router';
    import session from '../stores/session';

    const username = ref('');
    const password = ref('');
    const sessionStores = session();
    const isUsernameFound = ref(false);

    async function checkUsername() {
        try {
            const findUser = await findUserByUsername({username: username.value});
            if(findUser.data.message === 'SUCCESS') {
                if(findUser.data.data !== null) {
                    return isUsernameFound.value = true;
                }
                alert('No User Found');
            }
        } catch (error) {
            return;
        }
    }

    async function createSession() {
        try {
            const signIn = await login({username: username.value, password: password.value});

            if(signIn.data.message === 'SUCCESS') {
                localStorage.setItem('accessToken', signIn.data.data.accessToken);
                localStorage.setItem('refreshToken', signIn.data.data.refreshToken);
                sessionStores.userId = signIn.data.data.userId;
                sessionStores.photo = signIn.data.data.photo;
                sessionStores.name = signIn.data.data.name;
                sessionStores.username = signIn.data.data.username;
                return await router.push({name: 'home'});
            }
        } catch (error) {
            return alert('No User Found');
        }
    }

    onMounted(() => {
        document.getElementById('click-modal-login').click();
    });
</script>

<style scoped>

</style>