<template>
 
        <NavbarView/>
        <!-- <div class=" flex mt-6 h-screen max-h-[700px] w-full bg-green-800 justify-start p-12 text-left items-center text-white rounded-xl rounded-b-[10%]" style="clip-path: ellipse(98% 98% at 50% 0%); background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);"> -->
            <div class=" flex mt-6 h-screen max-h-[700px] w-full bg-green-800 justify-start p-12 text-left items-center text-white rounded-xl" style=" background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);">
            <div class="flex flex-col gap-5">
                <h1 class="text-5xl font-bold">We bring local Shopping<br/> to your door step</h1>
                <p class="text-xl">Buy with ease, sell to a larger audience, all from the comfort of our home</p>
                <button class=" bg-app_green w-fit btn">Shop now</button>
            </div>
        </div>


<div class=" p-8 bg-slate-100">
    
         <!-- BEST SELLING -->
         <div class="divider">
            <div class="divider-item">
                <span>Top Selling</span>
            </div>
        </div>
        

        <!-- PRODUCT DISPLAY AREA -->
        <div class="flex flex-row flex-wrap gap-3 w-full p-5">
            <!-- loading states -->
          <!--   <MasonryWall :items="items" :ssr-columns="1" :column-width="210" :gap="10">
                <template #default="{ item, index }">
                    <div class="flex flex-col gap-2 relative border">
                        <Skeleton class=" inline-block" width="200px" borderRadius="10px" :height="`${item + 50}px`"></Skeleton>
                        <Skeleton width="200px" borderRadius="10px" height="15px"></Skeleton>
                        <Skeleton width="200px" borderRadius="10px" height="30px"></Skeleton>
                    </div>
                </template>
            </MasonryWall> -->
           
        </div>
        <MasonryWall  v-if="loading_products"  
        :items="items" 
        :ssr-columns="1" 
        :column-width="150" 
        :gap="10">
            <template #default="{ item, index }">
                <div class="flex flex-col gap-2 rounded-3xl"
                    :style="{ height: `${item + 100}px`}"
                    style="background: url('../assets/images/whaLogo.svg');">
                        <div class="rounded-md h-[100%] bg-gray-200"></div>
                        <div class="rounded-md h-[15px] bg-gray-200"></div>
                        <div class="rounded-md h-[30px] bg-gray-200"></div>
                </div>
            </template>
        </MasonryWall>
        <MasonryWall v-else 
        :items="products"
        :ssr-columns="1"
        :column-width="150" 
        :gap="10">
            <template #default="{ item, index }">
            <ProductCard class=" -mt-[15px]"
                :id="item._id"
                :product_slug="item.slug"
                :views="item.views"
                :posted="item.createdAt"
                :product_price="item.price.toLocaleString()"
                :shop_name="item.shop.name"
                :is_liked="checkLikes(item._id)"
                @like-product="addProductToLikes(item._id)"
                :image_url="item.images[0]"
            >
           </ProductCard> 
            </template>
        </MasonryWall>


        <!-- TRYING MASONRY -->
        <!-- <div class="flex flex-col gap-2" v-for="loader in 6">
            <Skeleton width="200px" borderRadius="10px" height="100px"></Skeleton>
            <Skeleton width="200px" borderRadius="10px" height="15px"></Skeleton>
            <Skeleton width="200px" borderRadius="10px" height="30px"></Skeleton>
        </div> -->
         
       
      

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
            
            <!-- <Carousel v-bind="carouselConfig">
                <Slide v-for="slide in 10" :key="slide">
                <div class="carousel__item">{{ slide }}</div>
                </Slide>

                <template #addons>
                <Navigation />
                <Pagination />
                </template>
            </Carousel> -->
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
import MasonryLayout from '@/components/MasonryLayout.vue';

import MasonryWall from '@yeger/vue-masonry-wall';

import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


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
            MasonryLayout,
            MasonryWall,
            Carousel,
            Slide,
            Pagination,
            Navigation,
        },
        data() {
            return {
                carouselConfig: {
                    itemsToShow: 2.5,
                    wrapAround: true
                },
                items: [50, 75, 75, 100, 50, 50, 75, 150, 125, 175, 50, 100, 125],
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