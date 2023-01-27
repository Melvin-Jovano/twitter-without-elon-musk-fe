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

                    <div v-if="showHeading && step === 1">

                        <h3 class="fw-bold my-4">Join Twitter today</h3>
                        
                        <button class="w-50 py-2 border text-sm my-3 rounded-50px bg-transparent text-black fw-bold py-1">
                            <IconApple />&nbsp;
                            Sign up with Apple
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
                        
                        <button type="submit" class="w-50 py-2 border-0 text-sm my-3 rounded-50px bg-black text-white fw-bold py-1" @click="showHeading = false">
                            Create account
                        </button>
    
                        <div class="text-xs w-50 mx-auto">
                            By signing up, you agree to the&nbsp;
                            <a href="#" class="text-decoration-none text-primary-twitter">Terms of Service</a>&nbsp;
                            and
                            <a href="#" class="text-decoration-none text-primary-twitter">Privacy Policy</a>,&nbsp;
                            including 
                            <a href="#" class="text-decoration-none text-primary-twitter">Cookie Use.</a>&nbsp;
                        </div>
                        
                        <div class="mt-5 mb-2">
                            Have an account already?&nbsp;
                            <a href="/login" class="text-decoration-none text-primary-twitter">Log in</a>
                        </div>
                    </div>
                    
                    <div v-if="!showHeading && step === 1">   
                        <h3 class="fw-bold my-4">Create your account</h3>
                        <input v-model="username" type="text" placeholder="Username" class="form-control">
                        
                        <div class="my-4">
                            <input v-model="password" type="password" placeholder="Password" class="form-control">
                            <div class="text-danger text-xs" v-if="password.length < 6">
                                Password Must Be At Least 6 Characters
                            </div>
                        </div>
                        
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
                                <select v-model="dateInput" class="form-select text-xs">
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
                    </div>

                    <div v-if="step === 2">
                        <h4 class="fw-bold my-3">
                            Customize your experience
                        </h4>

                        <h5 class="fw-bold mt-4 mb-2">
                            Track where you see Twitter content across the web
                        </h5>

                        <div class="row">
                            <div class="col">
                                <h6 class="text-xs">
                                    Twitter uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.
                                </h6>
                            </div>
                            <div class="col-1">
                                <input class="form-check-input" type="checkbox" name="" id="">
                            </div>
                        </div>

                        <div class="mt-3 mb-5 text-muted text-xs fw-bold">
                            By signing up, you agree to our 
                            <a class="text-decoration-none text-primary-twitter" href="#">Terms</a>,&nbsp;
                            <a class="text-decoration-none text-primary-twitter" href="#">Privacy Policy</a>,
                            and 
                            <a class="text-decoration-none text-primary-twitter" href="#">Cookie</a> Use. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. 
                            <a class="text-decoration-none text-primary-twitter" href="#">Learn more</a>
                        </div>
                    </div>
                    
                    <div v-if="step === 3">
                        <fieldset @click="step = 1" class="border cursor-pointer rounded p-2 my-3 text-xs">
                            <legend class="text-xs mb-0">Username</legend>
                            <div class="row">
                                <div class="fw-bold col">
                                    @{{ username }}
                                </div>
                                <div class="col-2 text-center">
                                    <IconCheck />
                                </div>
                            </div>                         
                        </fieldset>

                        <fieldset @click="step = 1" class="border cursor-pointer rounded p-2 text-xs">
                            <legend class="text-xs mb-0">Date of birth</legend>
                            <div class="row">
                                <div class="fw-bold col">
                                    {{ moment({year: yearInput, months: monthInput, date: days}).format('MMMM d, YYYY') }}
                                </div>
                                <div class="col-2 text-center">
                                    <IconCheck />
                                </div>
                            </div>                       
                        </fieldset>

                        <div class="text-xs text-muted mt-4">
                            By signing up, you agree to the 
                            <a href="#" class="text-decoration-none text-primary-twitter">Terms of Service</a>&nbsp;and
                            <a href="#" class="text-decoration-none text-primary-twitter">Privacy Policy</a>&nbsp;, including
                            <a href="#" class="text-decoration-none text-primary-twitter">Cookie Use</a>&nbsp;. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. 
                            <a href="#" class="text-decoration-none text-primary-twitter">Learn more</a>. Others will be able to find you by email or phone number, when provided, unless you choose otherwise <a href="#" class="text-decoration-none text-primary-twitter">here</a>.
                        </div>
                    </div>

                    <button @click="register()" v-if="!showHeading" type="submit" :class="`${username.length === 0 || password.length < 6 ? 'disabled' : step === 3 ? 'bg-primary-twitter' : 'bg-black'} w-100 mt-4 py-2 border-0 text-sm my-3 rounded-50px text-white py-1`" :disabled="username.length === 0 || password.length < 6">
                        <span class="fw-bold" v-if="step === 3">Sign up</span>
                        <span class="fw-bold" v-else>Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import IconTwitter from '../assets/icons/IconTwitter.vue';
    import {findUserByUsername, signUp} from '../api/auth';
    import IconApple from '../assets/icons/IconApple.vue';
    import {months} from '../const';
    import {range} from '../utils/util';
    import moment from 'moment';
    import IconCheck from '../assets/icons/IconCheck.vue';
    import router from '../router';

    const years = ref(range(121, 1903).reverse());
    const username = ref('');
    const password = ref('');
    const showHeading = ref(true);
    const monthInput = ref(0);
    const dateInput = ref(1);
    const yearInput = ref(2023);
    const days = ref(31);
    const step = ref(1);

    function getDays() {
        days.value = new Date(yearInput.value, monthInput.value+1, 0).getDate();
    };

    async function register() {
        try {
            if(step.value === 3) {
                const findUser = await findUserByUsername({username: username.value});
                if(findUser.data.message === 'SUCCESS') {
                    if(findUser.data.data !== null) {
                        alert('Username Already Taken');
                    }
    
                    await signUp({username: username.value, password: password.value, birthday: moment({year: yearInput.value, months: monthInput.value, date: days.value}).unix()});

                    await router.push({name: 'login'});
                }
                return;
            }
            step.value++;
        } catch (error) {
            console.error(error);
            alert('Username Already Taken');
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

    .green {
        color: rgb(0, 186, 124);
    }
</style>