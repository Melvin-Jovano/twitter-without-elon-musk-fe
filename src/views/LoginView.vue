<template>
    <button data-bs-toggle="modal" id="click-modal-login" data-bs-target="#login-modal" class="d-none"></button>

    <div class="modal fade" id="login-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="row">
                    <div class="col-1">
                        X
                    </div>
                    <div class="col text-center">
                        <IconTwitter />
                    </div>
                </div>

                <div>
                    <h3 class="fw-bold text-center my-4">Sign In To Twitter</h3>
                </div>

                <div class="text-center align-center items-center">

                    <button class="w-50 text-sm my-3 rounded-50px bg-transparent text-black fw-bold py-1">
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

                    <input type="text" class="form-control w-50 d-inline mb-3 mt-1" placeholder="Username" />
                    <br>
                    <button class="w-50 text-sm my-3 rounded-50px bg-black text-white fw-bold py-1">Next</button>
                    <br>
                    <button class="w-50 mt-2 mb-3 rounded-50px bg-black border bg-transparent text-black fw-bold py-1 text-sm">Forgot Password?</button>
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
    import { onMounted } from 'vue';
    import IconTwitter from '../assets/icons/IconTwitter.vue';
    import IconApple from '../assets/icons/IconApple.vue';

    onMounted(() => {
        document.getElementById('click-modal-login').click();
    });
</script>

<style scoped>

</style>