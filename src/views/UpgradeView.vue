<template>
    <div>

        <!-- PAYMENT STATUS MODAL -->
        <div v-if="$route.query.payment_status" class="fixed min-h-screen w-full bg-[#000] top-0 left-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center">
            <div class="bg-white w-[400px] p-4 min-h-[100px] rounded-xl justify-center items-center flex flex-col gap-6 ">
                <div v-if="payment_success" class="flex flex-col text-green-500 text-center">
                    <span class="font-bold text-2xl">Payment Successful</span>
                    <i class="bi bi-check-circle-fill text-2xl"></i>
                </div>
                <div class=" text-red-500 flex flex-col text-center" v-if="payment_success == false" >
                    <span class="font-bold text-2xl">Payment Failed</span>
                    <i class="bi bi-exclamation-circle-fill text-2xl"></i>
                </div>
                <div class=" text-orange-500 flex flex-col text-center" v-if="payment_success == null" >
                    <span class="font-bold text-2xl">Payment processing</span>
                    <div class="p-4 mt-2">
                        <SpinnerComponent/>
                    </div>
                    
                </div>
               
                <RouterLink to="/account/subscriptions">
                    <button class="btn bg-gray-500 text-white">Continue</button>
                </RouterLink>
            </div>
        </div>


        <div class="border rounded-lg flex flex-col gap-3 p-3  px-8 mt-1 bg-white">
            <h2 class="font-bold mt-5">Pricing Brochure</h2>
            
            <!-- INFO SECTION -->
            <div class="flex flex-row gap-3 bg-yellow-500 rounded-md p-5 text-white items-center">
                <i class="bi bi-exclamation-circle-fill"></i>
                <p>Heres a list of how much credit you will be charged per transaction on Whatsell</p>
            </div>

            <div class="flex flex-col gap-4 mt-3">
                <div class="pricing_list">
                    <p class="font-bold">Listing a product</p>
                    <span>Free, Unlimited</span>
                </div>

                <div class="pricing_list">
                    <p class="font-bold">Auto post a listing</p>
                    <span>2 Credits per post (per platform)</span>
                </div>

                <div class="pricing_list">
                    <p class="font-bold">Post a glip listing</p>
                    <span>3 Credits per post</span>
                </div>

                <div class="pricing_list">
                    <p class="font-bold">Boost your Shop</p>
                    <span>5 credtis per day</span>
                </div>

                <div class="pricing_list">
                    <p class="font-bold">Sponsor a product listing</p>
                    <span>10 credits per day</span>
                </div>

                <div class="pricing_list">
                    <p class="font-bold">Advertise a service, offer or listing</p>
                    <span>5 credits per click</span>
                </div>
            </div>
        </div>

        <div id="coins" class="font-bold p-3 border rounded-lg text-green-700 bg-white mt-12">
            <i class="bi bi-wallet2 mr-3"></i>Your wallet
        </div>
        <div class="border rounded-lg flex flex-col gap-3 p-8 mt-3 bg-white">
          <h2 class="text-gray-500 font-bold">Available Balance <i class="bi bi-eye-fill"></i></h2>
          <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-3 items-center" v-if="user">
                <img src="../assets/images/coins_group.png"/>
                <span class="font-bold text-3xl">{{ user.credits.toLocaleString() }}</span>
            </div>
            <div>
                <!-- <button class="btn bg-app_green text-white">TopUp wallet</button> -->
            </div>
          </div>
        </div>

        <div class="border rounded-lg flex flex-col gap-3 p-3  px-8 mt-1 bg-white">
            <h2 class="font-bold text-lg mt-6">Topup</h2>
            <div class="flex flex-row flex-wrap mt-4 gap-5">
                <label :for="'default_coins'+index" v-for="(coin, index) in default_coins" :class="coins_input == coin ? 'border-green-500 text-green-700 bg-green-100':''" class="flex flex-col flex-1 justify-center items-center bg-gray-100 border rounded-md p-3 px-6 cursor-pointer min-w-[150px] hover:border-green-500" :key="index">
                    <div class="font-bold text-lg flex flex-row items-center justify-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.35086" y="1.23758" width="15.5253" height="15.5253" rx="7.76267"  :stroke="coins_input == coin ? 'green':'#6A6A6A'" stroke-width="1.36187"/>
                            <path :fill="coins_input == coin ? 'green':'gray'" fill-rule="evenodd" clip-rule="evenodd" d="M13.5828 8.96282C13.5828 11.4108 11.5815 13.3954 9.11269 13.3954C8.44858 13.3954 7.8183 13.2518 7.2517 12.9942C7.19879 12.9701 7.13944 12.9635 7.08291 12.9771L5.43231 13.3721C5.24626 13.4167 5.07989 13.2468 5.12828 13.0617L5.48203 11.7087C5.50147 11.6343 5.48573 11.5554 5.44156 11.4925C4.93788 10.7751 4.64258 9.90318 4.64258 8.96282C4.64258 6.51479 6.64391 4.53027 9.11269 4.53027C11.5815 4.53027 13.5828 6.51479 13.5828 8.96282ZM10.2325 7.67603C10.3319 7.73823 10.4778 7.71076 10.5343 7.60804L10.7541 7.20786C10.8171 7.0931 10.7827 6.94834 10.669 6.88352C10.4882 6.78049 10.2869 6.68886 10.0653 6.60861C9.75977 6.49322 9.4252 6.43552 9.06153 6.43552C8.79969 6.43552 8.55482 6.47158 8.32692 6.5437C8.09902 6.61102 7.89778 6.71199 7.72322 6.84662C7.55351 6.98125 7.42017 7.14953 7.32319 7.35148C7.22621 7.55342 7.17772 7.78421 7.17772 8.04386C7.17772 8.24099 7.20681 8.41168 7.265 8.55593C7.32804 8.70017 7.42017 8.82519 7.54139 8.93097C7.66261 9.03675 7.81293 9.13051 7.99234 9.21224C8.1766 9.28918 8.39238 9.3613 8.63967 9.42861C8.84333 9.4815 9.02759 9.53199 9.19245 9.58007C9.35731 9.62815 9.49793 9.68104 9.61431 9.73874C9.73068 9.79644 9.82039 9.86375 9.88342 9.94068C9.94646 10.0176 9.97798 10.1138 9.97798 10.2292C9.97798 10.5802 9.70159 10.7557 9.14881 10.7557C8.95 10.7557 8.75605 10.7316 8.56694 10.6835C8.37783 10.6355 8.20569 10.5778 8.05053 10.5105C7.89536 10.4383 7.75959 10.3686 7.64322 10.3013C7.52229 10.2231 7.3432 10.2583 7.27707 10.3862L7.06827 10.7902C7.01012 10.9026 7.04345 11.0417 7.15162 11.1075C7.40459 11.2614 7.68241 11.3846 7.98507 11.4769C8.36328 11.5923 8.74635 11.65 9.13426 11.65C9.38641 11.65 9.62885 11.6236 9.8616 11.5707C10.0944 11.513 10.298 11.424 10.4726 11.3038C10.6471 11.1836 10.7853 11.0273 10.8872 10.835C10.9938 10.6379 11.0472 10.4023 11.0472 10.1282C11.0472 9.8926 11.0084 9.69547 10.9308 9.5368C10.8532 9.37332 10.7417 9.23388 10.5962 9.11848C10.4556 9.00309 10.281 8.90692 10.0725 8.82999C9.86888 8.75306 9.64098 8.68094 9.38883 8.61363C9.19487 8.56554 9.02274 8.51987 8.87242 8.47659C8.72695 8.43332 8.60573 8.38524 8.50875 8.33235C8.41177 8.27946 8.33661 8.21935 8.28327 8.15204C8.23479 8.07992 8.21054 7.99097 8.21054 7.88519C8.21054 7.70247 8.27843 7.56063 8.4142 7.45966C8.54997 7.35869 8.75605 7.3082 9.03243 7.3082C9.1876 7.3082 9.34034 7.32744 9.49066 7.3659C9.64098 7.40437 9.77917 7.45245 9.90524 7.51015C10.0362 7.56304 10.1453 7.61833 10.2325 7.67603Z" fill="#6A6A6A"/>
                        </svg>
                       
                        <span>{{ coin }}</span>
                    </div>
                    <input type="radio" :id="'default_coins'+index" name="default_coins" :value="coin" v-model="coins_input" @change="variablePaymentAmount(coins_input)" class="hidden"/>
                    <span>Pay ₦{{ paymentAmount(coin).toLocaleString()}}</span>
                </label>
            </div>

            <form @submit.prevent="buyCoinsNow" class="flex flex-row py-4 mt-3 items-center text-lg gap-5">
                <div class="flex flex-row items-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.35086" y="1.23758" width="15.5253" height="15.5253" rx="7.76267" stroke="#6A6A6A" stroke-width="1.36187"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5828 8.96282C13.5828 11.4108 11.5815 13.3954 9.11269 13.3954C8.44858 13.3954 7.8183 13.2518 7.2517 12.9942C7.19879 12.9701 7.13944 12.9635 7.08291 12.9771L5.43231 13.3721C5.24626 13.4167 5.07989 13.2468 5.12828 13.0617L5.48203 11.7087C5.50147 11.6343 5.48573 11.5554 5.44156 11.4925C4.93788 10.7751 4.64258 9.90318 4.64258 8.96282C4.64258 6.51479 6.64391 4.53027 9.11269 4.53027C11.5815 4.53027 13.5828 6.51479 13.5828 8.96282ZM10.2325 7.67603C10.3319 7.73823 10.4778 7.71076 10.5343 7.60804L10.7541 7.20786C10.8171 7.0931 10.7827 6.94834 10.669 6.88352C10.4882 6.78049 10.2869 6.68886 10.0653 6.60861C9.75977 6.49322 9.4252 6.43552 9.06153 6.43552C8.79969 6.43552 8.55482 6.47158 8.32692 6.5437C8.09902 6.61102 7.89778 6.71199 7.72322 6.84662C7.55351 6.98125 7.42017 7.14953 7.32319 7.35148C7.22621 7.55342 7.17772 7.78421 7.17772 8.04386C7.17772 8.24099 7.20681 8.41168 7.265 8.55593C7.32804 8.70017 7.42017 8.82519 7.54139 8.93097C7.66261 9.03675 7.81293 9.13051 7.99234 9.21224C8.1766 9.28918 8.39238 9.3613 8.63967 9.42861C8.84333 9.4815 9.02759 9.53199 9.19245 9.58007C9.35731 9.62815 9.49793 9.68104 9.61431 9.73874C9.73068 9.79644 9.82039 9.86375 9.88342 9.94068C9.94646 10.0176 9.97798 10.1138 9.97798 10.2292C9.97798 10.5802 9.70159 10.7557 9.14881 10.7557C8.95 10.7557 8.75605 10.7316 8.56694 10.6835C8.37783 10.6355 8.20569 10.5778 8.05053 10.5105C7.89536 10.4383 7.75959 10.3686 7.64322 10.3013C7.52229 10.2231 7.3432 10.2583 7.27707 10.3862L7.06827 10.7902C7.01012 10.9026 7.04345 11.0417 7.15162 11.1075C7.40459 11.2614 7.68241 11.3846 7.98507 11.4769C8.36328 11.5923 8.74635 11.65 9.13426 11.65C9.38641 11.65 9.62885 11.6236 9.8616 11.5707C10.0944 11.513 10.298 11.424 10.4726 11.3038C10.6471 11.1836 10.7853 11.0273 10.8872 10.835C10.9938 10.6379 11.0472 10.4023 11.0472 10.1282C11.0472 9.8926 11.0084 9.69547 10.9308 9.5368C10.8532 9.37332 10.7417 9.23388 10.5962 9.11848C10.4556 9.00309 10.281 8.90692 10.0725 8.82999C9.86888 8.75306 9.64098 8.68094 9.38883 8.61363C9.19487 8.56554 9.02274 8.51987 8.87242 8.47659C8.72695 8.43332 8.60573 8.38524 8.50875 8.33235C8.41177 8.27946 8.33661 8.21935 8.28327 8.15204C8.23479 8.07992 8.21054 7.99097 8.21054 7.88519C8.21054 7.70247 8.27843 7.56063 8.4142 7.45966C8.54997 7.35869 8.75605 7.3082 9.03243 7.3082C9.1876 7.3082 9.34034 7.32744 9.49066 7.3659C9.64098 7.40437 9.77917 7.45245 9.90524 7.51015C10.0362 7.56304 10.1453 7.61833 10.2325 7.67603Z" fill="#6A6A6A"/>
                    </svg>
                    <input type="number" v-model="coins_input" @keyup="variablePaymentAmount(coins_input)" @change="variablePaymentAmount(coins_input)" class=" border-b-2 p-3 outline-none w-[200px]" placeholder="Enter of number of coins"/>
                </div>
                
                <div>=</div>
                <div :class="coin_error ? 'text-red-500':''" class=""> {{ amount }}</div>
            </form>

            <button @click="buyCoinsNow" :disabled="coin_error || loading_purchase || coins_input == ''" type="button" class="btn bg-app_green text-white w-fit self-end">
                <span v-if="loading_purchase" class="flex flex-row items-center gap-4"><span>loading...</span> <SpinnerComponent/></span>
                <span v-else><i class="bi bi-cash-stack mr-3"></i> Pay</span>
            </button>
        </div>
        <div class="font-bold p-3 border rounded-lg text-green-700 bg-white mt-12">
            <i class="bi bi-receipt mr-3"></i>Your Transactions
        </div>

        <div class="border rounded-lg flex flex-col gap-3 p-3  px-8 mt-1 bg-white">
            <h2 class="font-bold text-lg mt-3">Top-ups</h2>
            
            <div v-for="items in wallet_transactions.slice(0, 3)" class="flex flex-row justify-between">
                <span class="">₦{{ items.amount.toLocaleString() }}</span>
                <span :class="items.status == 'successful'?'text-green-600':'text-gray-500'">{{ items.status }}</span>
                <span>{{ readableDate(items.date) }}</span>
            </div>
            
        </div>
        <div class="border rounded-lg flex flex-col gap-3 p-3  px-8 mt-1 bg-white">
            <h2 class="font-bold text-lg mt-3">Debits</h2>
            <div v-for="items in wallet_debit_transactions.slice(0, 3)" class="flex flex-row justify-between">
                <!-- <span class="">₦{{ items.amount.toLocaleString() }}</span> -->
                <span class="flex flex-row gap-1 justify-center items-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.35086" y="1.23758" width="15.5253" height="15.5253" rx="7.76267" stroke="#6A6A6A" stroke-width="1.36187"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5828 8.96282C13.5828 11.4108 11.5815 13.3954 9.11269 13.3954C8.44858 13.3954 7.8183 13.2518 7.2517 12.9942C7.19879 12.9701 7.13944 12.9635 7.08291 12.9771L5.43231 13.3721C5.24626 13.4167 5.07989 13.2468 5.12828 13.0617L5.48203 11.7087C5.50147 11.6343 5.48573 11.5554 5.44156 11.4925C4.93788 10.7751 4.64258 9.90318 4.64258 8.96282C4.64258 6.51479 6.64391 4.53027 9.11269 4.53027C11.5815 4.53027 13.5828 6.51479 13.5828 8.96282ZM10.2325 7.67603C10.3319 7.73823 10.4778 7.71076 10.5343 7.60804L10.7541 7.20786C10.8171 7.0931 10.7827 6.94834 10.669 6.88352C10.4882 6.78049 10.2869 6.68886 10.0653 6.60861C9.75977 6.49322 9.4252 6.43552 9.06153 6.43552C8.79969 6.43552 8.55482 6.47158 8.32692 6.5437C8.09902 6.61102 7.89778 6.71199 7.72322 6.84662C7.55351 6.98125 7.42017 7.14953 7.32319 7.35148C7.22621 7.55342 7.17772 7.78421 7.17772 8.04386C7.17772 8.24099 7.20681 8.41168 7.265 8.55593C7.32804 8.70017 7.42017 8.82519 7.54139 8.93097C7.66261 9.03675 7.81293 9.13051 7.99234 9.21224C8.1766 9.28918 8.39238 9.3613 8.63967 9.42861C8.84333 9.4815 9.02759 9.53199 9.19245 9.58007C9.35731 9.62815 9.49793 9.68104 9.61431 9.73874C9.73068 9.79644 9.82039 9.86375 9.88342 9.94068C9.94646 10.0176 9.97798 10.1138 9.97798 10.2292C9.97798 10.5802 9.70159 10.7557 9.14881 10.7557C8.95 10.7557 8.75605 10.7316 8.56694 10.6835C8.37783 10.6355 8.20569 10.5778 8.05053 10.5105C7.89536 10.4383 7.75959 10.3686 7.64322 10.3013C7.52229 10.2231 7.3432 10.2583 7.27707 10.3862L7.06827 10.7902C7.01012 10.9026 7.04345 11.0417 7.15162 11.1075C7.40459 11.2614 7.68241 11.3846 7.98507 11.4769C8.36328 11.5923 8.74635 11.65 9.13426 11.65C9.38641 11.65 9.62885 11.6236 9.8616 11.5707C10.0944 11.513 10.298 11.424 10.4726 11.3038C10.6471 11.1836 10.7853 11.0273 10.8872 10.835C10.9938 10.6379 11.0472 10.4023 11.0472 10.1282C11.0472 9.8926 11.0084 9.69547 10.9308 9.5368C10.8532 9.37332 10.7417 9.23388 10.5962 9.11848C10.4556 9.00309 10.281 8.90692 10.0725 8.82999C9.86888 8.75306 9.64098 8.68094 9.38883 8.61363C9.19487 8.56554 9.02274 8.51987 8.87242 8.47659C8.72695 8.43332 8.60573 8.38524 8.50875 8.33235C8.41177 8.27946 8.33661 8.21935 8.28327 8.15204C8.23479 8.07992 8.21054 7.99097 8.21054 7.88519C8.21054 7.70247 8.27843 7.56063 8.4142 7.45966C8.54997 7.35869 8.75605 7.3082 9.03243 7.3082C9.1876 7.3082 9.34034 7.32744 9.49066 7.3659C9.64098 7.40437 9.77917 7.45245 9.90524 7.51015C10.0362 7.56304 10.1453 7.61833 10.2325 7.67603Z" fill="#6A6A6A"/>
                    </svg>
                    <span class="">-{{ items.coin_amount }}</span>
                </span>
                <span>{{ items.narration }}</span>
                <span>{{ readableDate(items.date) }}</span>
            </div>
            
        </div>

       <!--  <div class="flex flex-row py-4 mt-3 items-center text-lg gap-5">
            <input type="number" v-model="coins_input" class="border-b p-3 outline bo" placeholder="Enter of number of coins"/>
            <div>=</div>
            <div>₦{{  }}</div>
        </div> -->
    </div>
</template>

<script>
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { format, formatDate } from 'date-fns';


    export default {
        name: "UpgradeView",
        components:{
            SpinnerComponent,
        },
        data(){
            return{
                default_coins: [10, 15, 20, 30, 50, 100, 150, 200],
                coins_input: '',
                amount: '',
                coin_error: false,

                loading_purchase: false,
                user: null,

                payment_status: '',
                payment_success: null,

                wallet_transactions: [],
                wallet_debit_transactions: [],
                format,
            }
        },

        methods: {
            readableDate(dateString){
                return format(new Date(dateString), 'dd/mm/yyyy');
            },

            paymentAmount(no_of_coins){
                return (0.5 * (no_of_coins / 10) + 0.5) * 1000
            },

            variablePaymentAmount(no_of_coins){
                if(no_of_coins < 5){
                    this.amount = 'sorry minimum coin amount is 5';
                    this.coin_error = true;
                } else {
                    this.coin_error = false;
                    this.amount =  `₦ ${((0.5 * (no_of_coins / 10) + 0.5) * 1000).toLocaleString()}`;
                }
                // this.amount =  `₦ ${((0.5 * (no_of_coins / 10) + 0.5) * 1000).toLocaleString()}`;
            },


            async buyCoinsNow(){
                try{
                    this.loading_purchase = true;
                    const response = await axios.post("/user/buy_coins", { no_of_coins: this.coins_input });
                    console.log(response);
                    window.location.href = response.data.payment_url;
                    this.loading_purchase = false;
                }catch(error){
                    console.log("error buying coins: ", error);
                    this.loading_purchase = false;
                }
            },

            
            async getUserDetails(){
                try{
                    const response = await axios.get('/user');
                    this.user = response.data.user;
                    this.user.credits = response.data.credits;
                    // console.log("user from subscriptioin page :", response);
                }catch(error){
                    this.authenticated = false;
                    if(error.response.status == 401){
                        this.unauthorized = true;
                        // alert('session expired please login!');
                    };

                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                }
            },

            async checkPaymentStatus(){
                try{
                    const response = await axios.get(`/user/coin_purchase/${this.$route.query.payment_reference}/status`);
                    console.log("payment status: ", response);
                    this.payment_success = true;
                }catch(error){
                    console.log("error with checking payment status: ", error);
                    this.payment_success = false;
                }
            },

            async getUserWallet(){
                try{
                    const response = await axios.get("/user/wallet");
                    this.wallet_transactions = response.data.wallet.transactions;
                    this.wallet_debit_transactions = response.data.wallet.debit_transactions;
                }catch(error){
                    console.log("error getting user wallet: ", error)
                }
            }
        },
        created(){
            this.getUserDetails();
            this.getUserWallet();
        },

        mounted(){
            if(this.$route.query.payment_reference){
                this.checkPaymentStatus();
            }
        }
    }
</script>

<style scoped>
.pricing_list{
    @apply flex flex-row justify-between text-gray-500 text-lg bg-gray-50 p-3 flex-wrap
}
</style>