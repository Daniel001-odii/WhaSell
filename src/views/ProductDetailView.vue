<template>

    <!-- PRODUCT DETAIL DIALOG -->
   <Dialog v-model:visible="show_full_description" modal header="Product Description" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div>
            {{ product.description }}
        </div>
    </Dialog>


    <FullPageModal v-show="unauthorized_action">
        <div class="flex flex-col gap-3">
            <p class="text-gray-400">my guy!</p>
            <span class="text-2xl">You need to be logged in to perform that action :)</span>
        </div>

        <div class="flex flex-row gap-3 w-full">
            <button @click="unauthorized_action = !unauthorized_action" class="btn p-3 px-6 bg-gray-200  rounded-md w-full mt-3">cancel</button>
            <RouterLink to="/login" class="w-full">
                <button class="btn p-3 px-6 bg-app_green text-white rounded-md w-full mt-3">Login</button>
            </RouterLink>
        </div>
       
    </FullPageModal>

    <!-- {{ product }} -->

    <div class="container mx-auto p-3">

    <!-- ERROR GETTING PRODUCT DETAILS -->
    <div v-if="error_getting_product" class=" h-64 items-center flex flex-col justify-center text-gray-400 text-2xl">
        <span><i class="bi bi-info-circle-fill"></i></span>
        <p class="">error getting product..</p>
    </div>

    <!-- PAGE LOADING SKELETON -->
    <div v-if="loading" class="m-3">
        <Skeleton width="100%" borderRadius="20px" height="120px"></Skeleton>
        <div class="flex flex-col md:flex-row gap-5 mt-8 flex-wrap">
            <div class="flex flex-col gap-3 justify-center items-start">
                <Skeleton width="450px" borderRadius="10px" height="250px"></Skeleton>
                <div class="flex flex-row gap-3 mt-3">
                    <Skeleton width="100px" borderRadius="10px" height="80px"></Skeleton>
                    <Skeleton width="100px" borderRadius="10px" height="80px"></Skeleton>
                    <Skeleton width="100px" borderRadius="10px" height="80px"></Skeleton>
                </div>
            </div>
      
            <div class="w-full md:w-[50%] flex flex-col gap-3">
                <Skeleton width="100%" borderRadius="10px" height="40px"></Skeleton>
                <Skeleton width="30%" borderRadius="10px" height="40px"></Skeleton>
                <Skeleton width="45%" borderRadius="10px" height="45px"></Skeleton>
                <Skeleton width="40%" borderRadius="10px" height="35px"></Skeleton>
                <Skeleton width="100%" borderRadius="10px" height="25px"></Skeleton>
                <Skeleton width="100%" borderRadius="10px" height="60px"></Skeleton>
            </div>
        </div>
    </div>


    <!-- PRODUCT DETAILS -->
    <div v-else class="flex md:flex-col flex-col-reverse">
        <!-- {{ product.shop }} -->
        <!-- SHOP DETAIL BANNER -->
        <div class=" m-3 bg-app_gree border rounded-3xl p-5 flex flex-row items-end justify-between gap-5 flex-wrap " :class="isAllowed ? 'border-app_green border':''">
            <div v-if="shop" class="flex flex-row justify-between gap-3 w-full" >
                <div class="rounded-full w-20 h-20 min-w-20 bg-gray-100 flex justify-center items-center text-gray-200 text-3xl">
                    <i class="bi bi-shop"></i>
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


        <!-- FULL PRODUCT DESRIPTION AND DETAILS -->
        <div class="flex flex-col md:flex-row gap-5 mt-8 flex-wra p-5" v-if="product">
               <!-- {{  main_image }} -->
            <div class="flex flex-col gap-3 md:w-[50%] ">
                <div :style="`background-image: url('${main_image}'); background-size: contain;`" class="full-image w-full h-[400px] rounded-md flex justify-center items-center bg-gray-100">
                    <!-- <img :src="`http://localhost:8000/${product.images[0]}`" class="max-h-[400px]"> -->
                </div>
                <div class="flex flex-row gap-3">
                    <!-- image: {{ product.images }}<br/>
                    main: {{ main_image }} -->
                    <!-- <div @click="viewImage(image)" class=" w-20 h-20 bg-gray-100 overflow-hidden p-1 border-2 hover:border-app_green rounded-lg cursor-pointer" v-for="image in product.images">  -->
                        <img @click="viewImage(image)" v-for="image in product.images" :src="`${this.$app_url}/${image}`" class=" rounded-md w-20 h-20 cursor-pointer">
                         <!-- <div class="h-full w-full bg-red-500 rounded-md" :style="`background-image: url('${main_image}')`">{{ image }}</div> -->
                    <!-- </div> -->
                </div>
            </div>
            
            <div class="flex flex-col md:w-[50%]">
                <span class="bg-app_light_green px-3 py-1 text-green-700 text-2xl font-semibold w-fit">{{ product.name }}</span>
                <span class="px-3 py-2 mt-2 text-orange-600 bg-orange-100 w-fit rounded-md text-sm">
                    <i class="bi bi-stars"></i>
                    {{ product.condition }}
                </span>
                <span class="text-3xl font-bold mt-3">NGN {{ product.price.toLocaleString() }}</span>

                <div class="flex flex-col gap-2 mt-5">
                    <div class="flex flex-row justify-between">
                        <p class="font-bold text-xl">Product Description</p>
                        <button @click="show_full_description = true">
                            <i class="bi bi-arrows-fullscreen"></i>
                        </button>
                       
                    </div>
                    
                    <div>{{ product.description }}</div>
                    <div class="flex flex-row gap-4 flew-wrap text-sm text-gray-400">
                        <span><i class="bi bi-tag mr-1"></i>{{ product.category }}</span>
                        <span v-if="shop.location"><i class="bi bi-geo-alt mr-1"></i>{{ product.shop.location }}</span>
                        <span><i class="bi bi-eye mr-1"></i>{{ product.views }} views</span>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="bg-app_green hover:bg-opacity-90 text-white w-full rounded-lg p-3 text-lg font-semibold">Buy now</button>
                </div>
            </div>
        </div>
    </div>

<!-- SAFETY TIPS---- -->
    <div class="mt-5 flex flex-col justify-start items-start md:flex-row md:items-center md:justify-center gap-8 px-10 py-6 bg-blue-100 text-blue-600 w-fit mx-auto my-0 rounded-xl p">
        <div class="bg-blue-600 text-white p-3 rounded-md font-bold">
            <i class="bi bi-shield-check"></i>
            Safety Tips
        </div>
        <div class="flex flex-col`">
            <ol class=" ">
                <li>Avoid paying in advance, even if it's delivery</li>
                <li>Meet the seller at a safe public place</li>
                <li>Inspect the item and ensure it’s exactly what you ordered</li>
                <li>Make sure that the packed item is what you’ve inspected</li>
                <li>Only pay if you’re satisfied!</li>
            </ol>
        </div>
    </div>
        <!-- SIMILAR ITEMS YOU MAY LIKE -->
         <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3">
                <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="black"/>
                </svg>
                <span class="text-xl font-bold">Similar Items you may like</span>
            </div>
        </div>

        <!-- PRODUCT DISPLAY FOR SIMILAR ITEMS -->
        <!-- PRODCUT DISPLAY AREA -->
        <div class="masonry">
            <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

import axios from 'axios';

import {  formatJoinedDate } from '../utils/dateUtil'

import { formatDistanceToNow } from 'date-fns'

import FullPageModal from '../components/FullPageModal.vue'

import Skeleton from 'primevue/skeleton'
import Dialog from 'primevue/dialog';
import Rating from 'primevue/rating';


    export default {
        name: "ProductDetailView",
        components: {
            ProductCard,
            Skeleton,
            FullPageModal,
            Dialog,
            Rating
        },
        data(){
            return{
                product: '',
                shop: '',
                loading: false,
                main_image: '',

                user: '',
                unauthorized_action: false,
                formatDistanceToNow,
                show_full_description: false,
                dateer: '',
                error_getting_product: false,
            }
        },
        methods:{

            viewImage(image_url){
                const url = image_url.replace(/\\/g, '/');
                this.main_image = `http://localhost:8000/${url}`;
            },


            checkUser(){
                this.user = localStorage.getItem('user');
            },

            isAllowed(){
                const user = localStorage.getItem('user');
                return user == this.shop.owner;
            },

            checkShopFollower(){
                const isFollowing = this.shop.followers.includes(this.user);
                return isFollowing
            },

            async getShopById(shop_id){
                try{
                    const response = await axios.get(`/shops/${shop_id}`);

                    this.shop = response.data.shop;
                }catch(error){
                    console.log("error getting shop..", error)
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error'
                    })
                }
            },  


            async getProduct(){
                try{   
                    this.loading = true;
                    const response = await axios.get(`/products/${this.$route.params.product_id}`);
                    this.product = response.data.product;
                    // this.shop = response.data.product.shop;

                    // get the shop for the product...
                    this.getShopById(this.product.shop);

                    this.main_image = `${this.$app_url}/${this.product.images[0].replace(/\\/g, '/')}`;
                    this.loading = false;
                    console.log(this.product)
                }catch(error){
                    console.log('error getting product details: ', error);
                    this.loading = false;
                    this.error_getting_product = true;
                }
            },


            async followShop(shop_id){
                try {
                    const response = await axios.post(`/shops/${shop_id}/follow`);
                    // console.log("res from follow shop: ", response)
                  
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'default',
                    });

                    this.getShopById(shop_id);
                  
                } catch (error) {
                    console.log("error folowing shop: ", error.response);
                    // if error is unauthorized display login-popup for user to sign-in..
                    if(error.response.status == 500){
                        this.unauthorized_action = true;
                        // alert("You need to be signed-in to follow a shop");
                    } else {
                        this.$toast.open({
                            message: `${error.response.data.message}`,
                            type: 'error',
                        });
                    }
                }
            },


        },

        mounted(){
            this.getProduct();
            this.checkUser();
        }
    }
</script>

<style scoped>
.full-image{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: inherit;
}

.full-image {
  transition: background-image 0.2s ease-in-out;
}

@keyframes swipeAnimation {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.full-image.swipe {
  animation: swipeAnimation 0.2s ease-in-out;
}

</style>