<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-3 md:p-12">
            <div class="p-3 w-full max-w-lg">
                <form @submit.prevent="register">
                    <h1 class="text-4xl font-bold text-app_green mb-3">Sign Up Buyer</h1>
                    <p class="my-3">Start your journey today! Buying made easy.</p>

                    <span class="text-red-500 py-3">{{ error_message }}</span>

                    <div class="flex flex-col gap-3">
                        <div>
                            <input @input="validateUsername" id="username" type="text" name="username" placeholder="username" v-model="form.username" class="form-input" :class="errors.username ? 'border-red-400':''" required>
                            <small v-if="errors.username || form.username == ''" class="text-red-500">{{ errors.username }}</small>
                        </div>
                        <div>
                            <div class="flex flex-row relative">
                                <SpinnerComponent v-if="loading_email" class="absolute top-[50%] right-[5%]"/>
                                <input id="email" type="email" @change="checkEmail" name="email" placeholder="example@mail.com" v-model="form.email" class="form-input" :class="errors.email ? 'border-red-400':''" required>
                            </div>
                            
                            <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
                        </div>
                        <div class="relative">
                            <SpinnerComponent v-if="loading_phone" class="absolute top-[35%] right-[5%]"/>
                            <input type="tel" @change="checkPhone" name="phone" placeholder="081234567890" v-model="form.phone" class="form-input" :class="errors.phone ? 'border-red-400':''" required>
                            <small v-if="errors.phone" class="text-red-500">{{ errors.phone }}</small>
                        </div>
                        <div>
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
                    </div>
                    <div class="mt-3 text-gray-400">
                        <p>Already a member? <RouterLink class="text-app_green underline" to="/login">Login</RouterLink></p>
                    </div>
                    <button type="submit" :disabled="loading || passwordStrength.score < 5 || form_error" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                        <span v-if="loading">loading...</span>
                        <span v-else>Oya let's get started</span>
                    </button>
                </form>
            </div>
        </div>
        <div class="hidden md:flex bg-app_green w-[50%] min-h-screen justify-center items-center">
            <img src="../../assets/images/Female specialist doing social media marketing.png" class=" h-[400px]">
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import SpinnerComponent from '@/components/SpinnerComponent.vue';


    export default {
        name: "UserRegistrationView",
        components: {
            SpinnerComponent
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
                    refferal_code: '',
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                },
                errors: {
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                },
                form_error: false,

                loading_email: false,  
                loading_phone: false,
                
            }
        },

        methods:{

            validateUsername() {
                // Remove invalid characters and set the valid value
                const validUsername = this.form.username.replace(/[^a-zA-Z]/g, "").slice(0,15);
                if(this.form.username.length >= 15){
                    // this.errors.username = "Username must not exceed 15 characters.";
                }
                else if (this.form.username !== validUsername) {
                    // this.errors.username = "Only alphabets are allowed.";
                } else {
                    this.errors.username  = "";
                }
                this.form.username = validUsername;
            },

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

            async checkEmail(){
                try{
                    this.loading_email = true;
                    const response = await axios.post(`/user/email_check`, { email: this.form.email});
                    console.log("email response: ", response);

                    this.errors.email = '';
                    this.loading_email = false;
                    this.form_error = false;
                }catch(error){
                    console.log("error checking email: ", error);
                    this.errors.email = error.response.data.message;

                    this.loading_email = true;
                    this.form_error = true;
                }
            },

            async checkPhone(){
                try{
                    this.loading_phone = true;
                    const response = await axios.get(`/user/phone_check/${this.form.phone}`);
                    console.log("phone response: ", response);


                    this.form_error = false;
                    this.errors.phone = '';
                    this.loading_phone = false;
                }catch(error){
                    console.log("error checking phone: ", error);
                    this.errors.phone = error.response.data.message;

                    this.loading_phone = true;
                    this.form_error = true;
                }
            },
            
            async register() {
                try {
                    this.loading = true;

                    // check if user is reffered
                    if(localStorage.getItem('refferal_code')){
                        this.form.refferal_code = localStorage.getItem('refferal_code');
                        this.$toast.open({
                            message: 'You have been reffered!',
                            type: 'success',
                        });
                    };

                    const response = await axios.post('/register/primary', this.form, { withCredentials: true });
                    console.log("registration response: ", response);
                    this.$toast.open({
                        message: 'Registration successful',
                        type: 'success',
                    });

                    // clear refferal code from localstorage
                    localStorage.removeItem('refferal_code');

                    // localStorage.setItem("is_authenticated", true);
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 1000);
                    // this.loading = false;
                } catch (error) {
                    
                    if (error.response && error.response.data && error.response.data.error && error.response.data.error.errors) {
                        const backendErrors = error.response.data.error.errors;
                        this.errors.username = backendErrors.username ? backendErrors.username.message : '';
                        this.errors.email = backendErrors.email ? backendErrors.email.message : '';
                        this.errors.phone = backendErrors.phone ? backendErrors.phone.message : '';
                        this.errors.password = backendErrors.password ? backendErrors.password.message : '';
                    } else {
                        // this.error_message = error.response.data.message;
                        this.errors.phone = error.response.data.error.keyValue.phone ? 'phone already registered':'';
                        this.errors.email = error.response.data.error.keyValue.email ? 'email already registered':'';
                    }
                    console.log("error registering user: ", error);
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