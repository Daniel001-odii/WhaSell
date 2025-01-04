<template>
    <!-- <ToastBox/> -->
     
    <div class="min-h-screen flex flex-col md:flex-row">
        <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center md:p-12">
            <div class="p-3 w-full md:max-w-lg">
                <h1 class="text-4xl font-bold text-app_green mb-3">Reset Password</h1>
                <form v-if="!next_step" @submit.prevent="sendResetLink">
                    <p class="my-6">Enter your email address to reset your password. <br/>
                        If we find your email in our records, we will send you a link to reset your password.
                    </p>

                    <span class="text-red-500 py-3">{{ error_message }}</span>

                    <div class="flex flex-col gap-3">
                        <div class="relative">
                            <input type="email" placeholder="email" v-model="form.email" class="form-input" :class="errors.email ? 'border-red-400':''" required>   
                        </div>
                    </div>
                    <button type="submit" :disabled="loading || form.password != form.password_confirmation || reset_link_sent" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                        <span v-if="loading" class=" app_spinner"></span>
                        <span>Send reset link <span v-if="reset_link_sent">in {{ time }}s</span></span>
                    </button>
                </form>
                <form v-if="next_step" @submit.prevent="resetPassword" class="m-3">
                   
                    <p class="my-6">Set a new password, must be at least 8 characters.</p>

                    <span class="text-red-500 py-3">{{ error_message }}</span>

                    

                    <div  class="flex flex-col gap-3">
                        <div>
                            <span class=" font-bold text-lg">Password</span>
                            <div class="relative">
                                <input :type="show_pass ? 'text':'password'" placeholder="password" v-model="form.password" class="form-input" :class="errors.password ? 'border-red-400':''" @input="evaluatePasswordStrength($event.target.value)" required>
                                
                                <span @click="show_pass = !show_pass" class="bi absolute top-3 right-3">
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
                                </span>
                                <!-- <i  :class="show_pass ? 'bi-eye':'bi-eye-slash'" class="bi absolute top-3 right-3"></i> -->
                            </div>
                            <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>

                            <div class="mt-3 flex flex-col gap-1">
                                <span class="text-[12px] text-gray-400 mb-3" v-if="passwordStrength.score < 5">1 uppercase, lowercase, numbers, symbols and no spacing (If you need one use this symbol “_”) </span>
                                <span class=" font-semibold text-sm mb-1">Password strength</span>
                                <div class="h-[8px] bg-[#e0e0e0] rounded-md overflow-hidden relative">
                                    <div :class="['strength-level', passwordStrength.label.toLowerCase()]" :style="{ width: passwordStrength.score * 20 + '%' }"></div>
                                </div>
                                <span class="text-sm">{{ passwordStrength.label }}</span>
                            </div>
                        </div>

                        <div>
                            <span class=" font-bold text-lg">Password confirmation</span>
                            <div class="relative">
                                <input name="password" :type="show_pass ? 'text':'password'" placeholder="password" v-model="form.password_confirmation" class="form-input" :class="errors.password ? 'border-red-400':''" required>
                            </div>
                            <small v-if="form.password != '' && form.password != form.password_confirmation" class="text-red-500">passwords do not match</small>
                        </div>
                    </div>

                    <!-- {{ form }} -->
                    
                    <button type="submit" :disabled="loading || form.password != form.password_confirmation" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                        <span v-if="loading" class=" app_spinner"></span>
                        <span>Reset Password</span>
                    </button>

                    <div class="mt-3 text-gray-400">
                        <p>Not yet a member? <RouterLink class="text-app_green" to="/register">join us</RouterLink></p>
                    </div>
                </form>
            </div>
        </div>
        <div class="hidden md:flex bg-slate-100 w-[50%] min-h-screen justify-center items-center">
            <img src="../assets/images/pass_reset.png" class=" h-[400px]">
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import ToastBox from '../components/ToastBox.vue'
import router from '@/router';
import Button from 'primevue/button'
    export default {
        name: "ResetPasswordView",
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
                    email: '',
                    token: '',
                    password: '',
                    password_confirmation: '',
                },

                errors: {
                    password: '',
                },
                next_step: false,

                reset_link_sent: false,
                time: 60,
            }
        },

        methods:{
            
            evaluatePasswordStrength(password) {
                let score = 0;
                let label = 'Weak';

                if (password.length > 8) score += 1;
                if (/[A-Z]/.test(password)) score += 1;
                if (/[a-z]/.test(password)) score += 1;
                if (/[0-9]/.test(password)) score += 1;
                if (/[\W]/.test(password)) score += 1;

                if (score <= 2) {
                    label = 'Weak';
                } else if (score <= 4) {
                    label = 'Good';
                } else {
                    label = 'Strong';
                }

                this.passwordStrength = { score, label };
            },

            async sendResetLink(){
                try{
                    this.loading = true;
                    const response = await axios.post('/password_reset/link', this.form);
                    // show toast alert...
                    this.$toast.open({
                        message: 'password reset link successfully sent!',
                        type: 'success',
                    });
                    
                    this.countDown();
                    this.loading = false;
                }catch(error){
                    console.error("send reset link error: ", error);
                    this.error_message = error.response.data.message;
                    this.loading = false;
                }
            },


            async resetPassword() {
                try {
                    this.loading = true;
                   
                    const response = await axios.post('/password_reset', this.form);
                    console.log("reset password response: ", response);

                    // show toast alert...
                    this.$toast.open({
                        message: 'password reset successful',
                        type: 'success',
                    });

                    setTimeout(() => {
                        router.push('/login');
                    }, 2000);
                } catch (error) {
                    this.$toast.open({
                        message: error.response.data.message,
                        type: 'error',
                    });
                    console.error("reset password error: ", error);
                    this.error_message = error.response.data.message;
                } finally {
                    this.loading = false;
                }
            },


            countDown(){
                this.reset_link_sent = true;
                let seconds = 60
                const time = setInterval(()=>{
                    if(seconds > 0){
                        seconds -= 1;
                        console.log("seconds: ", seconds);
                        this.time = seconds;
                    } else {
                        clearInterval(time);
                        this.reset_link_sent = false;
                    }
                }, 1000);
            },
        },

        mounted(){
            if(this.$route.query.token){
                this.next_step = true;
                this.form.token = this.$route.query.token;
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