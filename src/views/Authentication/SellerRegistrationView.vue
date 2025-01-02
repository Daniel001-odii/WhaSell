<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <div class="w-full md:w-[50%] flex justify-center items-center p-3 md:p-12">
            <div class="p-3 w-full max-w-lg flex flex-col gap-3">
                
                
                <form @submit.prevent="register" class="flex flex-col">
                    <h1 class="text-4xl font-bold text-app_green mb-3">Sign Up Seller</h1>
                    <p class="my-3">Start your journey today! Buying made easy.</p>

                    <!-- <span class="text-red-500 my-3">{{ error_message }}</span> -->
                   

                    <!-- {{  form  }} -->

                    <!-- PROGRESS BAR -->
                    <div class="flex flex-row justify-between mb-8 text-center w-full relative">
                        <div class="flex flex-col justify-center items-center gap-2">
                            <span class=" h-[40px] w-[40px] flex rounded-full justify-center font-bold items-center bg-app_green text-white">1</span>
                            <span class="text-sm text-gray-400">Personal details</span>
                        </div>

                        <div class="flex flex-col justify-center items-center gap-2">
                            <span :class="slide >= 1 ? 'bg-app_green text-white':'bg-white text-black'" class=" h-[40px] w-[40px] flex rounded-full justify-center font-bold items-center border border-app_green">2</span>
                            <span class="text-sm text-gray-400">shop details</span>
                        </div>

                        <div class="flex flex-col justify-center items-center gap-2">
                            <span :class="slide >= 2 ? 'bg-app_green text-white':'bg-white text-black'" class=" h-[40px] w-[40px] flex rounded-full justify-center font-bold items-center border border-app_green">3</span>
                            <span class="text-sm text-gray-400">shop preview</span>
                        </div>
                        <!-- Centered dashed border line -->
                        <div class="border border-dashed absolute w-[80%] -z-10 top-5 left-0 right-0 mx-auto"></div>
                    </div>

                   
                    <!-- END OF PROGRESS BAR -->

<!-- {{ form_error }} -->

                    <!-- FORM SLIDES... -->
                     <!-- FORM SLIDE 1 -->
                    <div v-show="slide == 0" class="flex flex-col gap-3">
                        <div>
                            <input
                                class="form-input"
                                id="username"
                                type="text"
                                v-model="form.username"
                                @input="validateUsername"
                                placeholder="your username"
                            />
                            
                            <!-- <input type="text" placeholder="username" v-model="form.username" class="form-input" :class="errors.username ? 'border-red-400':''" required> -->
                            <small v-if="errors.username || form.username == ''" class="text-red-500">{{ errors.username }}</small>
                        </div>
                        <div>
                            <input @change="checkEmail" type="email" placeholder="example@mail.com" v-model="form.email" class="form-input" :class="errors.email ? 'border-red-400':''" required>
                            <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
                        </div>
                        <div>
                            <input
                                class="form-input"
                                id="phone"
                                type="text"
                                v-model="form.phone"
                                @input="validatePhone"
                                @change="checkPhone"
                                placeholder="08123456789"
                            />
                            <!-- <input type="tel" placeholder="08123456789" v-model="form.phone" class="form-input" :class="errors.phone ? 'border-red-400':''" required> -->
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

                        <button type="button" @click="slide += 1" :disabled="loading || passwordStrength.score < 5 || form_error || form.email == '' || form.username == '' || form.phone == '' || form.password == ''" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                            <span v-if="loading">loading...</span>
                            <span v-else>Next</span>
                        </button>
                    </div>

                    <!-- FORM SLIDE 2 -->
                    <div v-show="slide == 1" class="flex flex-col gap-3">
                        <div>
                            <input type="text" @input="validateShopName" @change="checkShopName()" placeholder="Shop name" v-model="form.shop_name" class="form-input" :class="errors.shop_name ? 'border-red-400':''" required>
                            <small v-if="errors.shop_name || form.shop_name == ''" class="text-red-500">{{ errors.shop_name }}</small>
                        </div>
                        
                        <div>
                            <select class="form-input" v-model="form.shop_category">
                                <option value="">Select Category</option>
                                <option v-for="Category in shop_categories" :value="Category">{{ Category }}</option>
                            </select>
                        </div>

                        <div>
                            <textarea type="textarea" placeholder="Shop Bio" v-model="form.shop_description" class="form-input max-h-[100px] min-h-[100px]" :class="errors.shop_name ? 'border-red-400':''"></textarea>
                            <small v-if="errors.shop_name || form.shop_name == ''" class="text-red-500">{{ errors.shop_name }}</small>
                        </div>
                        

                        <div class="flex flex-row gap-3">
                            <button type="button" @click="slide -= 1" class="bg-gray-600 text-white w-fit rounded-md p-3 px-5 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                                Prev
                            </button>

                            <button type="button" @click="slide += 1" :disabled="form.shop_name == '' || form.shop_category == '' || form.shop_description == '' || form_error" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                                Next
                            </button>
                        </div>

                    </div>

                    <!-- FORM SLIDE 3 -->
                    <div v-show="slide == 2" class="flex flex-col gap-3">
                        <!-- <div class="w-full flex flex-col gap-2" v-for="error in errors">
                            <span v-if="error.length > 0" class="text-red-700 p-3 bg-red-500 bg-opacity-10 rouded-sm">{{ error }}</span>
                        </div> -->


                        <div class=" flex flex-col justify-center items-center gap-3">
                            <div class=" h-40 w-40 bg-gray-200 rounded-full relative flex justify-center items-center">
                                <i class="bi bi-shop text-4xl text-gray-400"></i>
                                <span class=" h-10 w-10 bg-app_green rounded-full absolute right-2 bottom-2 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 11 12" fill="none">
                                        <path d="M8 1.49991C8.13132 1.36859 8.28722 1.26441 8.4588 1.19334C8.63038 1.12227 8.81428 1.08569 9 1.08569C9.18572 1.08569 9.36962 1.12227 9.5412 1.19334C9.71278 1.26441 9.86868 1.36859 10 1.49991C10.1313 1.63123 10.2355 1.78713 10.3066 1.95871C10.3776 2.13029 10.4142 2.31419 10.4142 2.49991C10.4142 2.68562 10.3776 2.86952 10.3066 3.0411C10.2355 3.21268 10.1313 3.36859 10 3.49991L3.25 10.2499L0.5 10.9999L1.25 8.24991L8 1.49991Z" stroke="#E0F6EA" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                            <h1 class="font-bold text-lg">{{ form.shop_name }}</h1>
                            <p>{{ form.shop_description }}</p>
                            <span class=" bg-app_light_green text-app_green px-3 p-2 rounded-md">{{ form.shop_category }}</span>
                        </div>

                       
                        <div class="flex flex-row gap-3">
                            <button type="button" @click="slide -= 1" class="bg-gray-600 text-white w-fit rounded-md p-3 px-5 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                                Prev
                            </button>

                            <button type="submit" :disabled="form_error || loading" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                                <span v-if="loading">loading...</span>
                                <span v-else>Create account jorr!</span>
                            </button>
                        </div>

                    </div>

                  



                    <!-- <button type="button" @click="register" :disabled="loading || passwordStrength.score < 5" class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
                        <span v-if="loading">loading...</span>
                        <span v-else>Next</span>
                    </button> -->
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
import ToastBox from '@/components/ToastBox.vue'


    export default {
        name: "SellerRegistrationView",
        data(){
            return{
                user_type: "",
                loading: false,
                show_pass: false,

                error_message: '',

                slide: 0,

                passwordStrength: {
                    score: 0,
                    label: 'Weak',
                },

                shop_categories: [
                    "electronics",
                    "furniture",
                    "clothing & textile",
                    "fashion & beauty",
                    "health",
                    "tools & industrial",
                    "arts & crafts",
                    "footwears",
                    "phone & telecoms", 
                    "accessories", 
                    "phones",
                    "baby, kids & toys",
                    "drinks & groceries",
                    "other"
                ],


                form:{
                    refferal_code: '',
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    shop_category: '',
                    shop_description: '',
                    shop_name: '',
                },
                errors: {
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                },
                form_error: false,
            }
        },

        methods:{

            validatePhone() {
                // Remove invalid characters and set the valid value
                const validPhone = this.form.phone.replace(/[^0-9]/g, "").slice(0,11);
                if (this.form.phone !== validPhone || validPhone.length > 11) {
                    // this.errors.phone = "Only numbers are allowed, and must not exceed 11 digits.";
                } else {
                    this.errors.phone = "";
                }
                this.form.phone = validPhone;
            },

            validateUsername() {
                // Remove invalid characters and set the valid value
                const validUsername = this.form.username.replace(/[^a-zA-Z]/g, "").slice(0,15);
                if(this.form.username.length >= 15){
                    // this.errors.username = "Username must not exceed 15 characters.";
                }
                else if (this.form.username !== validUsername) {
                    this.errors.username = "Only alphabets are allowed.";
                } else {
                    this.errors.username  = "";
                }
                this.form.username = validUsername;
            },

            validateShopName() {
                // Remove invalid characters and set the valid value
                const validUsername = this.form.shop_name.replace(/[^a-zA-Z]/g, "").slice(0,15);
                if(this.form.shop_name.length >= 15){
                    // this.errors.username = "Username must not exceed 15 characters.";
                }
                else if (this.form.shop_name !== validUsername) {
                    // this.errors.shop_name = "Only alphabets are allowed.";
                } else {
                    this.errors.shop_name  = "";
                }
                this.form.shop_name = validUsername;
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
                    const response = await axios.post(`/user/email_check`, { email: this.form.email});
                    console.log("email response: ", response);
                    this.form_error = false;
                    this.errors.email = '';
                }catch(error){
                    console.log("error checking email: ", error);
                    this.errors.email = error.response.data.message;
                    this.form_error = true;
                }
            },

            async checkPhone(){
                try{
                    const response = await axios.get(`/user/phone_check/${this.form.phone}`);
                    console.log("phone response: ", response);
                    this.form_error = false;
                    this.errors.phone = '';
                }catch(error){
                    console.log("error checking phone: ", error);
                    this.errors.phone = error.response.data.message;
                    this.form_error = true;
                }
            },

            async checkShopName(){
                try{
                    const response = await axios.get(`/shops/name_check/${this.form.shop_name}`);
                    console.log("shop name response: ", response);
                    this.form_error = false;
                    this.errors.shop_name = '';
                }catch(error){
                    console.log("error checking shop name: ", error);
                    this.errors.shop_name = error.response.data.message;
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

                    const response = await axios.post('/register/secondary', this.form, { withCredentials: true });
                    console.log("registration response: ", response);
                    
                    
                    // show toast alert...
                    this.$toast.open({
                        message: 'Registration successful',
                        type: 'success',
                    });

                    // clear refferal code from localstorage
                    localStorage.removeItem('refferal_code');
                     

                    setTimeout(() => {
                        this.$router.push('/market');
                    }, 1000);

                    this.form_error = false;
                } catch (error) {
                    
                    if (error.response && error.response.data && error.response.data.error && error.response.data.error.errors) {
                        const backendErrors = error.response.data.error.errors;
                        this.errors.username = backendErrors.username ? backendErrors.username.message : '';
                        this.errors.email = backendErrors.email ? backendErrors.email.message : '';
                        this.errors.phone = backendErrors.phone ? backendErrors.phone.message : '';
                        this.errors.password = backendErrors.password ? backendErrors.password.message : '';
                    } else {
                        this.error_message = error.response.data.message;
                        // this.errors.phone = error.response.data.error.keyValue.phone ? 'phone already registered':'';
                        // this.errors.email = error.response.data.error.keyValue.email ? 'email already registered':'';
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