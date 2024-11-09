<template>
    <div class="">
        <NavbarView/>
        <div class=" flex h-screen max-h-[700px] w-full bg-green-800 justify-start p-12 text-left items-center text-white rounded-xl rounded-b-[10%]" style="clip-path: ellipse(98% 98% at 50% 0%); background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);">
            <div class="flex flex-col gap-5">
                <h1 class="text-5xl font-bold">We bring local Shopping<br/> to your door step</h1>
                <p class="text-xl">Buy with ease, sell to a larger audience, all from the comfort of our home</p>
                <button class=" bg-app_green w-fit btn">Shop now</button>
            </div>
        </div>

       <!--  <svg xmlns="http://www.w3.org/2000/svg" width="1380" height="755" viewBox="0 0 1380 755" fill="none">
            <path d="M0 30C0 13.4315 13.4315 0 30 0H1350C1366.57 0 1380 13.4315 1380 30V683.67C1380 698.985 1368.3 711.863 1353.07 713.487C848.685 767.275 549.117 770.359 26.869 713.543C11.6717 711.889 0 699.023 0 683.736V30Z" fill="url(#paint0_linear_803_60310)"/>
            <defs>
                <linearGradient id="paint0_linear_803_60310" x1="31.0001" y1="-83.0001" x2="1761.5" y2="1166" gradientUnits="userSpaceOnUse">
                <stop stop-color="#1F633D"/>
                <stop offset="0.46219" stop-color="#16492D"/>
                <stop offset="1" stop-color="#FFBD00"/>
                </linearGradient>
            </defs>
        </svg>
        <div class="responsive-shape"></div> -->

        <!-- <div class="text-center h-[500px] flex flex-col justify-center items-center p-12 hero">
            <h1 class="font-bold text-5xl text-white">
                <span class="text-app_green">Discover </span>
                new products from shops around <span class="text-app_green">you!</span></h1>
            <div class="bg-[#E0F6EA80] rounded-full w-full mt-10 flex flex-row overflow-hidden relative max-w-[500px]">
                <input type="text" placeholder="Search anything here..." class=" bg-transparent p-3 text-white outline-none w-full pl-10 placeholder-white">
                <div class="flex flex-row gap-3 text-white absolute right-5 top-3">
                    <button>
                        <i class="bi bi-funnel"></i>
                    </button>
                    <button>
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div> -->
<!-- 
        <div>
            <button class="btn bg-red-500 text-white" @click="getLocation">Get Location</button>
            <p v-if="state">You are in: {{ state }}</p>
            <p v-if="error">{{ error }}</p>
        </div> -->

        <!-- CATEGORIES AREA -->
        <!--  <div class="flex flex-col md:flex-row gap-3 items-center justify-start md:justify-center sticky top-0 z-20 bg-white p-3">
            <div class="p-3 flex flex-row overflow-x-auto gap-2  items-start bg-white w-full md:w-[50%] overflow-auto">
                <button class="border p-2 rounded-md bg-app_light_green text-sm border-app_green text-app_green">All</button>
                <button class="border p-2 py-2 rounded-md bg-gray-100 text-sm text-app_gree" v-for="category in 6">Phones</button>
            </div>
            <div class="border rounded-full w-full md:w-[50%] flex flex-row overflow-hidden relative md:max-w-[500px]">
                <input type="text" placeholder="Search anything here..." class=" bg-transparent p-3 outline-none w-full pl-10">
                <div class="flex flex-row gap-3 absolute right-5 top-3">
                    <button>
                        <i class="bi bi-funnel"></i>
                    </button>
                    <button>
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
         </div> -->
      

        <!-- ADVERT SPACE -->
         <!-- <div class="flex flex-row gap-3 h-[400px] p-3">
            <div class="w-[50%] h-full bg-red-500 rounded-lg"></div>
            <div class="w-[50%] h-full flex flex-col gap-3">
                <div class="bg-blue-500 rounded-lg w-full h-[50%]"></div>
                <div class="bg-green-500 rounded-lg w-full h-[50%]"></div>
            </div>
         </div> -->


        <!-- <div class="bg-app_green h-60 mt-8 flex justify-center items-center text-white text-xl">
            <span>Advert Space</span>
        </div> -->
        <!-- <RouterLink to="shops/official_whatsell" >
            <img src="../assets/images/whatsell banner.png" class="mt-8"/>
        </RouterLink> -->

        <!-- TOP SELLING DIVIDER -->
        <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3">
                <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="black"/>
                </svg>
                <span class="text-xl font-bold">Top Selling </span>
            </div>
        </div>

        <!-- PRODCUT DISPLAY AREA -->
        <div class="masonry">
            <ProductCard class="masonry-item" v-for="(product, index) in products" :key="index"
                :id="product._id"
                :product_slug="product.slug"
                :views="product.views"
                :posted="product.createdAt"
                :product_price="product.price.toLocaleString()"
                :shop_name="product.shop.name"
                :is_liked="checkLikes(product._id)"
                @like-product="addProductToLikes(product._id)"
            >
                <template #product_image>
                    <img :src="product.images[0]" class=" !size-40">
                </template>
           </ProductCard> 
        </div>
                    

         <!-- NEAR YOU DIVIDER -->
         <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3">
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0.25C12.5859 0.25 15.0658 1.27723 16.8943 3.10571C18.7228 4.93419 19.75 7.41414 19.75 10C19.75 14.12 16.855 18.61 11.14 23.518C10.8222 23.791 10.4171 23.9409 9.99813 23.9405C9.5792 23.9402 9.1743 23.7895 8.857 23.516L8.479 23.188C3.017 18.408 0.25 14.028 0.25 10C0.25 7.41414 1.27723 4.93419 3.10571 3.10571C4.93419 1.27723 7.41414 0.25 10 0.25ZM10 6.25C9.00544 6.25 8.05161 6.64509 7.34835 7.34835C6.64509 8.05161 6.25 9.00544 6.25 10C6.25 10.9946 6.64509 11.9484 7.34835 12.6517C8.05161 13.3549 9.00544 13.75 10 13.75C10.9946 13.75 11.9484 13.3549 12.6517 12.6517C13.3549 11.9484 13.75 10.9946 13.75 10C13.75 9.00544 13.3549 8.05161 12.6517 7.34835C11.9484 6.64509 10.9946 6.25 10 6.25Z" fill="black"/>
                </svg>
                <span class="text-xl font-bold">Near You</span>
            </div>
        </div>


         <!-- SHOPS DISPLAY AREA -->
         <div class="p-6 flex gap-3 flex-row overflow-x-auto justify-start items-end">
            <ShopCard v-for="(shop, index) in shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            >
            <template #badge>
                <span v-if="shop.is_boosted" class="rounded-full status-tag bg-purple-200 border-2 border-purple-300 shadow-lg shadow-purple-300 text-white p-1 text-[12px] flex flex-row w-fit items-center">
                    <span class="material-symbols-outlined text-purple-500">rocket</span>
                   
                </span>
                <span v-if="shop.is_top_seller" class="rounded-full status-tag bg-red-200 border-2 border-red-300 shadow-lg shadow-red-300 text-white p-1 text-[12px] flex flex-row w-fit items-center">
                    <span class="material-symbols-outlined text-red-700">local_fire_department</span>
                </span>
                <span v-if="shop.is_trending" class="rounded-full status-tag bg-green-200 border-2 border-green-300 shadow-lg shadow-green-300 text-white p-1 text-[12px] flex flex-row w-fit items-center">
                    <span class="material-symbols-outlined text-green-700">trending_up</span>
                </span>
                <span v-if="shop.is_top_seller" class="rounded-full status-tag bg-blue-200 border-2 border-blue-300 shadow-lg shadow-blue-300 text-white p-1 text-[12px] flex flex-row w-fit items-center">
                    <span class="material-symbols-outlined text-blue-500">offline_bolt</span>
                </span>
            </template>
        </ShopCard>

        </div>

    

         <!-- TOP SELLING DIVIDER -->
         <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3">
                <span class=" font-bold text-xl">Services to help you Shop</span>
            </div>
        </div>


    <div class="flex flex-row !flex-wrap gap-3 pb-10 p-5">
            <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px]">
                <div class="flex flex-col gap-3 bg-gray-100 h-[50%] p-5 w-full">
                    <span class="font-bold text-xl">Frequently Asked Questions</span>
                    <p class="mt-2 text-sm">Updates on safe Shopping in our shops</p>
                </div>
                <div class=" h-[50%] bg-yellow-400 w-full question"></div>
            </div>

            <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px]">
                <div class="flex flex-col gap-3 bg-gray-100 h-[50%] p-5 w-full">
                    <span class="font-bold text-xl">Navigate WhatSell With Ease</span>
                    <p class="mt-2 text-sm">Updates how you can navigate WhatSell easily</p>
                </div>
                <div class=" h-[50%] bg-green-400 w-full coins"></div>
            </div>

            <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px]">
                <div class="flex flex-col gap-3 bg-gray-100 h-[50%] p-5 w-full">
                    <span class="font-bold text-xl">Safety Tips for Secure Purchasing</span>
                    <p class="mt-2 text-sm">Get full insight on how to safely buy products on WhatSell</p>
                </div>
                <div class=" h-[50%] bg-green-800 w-full gaurd"></div>
            </div>
    </div>
        
        
    </div>


    <TheFooter/>


</template>

<script>
import NavbarView from '../components/NavbarView.vue'
import ProductCard from '../components/ProductCard'
import ShopCard from '../components/ShopCard'
import PageTitle from '../components/PageTitle'

import axios from 'axios';
import TheFooter from '@/components/TheFooter.vue';


    export default {
        name: "MarketView",
        components: {
            NavbarView,
            ProductCard,
            ShopCard,
            PageTitle,
            TheFooter,
        },
        data() {
            return {
                height: 0,
                shops: [],
                products: [],
                user: '',

                liked_products: [],

                state: null,
                error: null,
            }
        },
        methods:{
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        } else {
            this.error = "Geolocation is not supported by this browser.";
        }
    },
    showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Use the OpenCage Geocoding API to get the location details
      const apiKey = 'e99cb79bd180409b8eed5d463de070d1'; // Replace with your OpenCage API key
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            // Extract the state from the result
            this.state = data.results[0].components.state;
          } else {
            this.error = "Unable to retrieve state information.";
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.error = "An error occurred while fetching location details.";
        });
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.error = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          this.error = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.error = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.error = "An unknown error occurred.";
          break;
      }
    },

            randomHeightInPx(){
                this.height = Math.floor(Math.random(40, 100) * 100);
            },

            checkLikes(product_id){
                if(this.liked_products.includes(product_id)){
                    return true;
                } else {
                    return false;
                }
            },

            async getUser(){
                try{
                    const response = await axios.get('/user');
                    console.log("found user: ", response);
                    this.liked_products = response.data.user.liked_products;
                }catch(error){
                    console.log("cant get user..", error);
                }
            },


            async getAllProducts(){
                try{
                    const response = await axios.get('/products');
                    this.products = response.data.products;
                    console.log(response)
                }catch(error){
                    console.log("error getting products..", error);
                }
            },

            async getAllShops(){
                try{
                    const response = await axios.get('/shops/list/all');
                    this.shops = response.data.shops;
                    console.log(response);
                }catch(error){
                    console.log("error getting shops: ", error);
                }
            },

            async addProductToLikes(product_id){
                try{
                    const response = await axios.post(`/products/${product_id}/like`);
                    console.log("likes: ", response);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'default',
                    });
                    this.getUser();
                    this.checkLikes(product_id);
                }catch(error){
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'default',
                    });
                }
            }
        },
        computed:{
            randomHeight(){
                const height = Math.floor(Math.random(40, 100) * 100);
                return height
            },

            
        },

        created() {
            // this.randomHeightInPx();

            this.getAllProducts();
            this.getAllShops();
            this.getUser();
        },
    }
</script>

<style scoped>
.hero{
    background: url('../assets/images/market-hero.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.question{
    background: url('../assets/images/questions_yellow.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.coins{
    background: url('../assets/images/coins_.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.gaurd{
    background: url('../assets/images/gaurd_.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}


.responsive-shape {
    width: 100%;
    padding-top: 55%; /* Controls height; adjust as needed */
    background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);
    border-top-left-radius: 50px; /* Adjust to approximate the shape */
    border-top-right-radius: 50px;
    border-bottom-left-radius: 25px; /* Simulate the curved bottom */
    border-bottom-right-radius: 25px;
    overflow: hidden;
}
</style>