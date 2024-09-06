<template>
    <div>

          <!-- TOP SELLING DIVIDER -->
          <div class="divider">
            <div class="divider-item">
                <i class="bi bi-person-plus-fill"></i>
                <span>Your Shop</span>
            </div>
        </div>


         <!-- SHOP DETAIL BANNER -->
         <div v-if="shop" class=" m-3 bg-app_gree border rounded-3xl p-5 flex flex-row items-end justify-between gap-5 flex-wrap " :class="isAllowed ? 'border-app_green border':''">
            <div class="flex flex-row justify-between gap-3 w-full" >
                <div class=" min-w-28 w-28 h-28 relative rounded-full border border-gray-300 overflow-hidden">
                    <img :src="shop.profile.image_url" alt="Product Photo" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-row flex-wrap gap-3 justify-between border-green-30 w-full">
                    <div class="flex flex-col">
                        <RouterLink :to="`/shops/${shop.name}`">
                            <span class="text-xl font-bold">{{ shop.name }}</span>
                        </RouterLink>
                        <Rating v-model="value" disabled />
                        <span class="text-md">{{ shop.category }}</span>
                        <span class="text-sm">Joined {{ formatDistanceToNow(shop.createdAt) }} ago | {{ shop.followers.length }} followers</span>
                    </div>

                    <!-- display action buttons only when current user is not shop owner -->
                    <div v-if="!isAllowed()" class="hidden md:flex flex-row gap-3 flex-wrap border-red-30 items-center justify-center self-end">
                        <button @click="followShop(shop._id)" class=" text-sm border hover:border-gray-300 hover:bg-slate-100 rounded-full p-3 px-8 text-black font-medium"> 
                            <span v-if="!shop.followers.includes(user)"><i class="bi bi-plus mr-1"></i>follow</span>
                            <span v-else>following</span>
                        </button>

                        <button class="rounded-full h-10 w-10 hover:bg-slate-100 text-xl">
                                <i class="bi bi-telephone-fill"></i>
                        </button>
                        <button class="rounded-full h-10 w-10 hover:bg-slate-100 text-2xl">
                            <i class="bi bi-whatsapp"></i>
                        </button>
                    </div>
                    <div v-else class=" h-full hidden md:flex justify-center items-center relative hover:left-1">
                        <RouterLink :to="`/shops/${shop.name}`">
                            <button>
                                <i class="bi bi-arrow-right-circle-fill text-2xl text-app_green"></i>
                            </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>



        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-person-plus-fill"></i>
                <span>Boosted</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
                <!-- <ShopCard v-for="product in 5"/> -->
                <div class="w-full h-[200px] flex flex-col gap-3 justify-center items-center">
                    <img src="../assets/images/no-products.png" class=" !size-52">
                    <p>Nothing to show in this category</p>
                </div>
        </div>

        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="black"/>
                </svg>
                <span>Following</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
            <!-- <ShopCard v-for="product in 5"/> -->
            <div class="w-full h-[200px] flex flex-col gap-3 justify-center items-center">
                <img src="../assets/images/no-products.png" class=" !size-52">
                <p>Nothing to show in this category</p>
            </div>
        </div>

        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-cursor-fill"></i>
                <span>Visited previously</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
            <!-- <ShopCard v-for="product in 5"/> -->
            <div class="w-full h-[200px] flex flex-col gap-3 justify-center items-center">
                <img src="../assets/images/no-products.png" class=" !size-52">
                <p>Nothing to show in this category</p>
            </div>
        </div>


         <!-- TOP SELLING DIVIDER -->
         <div class="divider">
            <div class="divider-item">
                <i class="bi bi-cursor-fill"></i>
                <span>Top Rated Shops</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
            <!-- <ShopCard v-for="product in 5"/> -->
            <div class="w-full h-[200px] flex flex-col gap-3 justify-center items-center">
                <img src="../assets/images/no-products.png" class=" !size-52">
                <p>Nothing to show in this category</p>
            </div>
        </div>


        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-cursor-fill"></i>
                <span>Shops Near you</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
            <!-- <ShopCard v-for="product in 5"/> -->
            <div class="w-full h-[200px] flex flex-col gap-3 justify-center items-center">
                <img src="../assets/images/no-products.png" class=" !size-52">
                <p>Nothing to show in this category</p>
            </div>
        </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageTitle'
import ShopCard from '../components/ShopCard'

import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Rating from 'primevue/rating';


    export default {
        name: "ShopListView",
        components:{
            PageTitle,
            ShopCard,
            Rating
        },
        data(){
            return{
                shop: '',
                shop_list: '',
                formatDistanceToNow,
                value: 4,
            }
        },

        methods: {

            isAllowed(){
                const user = localStorage.getItem('user');
                return user == this.shop.owner;
            },


            async getUserDetails(){
                try{
                    this.authenticated = true;
                    const response = await axios.get('/user');
                    // this.user.username = response.data.user.username;
                    // this.user.email = response.data.user.email;
                    // this.user.phone = response.data.user.phone;
                    this.user = response.data.user;
                    
                    if(this.user.location){
                        this.location = this.user.location
                    }
                    if(this.user.profile.socials){
                        this.socials = this.user.profile.socials;
                    }
                    if(this.user.shop.name){
                        this.shop = this.user.shop;
                    };

                    console.log("user :", response);
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
        },
        created(){
            this.getUserDetails();
        }
    }
</script>

<style scoped>

</style>