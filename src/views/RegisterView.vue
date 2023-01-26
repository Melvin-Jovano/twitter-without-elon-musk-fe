<template>
    <button data-bs-toggle="modal" id="click-modal-register" data-bs-target="#register-modal" class="d-none"></button>

    <div class="modal fade" id="register-modal">
        <div :class="`modal-dialog modal-dialog-centered ${showHeading ? 'modal-lg' : ''}`">
            <div class="modal-content p-3">
                <div class="row">
                    <div class="col-1">
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div :class="`col ${showHeading ? 'text-center' : 'text-start'}`">
                        <div v-if="showHeading">
                            <IconTwitter />
                        </div>

                        <div v-else>
                            <h5 class="fw-bold">Step {{ step }} of 3</h5>
                        </div>
                    </div>
                </div>

                <div :class="`container px-5 ${showHeading ? 'text-center' : ''}`">
                    <h3 v-if="showHeading" class="fw-bold my-4">Join Twitter today</h3>
                    <h3 v-else class="fw-bold my-4">Create your account</h3>
                    
                    <button v-if="showHeading" class="w-50 py-2 border text-sm my-3 rounded-50px bg-transparent text-black fw-bold py-1">
                        <IconApple />&nbsp;
                        Sign up with Apple
                    </button>

                    <div v-if="showHeading" class="d-flex justify-content-center">
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
                    
                    <button v-if="showHeading" type="submit" class="w-50 py-2 border-0 text-sm my-3 rounded-50px bg-black text-white fw-bold py-1" @click="showHeading = false">
                        Create account
                    </button>

                    <div v-if="showHeading" class="text-xs w-50 mx-auto">
                        By signing up, you agree to the&nbsp;
                        <a href="#" class="text-decoration-none text-primary-twitter">Terms of Service</a>&nbsp;
                        and
                        <a href="#" class="text-decoration-none text-primary-twitter">Privacy Policy</a>,&nbsp;
                        including 
                        <a href="#" class="text-decoration-none text-primary-twitter">Cookie Use.</a>&nbsp;
                    </div>
                    
                    <div v-if="showHeading" class="mt-5 mb-2">
                        Have an account already?&nbsp;
                        <a href="/login" class="text-decoration-none text-primary-twitter">Log in</a>
                    </div>

                    <input v-if="!showHeading" v-model="name" type="text" placeholder="Name" class="form-control">
                    <input v-if="!showHeading" v-model="username" type="text" placeholder="Username" class="form-control my-4">
                    
                    <div v-if="!showHeading">
                        <h6 class="fw-bold">Date of birth</h6>
                        <p class="text-muted text-xs">
                            This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                        </p>

                        <div class="row">
                            <div class="col-6 text-sm">
                                Month
                                <select @change="getDays()" v-model="monthInput" class="form-select text-xs">
                                    <option v-for="(month, idx) in months" :key="idx" :value="idx">
                                        {{ month }}
                                    </option>
                                </select>
                            </div>
                            <div class="col text-sm">
                                Day
                                <select class="form-select text-xs">
                                    <option v-for="day in days" :key="day" :value="day">
                                        {{ day }}
                                    </option>
                                </select>
                            </div>
                            <div class="col text-sm">
                                Year
                                <select @change="getDays()" v-model="yearInput" class="form-select text-xs">
                                    <option v-for="year in years" :key="year" :value="year">
                                        {{ year }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <button v-if="!showHeading" type="submit" :class="`${username.length === 0 || name.length === 0 ? 'disabled' : 'bg-black'} w-100 mt-5 py-2 border-0 text-sm my-3 rounded-50px text-white fw-bold py-1`" @click="nextStep()" :disabled="username.length === 0 || name.length === 0">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import IconTwitter from '../assets/icons/IconTwitter.vue';
    import {findUserByUsername} from '../api/auth';
    import IconApple from '../assets/icons/IconApple.vue';
    import session from '../stores/session';
    import {months} from '../const';
    import {range} from '../utils/util';

    const years = ref(range(121, 1903).reverse());
    const username = ref('');
    const showHeading = ref(true);
    const monthInput = ref(0);
    const yearInput = ref(2023);
    const days = ref(31);
    const step = ref(1);
    const name = ref('');
    const isUsernameFound = ref(false);

    function getDays() {
        days.value = new Date(yearInput.value, monthInput.value+1, 0).getDate();
    };

    function nextStep() {
        step++;
    }

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
    .disabled {
        background-color: rgba(63, 61, 61, 0.359);
    }
</style>