<template>
    <div class="container mx-auto p-3">
        <div v-if="loading">Loading product...</div>
    <div v-else class="flex md:flex-col flex-col-reverse">
        <!-- {{ product.shop }} -->
        <!-- SHOP DETAIL BANNER -->
        <div class=" m-3 bg-app_gree border rounded-3xl p-5 flex flex-row items-end justify-between gap-5 flex-wrap ">
            <div v-if="product.shop" class="flex flex-row justify-between gap-3 w-full">
                <div class="rounded-full w-20 h-20 min-w-20 bg-gray-100 flex justify-center items-center text-gray-200 text-3xl">
                    <i class="bi bi-shop"></i>
                </div>
                <div class="flex flex-row flex-wrap gap-3 justify-between border-green-30 w-full">
                    <div class="flex flex-col">
                        <span class="text-xl font-bold">{{ product.shop.name }}</span>
                        <span class="text-md">{{ product.shop.category }}</span>
                        <span class="text-sm">Joined {{ formatDistanceToNow(product.shop.createdAt) }} ago | 2k+ followers</span>
                    </div>
                    <div class="flex flex-row gap-2 flex-wrap border-red-30 items-center self-end">
                        <button class=" text-sm border hover:border-gray-300 hover:bg-slate-100 rounded-lg p-3 px-8 text-black font-medium"> &plus; Follow</button>
                        
                        <button class="rounded-full h-10 w-10 border hover:bg-slate-100">
                            <i class="bi bi-whatsapp"></i>
                        </button>

                        <button class="rounded-full border h-10 w-10 hover:bg-slate-100">
                            <span>
                                <i class="bi bi-telephone-fill"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>


     

        <!-- FULL PRODUCT DESRIPTION AND DETAILS -->
        <div class="flex flex-col md:flex-row gap-5 mt-8 flex-wra p-5" v-if="product">
               <!-- {{  main_image }} -->
            <div :style="`background-image: url('${main_image}')`" class="full-image md:flex-1 w-full h-[400px] md:w-[400px] rounded-md flex justify-center items-center border">
                <!-- <img :src="`http://localhost:8000/${product.images[0]}`" class="max-h-[400px]"> -->
            </div>
            <div class="flex flex-col md:flex-1">
                <span class="bg-app_light_green px-3 py-1 text-green-700 text-2xl font-semibold w-fit">{{ product.name }}</span>
                <span class="px-3 py-2 mt-2 text-orange-600 bg-orange-100 w-fit rounded-md text-sm">
                    <i class="bi bi-stars"></i>
                    {{ product.condition }}
                </span>
                <span class="text-3xl font-bold mt-3">NGN {{ product.price.toLocaleString() }}</span>

                <div class="flex flex-col gap-2 mt-5">
                    <p class="font-bold text-xl">Product Description</p>
                    <div>{{ product.description }}</div>
                    <div class="flex flex-row gap-3 my-4">
                        <div @click="viewImage(image)" class=" w-20 max-h-[100px] h-auto bg-gray-100 p-3 border-2 hover:border-app_green rounded-lg cursor-pointer" v-for="image in product.images"> 
                            <img :src="`http://localhost:8000/${image}`">
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="bg-app_green hover:bg-opacity-90 text-white w-full rounded-lg p-3 text-lg font-semibold">Buy now</button>
                    <div class="flex flex-row gap-2 mt-3">
                        <button class="border border-app_green p-3 flex-1 text-app_green bg-app_light_green rounded-lg">Share</button>
                        <button class="border border-app_green p-3 flex-1 text-app_green bg-app_light_green rounded-lg flex flex-row justify-center items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80595 20.8562C8.40713 21.1313 9.06485 21.2742 9.73105 21.2745H19.2957C20.3623 21.2745 21.3937 20.9093 22.204 20.2448C23.0144 19.5803 23.5502 18.6602 23.7148 17.6505L24.8348 10.7882C24.9149 10.299 24.8835 9.79895 24.7427 9.32248C24.6018 8.84601 24.3549 8.40443 24.019 8.02811C23.683 7.6518 23.266 7.34968 22.7965 7.14255C22.3271 6.93541 21.8164 6.82818 21.2995 6.82822H15.4276V2.78936C15.4285 2.17234 15.2155 1.57251 14.8221 1.08399C14.4287 0.595477 13.8772 0.245926 13.2541 0.0901915C12.631 -0.0655432 11.9715 -0.0186481 11.3792 0.223518C10.787 0.465684 10.2953 0.889416 9.98153 1.42822L6.26551 7.78822C6.04129 8.17217 5.92363 8.60482 5.92379 9.04479V18.3739C5.92371 18.8596 6.06718 19.3354 6.33758 19.7461C6.60797 20.1569 6.99425 20.4859 7.4517 20.6951L7.80953 20.8579L7.80595 20.8562ZM1.78376 8.10194C1.5496 8.10171 1.31768 8.14571 1.10128 8.23141C0.884873 8.31712 0.688219 8.44285 0.522559 8.60142C0.356898 8.76 0.225479 8.9483 0.135815 9.15556C0.0461511 9.36283 -1.18023e-07 9.585 0 9.80937V18.5728C0 19.0261 0.187931 19.4608 0.52245 19.7813C0.85697 20.1019 1.31068 20.2819 1.78376 20.2819H2.67116C2.90842 20.2819 3.13595 20.1916 3.30371 20.0309C3.47148 19.8701 3.56573 19.6521 3.56573 19.4248V8.95737C3.56573 8.73004 3.47148 8.51202 3.30371 8.35127C3.13595 8.19053 2.90842 8.10022 2.67116 8.10022L1.78376 8.10194Z" fill="green"/>
                            </svg>
                            1k+
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- SAFETY TIPS---- -->
    <div class="flex flex-col justify-start items-start md:flex-row md:items-center md:justify-center gap-8 px-10 py-6 bg-blue-100 text-blue-600 w-fit mx-auto my-0 rounded-xl p">
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

    export default {
        name: "ProductDetailView",
        components: {
            ProductCard,
        },
        data(){
            return{
                product: '',
                loading: false,
                main_image: '',

                formatDistanceToNow,
                dateer: '',
            }
        },
        methods:{

            viewImage(image_url){
                const url = image_url.replace(/\\/g, '/');
                this.main_image = `http://localhost:8000/${url}`;
            },


            async getProduct(){
                try{   
                    this.loading = true;
                    const response = await axios.get(`/products/${this.$route.params.product_id}`);
                    this.product = response.data.product;
                    this.main_image = `http://localhost:8000/${this.product.images[0].replace(/\\/g, '/')}`;
                    this.loading = false;
                    console.log(this.product)
                }catch(error){
                    console.log('error getting product details: ', error);
                    this.loading = false;
                }
            }
        },

        mounted(){
            this.getProduct();
        }
    }
</script>

<style scoped>
.full-image{
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: inherit;
}

.full-image {
  transition: background-image 0.5s ease-in-out;
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
  animation: swipeAnimation 0.5s ease-in-out;
}

</style>