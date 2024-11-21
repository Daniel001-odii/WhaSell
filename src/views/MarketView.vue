<template>
    <div class="">
        <NavbarView/>
        <!-- <div class=" flex mt-6 h-screen max-h-[700px] w-full bg-green-800 justify-start p-12 text-left items-center text-white rounded-xl rounded-b-[10%]" style="clip-path: ellipse(98% 98% at 50% 0%); background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);"> -->
            <div class=" flex mt-6 h-screen max-h-[700px] w-full bg-green-800 justify-start p-12 text-left items-center text-white rounded-xl" style=" background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);">
            <div class="flex flex-col gap-5">
                <h1 class="text-5xl font-bold">We bring local Shopping<br/> to your door step</h1>
                <p class="text-xl">Buy with ease, sell to a larger audience, all from the comfort of our home</p>
                <button class=" bg-app_green w-fit btn">Shop now</button>
            </div>
        </div>



     
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

        
         
    
         <!-- BEST SELLING -->
         <div class="divider">
            <div class="divider-item">
                <span>Top Selling</span>
            </div>
        </div>

        <!-- PRODUCT DISPLAY AREA -->
        <div class="flex flex-row flex-wrap gap-3 w-full p-5">
            <!-- loading states -->
            <div class="flex flex-col gap-2" v-for="loader in 6" v-if="loading_products">
                <Skeleton width="200px" borderRadius="10px" height="100px"></Skeleton>
                <Skeleton width="200px" borderRadius="10px" height="15px"></Skeleton>
                <Skeleton width="200px" borderRadius="10px" height="30px"></Skeleton>
            </div>
            <ProductCard v-else class="" v-for="(product, index) in products" :key="index"
                :id="product._id"
                :product_slug="product.slug"
                :views="product.views"
                :posted="product.createdAt"
                :product_price="product.price.toLocaleString()"
                :shop_name="product.shop.name"
                :is_liked="checkLikes(product._id)"
                @like-product="addProductToLikes(product._id)"
                :image_url="product.images[0]"
            >
           </ProductCard> 
        </div>

      

        <!-- SHOP CARD -->
        <div class="flex flex-row gap-3 p-3 pb-10 overflow-x-auto">

             <!-- LOADING SHOPS -->
             <div v-if="loading_shops" v-for="loader in 4" class=" flex flex-1 relative lg:max-w-[300px] min-w-[300px] h-[260px] bg-gray-50 rounded-lg x justify-start items-end">
                <div class="flex flex-col gap-2 p-5">
                    <Skeleton width="65px" height="65px" borderRadius="50px"></Skeleton>
                    <Skeleton width="180px" borderRadius="10px" height="20px"></Skeleton>
                    <Skeleton width="100px" borderRadius="10px" height="15px"></Skeleton>
                </div>
            </div>

            <ShopCard v-else v-for="(shop, index) in shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            />
        </div>

        <!-- {{ user.shop }} -->

        <!-- BOOSTED SHOPS -->
        <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3 text-[#00C1F6] justify-center">
                <i class="bi bi-rocket-takeoff-fill"></i>
                <span class="text-xl font-bold ">Boosted Shops</span>
            </div>
        </div>

        <div class="flex flex-row !flex-wrap gap-3 pb-10">
             <!-- LOADING BOOSTED SHOPS -->
             <div v-if="loading_shops['boosted']"  v-for="loader in 2" class="flex flex-1 relative min-w-[300px] h-[400px] bg-gray-50 rounded-lg flex-col justify-end items-start">
                <div class="flex flex-col gap-2 p-8">
                    <Skeleton width="180px" borderRadius="10px" height="20px"></Skeleton>
                    <Skeleton width="120px" borderRadius="10px" height="20px"></Skeleton>
                    <Skeleton width="100px" borderRadius="30px" height="50px" class="mt-4"></Skeleton>
                </div>
            </div>

            <BoostedShopCard v-else v-for="shop in boosted_shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            />            
        </div>

        <div v-if=" boosted_shops.length == 0" class="p-5 py-8 text-center w-full bg-[#00c1f618] rounded-lg text-xl text-[#00C1F6]">There are limited slots available,<br/> be the first to take an available slot. <br/> 

            <RouterLink v-if="user.shop" :to="`/shops/${user.shop.name}?boost_shop=true`">
                <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6 font-bold">Boost Your Shop Now! <i class="bi bi-rocket-fill ml-3"></i></button>
            </RouterLink>

            <RouterLink v-else to="/account">
                <button class="rounded-full bg-black text-white p-3 px-6 mt-6 font-bold">Create Your shop</button>
            </RouterLink>
        </div>



          <!-- BEST SELLING -->
        <div class="divider">
            <div class="divider-item">
                <span>Services to help you Shop</span>
            </div>
        </div>



        <!-- FAQ SECTION -->
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
        
    <!-- </div> -->


    <!-- <TheFooter/> -->


</template>

<script>
import NavbarView from '../components/NavbarView.vue'
import ProductCard from '@/components/ProductCard.vue'
import ShopCard from '@/components/ShopCard.vue'
import PageTitle from '@/components/PageTitle.vue'

import axios from 'axios';
import TheFooter from '@/components/TheFooter.vue';
import { RouterLink } from 'vue-router';

import Skeleton from 'primevue/skeleton'

import BoostedShopCard from '@/components/BoostedShopCard.vue';


    export default {
        name: "MarketView",
        components: {
            NavbarView,
            ProductCard,
            ShopCard,
            PageTitle,
            TheFooter,
            Skeleton,
            BoostedShopCard,
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

                loading_products: false,
                loading_shops: false,

                boosted_shops: [],
                loading_boosted_shops: false,
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
                    this.user = response.data.user;
                    this.liked_products = response.data.user.liked_products;
                }catch(error){
                    console.log("cant get user..", error);
                }
            },



            async getBoostedShops(){
                try{
                    this.loading_boosted_shops = true;
                    const response = await axios.get(`/shops/boosted/all`);

                   /*  setTimeout(()=>{
                        this.boosted_shops = response.data.shops;
                        this.loading_shops["boosted"] = false;
                    }, 4000) */
                    this.boosted_shops = response.data.shops;
                    console.log("boosted shops: ", this.boosted_shops);
                    this.loading_boosted_shops = false;
                }catch(error){
                    this.loading_boosted_shops = false;
                    console.log(error);
                }
            },


            async getAllProducts(){
                try{
                    this.loading_products = true;
                    const response = await axios.get('/products');
                    this.products = response.data.products;
                    console.log(response);
                    this.loading_products = false;
                }catch(error){
                    console.log("error getting products..", error);
                    this.loading_products = false;
                }
            },

            async getAllShops(){
                try{
                    this.loading_shops = true;
                    const response = await axios.get('/shops/list/all');

                    this.shops = response.data.shops;
                    this.loading_shops = false;
                   
                    console.log(response);
                   
                }catch(error){
                    this.loading_shops = false;
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
            this.getBoostedShops();
            
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