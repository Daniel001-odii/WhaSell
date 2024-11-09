<template>
    <!-- <ToastBox/> -->
    <div class="min-h-screen flex flex-col md:flex-row">
        <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center md:p-12">
            <div class="p-3 w-full md:max-w-lg">
                <form @submit.prevent="login" class="m-3">
                    <h1 class="text-4xl font-bold text-app_green mb-3">Login</h1>
                    <p class="my-6">Welcome back!!, Oya let’s get back to it...</p>

                    <span class="text-red-500 py-3">{{ error_message }}</span>

                    <div class="flex flex-col gap-3">
                        <div>
                            <input type="text" name="email" placeholder="username, email or phone" v-model="form.usernameOrEmailOrPhone" class="form-input" :class="errors.username ? 'border-red-400':''" required>
                            <small v-if="errors.username || form.usernameOrEmailOrPhone == ''" class="text-red-500">{{ errors.username }}</small>
                        </div>
                        <div>
                            <div class="relative">
                                <input name="password" :type="show_pass ? 'text':'password'" placeholder="password" v-model="form.password" class="form-input" :class="errors.password ? 'border-red-400':''" required>
                                
                                <button type="button" @click="show_pass = !show_pass" class="bi absolute top-3 right-3">
                                    <svg v-if="show_pass" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M4.25 10.4167C6.75 5.00008 14.25 5.00008 16.75 10.4167" stroke="#0A0B0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.4987 13.3333C9.5782 13.3333 8.83203 12.5872 8.83203 11.6667C8.83203 10.7462 9.5782 10 10.4987 10C11.4192 10 12.1654 10.7462 12.1654 11.6667C12.1654 12.5872 11.4192 13.3333 10.4987 13.3333Z" stroke="#0A0B0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 5.3335C5 9.66683 11 9.66683 13 5.3335" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.2109 7.54492L13.0001 9.99992" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 8.5835V11.0002" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4.78922 7.54492L3 9.99992" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <!-- <i  :class="show_pass ? 'bi-eye':'bi-eye-slash'" class="bi absolute top-3 right-3"></i> -->
                            </div>
                            <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>

                            
                        </div>
                    </div>
                    
                    <button type="submit" :disabled="loading" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                        <span v-if="loading">loading...</span>
                        <span v-else>Looogin</span>
                    </button>

                    <div class="mt-3 text-gray-400">
                        <p>Not yet a member? <RouterLink class="text-app_green" to="/register">join us</RouterLink></p>
                    </div>
                </form>
            </div>
        </div>
        <div class="hidden md:flex bg-app_green w-[50%] min-h-screen justify-center items-center">
            <img src="../assets/images/Female specialist doing social media marketing.png" class=" h-[400px]">
        </div>
    </div>
</template>


<script>
import axios from 'axios'

import ToastBox from '../components/ToastBox.vue'

import Button from 'primevue/button'
    export default {
        name: "UserRegistrationView",
        components: {
            ToastBox,
            Button,
        },
        data(){
            return{
                user_type: "",
                loading: false,
                show_pass: false,

                error_message: '',

                passwordStrength: {
                    score: 0,
                    label: 'Weak',
                },


                form:{
                    usernameOrEmailOrPhone: '',
                    password: '',
                },

                errors: {
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                }
            }
        },

        methods:{
            
            async login() {
                try {
                    this.loading = true;
                    const response = await axios.post('/login', this.form, { withCredentials: true });
                    console.log("login response: ", response);

                    // show toast alert...
                    this.$toast.open({
                        message: 'login successful',
                        type: 'success',
                    });

                    localStorage.setItem("is_authenticated", true);

                    

                    setTimeout(() => {
                        // this.$router.push('/market');
                        // Redirect to the originally requested page or a default page
                        const redirectPath = this.$route.query.redirect || '/market';
                        this.$router.push(redirectPath);
                    }, 1000);

                    this.loading = true;
                } catch (error) {
                    // console.log("error in login user: ", error);
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                    // this.$toast.add({ severity: 'error', detail: `${error.response.data.message}`, life: 3000 });
                    this.loading = false;

                }
            }

        }
    }
</script>

<style scoped>
.input-type{
    @apply flex border flex-col p-3 rounded-lg justify-start items-start gap-5
}

input[type="radio"]:checked{
    @apply bg-app_green border border-app_green
}

.strength-level {
    height: 100%;
    transition: width 0.3s;
}

.weak {
    background: #C03744;
}

.good {
    background: #EDA145;
}

.strong {
    background: #15B097;
}
</style>