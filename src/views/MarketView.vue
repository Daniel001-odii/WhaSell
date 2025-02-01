<template>
 
 <!-- <SearchComponent apiEndpoint="/products/search/product" resultsPage="/search-results" /> -->
    <NavbarView/>
        <!-- <div class=" flex mt-6 h-screen max-h-[700px] w-full bg-green-800 justify-start p-12 text-left items-center text-white rounded-xl rounded-b-[10%]" style="clip-path: ellipse(98% 98% at 50% 0%); background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);"> -->
       <!--  <div class=" flex mt-6 h-screen max-h-[700px] w-full bg-green-800 justify-start p-12 text-left items-center text-white rounded-xl" style=" background: linear-gradient(135deg, #1F633D 0%, #16492D 46.219%, #FFBD00 100%);">
            <div class="flex flex-col gap-5">
                <h1 class="text-5xl font-bold">We bring local Shopping<br/> to your door step</h1>
                <p class="text-xl">Buy with ease, sell to a larger audience, all from the comfort of our home</p>
                <button class=" bg-app_green w-fit btn">Shop now</button>
            </div>
        </div> -->
<div class=" p-8">
        <!-- HERO CAROUSEL -->
         <div class=" mt-6 w-[95%] mx-auto">
            <Carousel 
            :plugins="[plugin]"
            @mouseenter="plugin.stop"
            @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')];"
            v-slot="{ canScrollNext }" class="relative ">
                <CarouselContent>
                    <CarouselItem v-for="(image, index) in images" :key="index">
                        <div
                            class="p-12 h-[300px] flex justify-center items-center text-center bg-white rounded-lg"
                            style="background-position: center; background-size: contain;"
                            :style="`background: url('${image}')`"
                        >
                            <div>
                                <div class=" flex flex-col gap-2 justify-center items-center">
                                    <p v-if="index == 0" class="text-4xl">Get the best product deals<br/> From Stores near you!</p>
                                    <p v-if="index == 1"  class="text-4xl">Check out the best deals<br/> From Vendors across Nigeria</p>
                                    <p v-if="index == 2"  class="text-4xl">Exclusive Discounts<br/> From Stores across Nigeria</p>
            
                                </div>
                         
                            </div>
                        </div>
                        </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext v-if="canScrollNext" />
            </Carousel>
        </div> 


         <!-- EPXLORE OUR CATEGORIES -->
         <div class="divider">
            <div class="divider-item">
                <i class="bi bi-grid"></i>
                <span>Explore Our Categories</span>
            </div>
        </div>

        <Carousel
                class=" relative w-[95%] mx-auto"
                :opts="{
                align: 'start',
                }"
            >
            <CarouselContent>
                <!-- class="md:basis-1/2 lg:basis-1/3"> -->
            <CarouselItem v-for="(item, index) in categories" :key="index" 
             class="md:basis-1/2 lg:basis-1/3">
                <RouterLink :to="`/categories/${item.category}`">
                    <div :style="item?.firstImage ? `background: url('${item?.firstImage[0]}')`:`background: url(${require('../assets/images/logo/whatsell_gray.png')}); background-size: contain;`" class=" category relative overflow-hidden text-white w-auto min-h-[220px] rounded-lg flex flex-col items-center justify-start p-5 text-center bg-gray-400 bg-opacity-10">
                        <div class=" absolute h-full w-full bg-black bg-opacity-40 top-0"></div>
                        <span class=" z-10">{{ item.category }}</span>
                    </div>
                </RouterLink>
            </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        
        <!-- BEST DEALS FOR YOU TODAY -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-stars"></i>
                <span>Best Deals for you today</span>
            </div>
        </div>
        

        <div v-if="loading_products">
            <MasonryWall 
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
        </div>

      
        <div v-if="products.length > 0">
            <MasonryWall 
            :items="products"
            :ssr-columns="1"
            :column-width="200" :gap="10">
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
        </div>
      

        <!-- SHOPS NEAR YOU -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-geo-alt-fill"></i>
                <span>Discover Shops Near your location</span>
            </div>
        </div>
        
        <!-- SHOP CARD -->
        <div class="flex flex-row gap-3 pb-10 px-5">

             <!-- LOADING SHOPS -->
             <div v-if="loading_shops" v-for="loader in 4" class=" flex flex-1 relative lg:max-w-[300px] min-w-[300px] h-[260px] bg-gray-50 rounded-lg x justify-start items-end">
                <div class="flex flex-col gap-2 p-5">
                    <Skeleton width="65px" height="65px" borderRadius="50px"></Skeleton>
                    <Skeleton width="180px" borderRadius="10px" height="20px"></Skeleton>
                    <Skeleton width="100px" borderRadius="10px" height="15px"></Skeleton>
                </div>
            </div>

            <Carousel
                class=" relative w-[95%] mx-auto"
                :opts="{
                align: 'start',
                }"
            >
            <CarouselContent>
                <!-- class="md:basis-1/2 lg:basis-1/3"> -->
            <CarouselItem v-for="(shop, index) in shops" :key="index" 
            class="md:basis-1/2 lg:basis-1/3">
                <ShopCard
                    :name="shop.name"
                    :location="`${shop?.owner?.location?.state} | ${shop?.owner?.location?.LGA}`"
                    :category="shop.category"
                    :image_url="shop.profile.image_url"
                />
            </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>


            <!-- <ShopCard v-else v-for="(shop, index) in shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            /> -->
        </div>


        <!-- BOOSTED SHOPS -->
        <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3 text-[#00C1F6] justify-center">
                <i class="bi bi-rocket-takeoff-fill"></i>
                <span class="text-2xl font-bold ">Boosted Shops</span>
            </div>
        </div>

        <div class="flex flex-row flex-wrap gap-3 pb-10">
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
            <!-- my shop is boosted{{ user_shop_is_boosted }} -->
            <div v-if=" boosted_shops.length > 0 && boosted_shops.length < 4 && user_shop_is_boosted == false" class="block md:flex p-5 py-8 text-center flex-1 bg-[#00c1f618] rounded-lg text-xl text-[#00C1F6] flex-col justify-center items-center border border-[#00C1F6]">
                <span>There are still slots available,<br/> take an available slot now. <br/> </span>

                <RouterLink v-if="user.shop" :to="`/shops/${user.shop.name}?boost_shop=true`">
                    <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6 font-bold">Boost Your Shop Now! <i class="bi bi-rocket-fill ml-3"></i></button>
                </RouterLink>

                <RouterLink v-else to="/account">
                    <button class="rounded-full bg-black text-white p-3 px-6 mt-6 font-bold">Create Your shop</button>
                </RouterLink>
            </div>
        </div>

        <div v-if=" boosted_shops.length == 0" class="p-5 py-8 text-center w-full bg-[#00c1f618] rounded-lg text-xl text-[#00C1F6]">
            <span>There are limited slots available,<br/> be the first to take an available slot. <br/> </span>

            <RouterLink v-if="user.shop" :to="`/shops/${user.shop.name}?boost_shop=true`">
                <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6 font-bold">Boost Your Shop Now! <i class="bi bi-rocket-fill ml-3"></i></button>
            </RouterLink>

            <RouterLink v-else to="/account">
                <button class="rounded-full bg-black text-white p-3 px-6 mt-6 font-bold">Create Your shop</button>
            </RouterLink>
        </div>



        <!-- SERVICES TO HLEP YOU SHOP -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-info-circle-fill"></i>
                <span>Services to help you Shop</span>
            </div>
        </div>



        <!-- FAQ SECTION -->
        <div class="flex flex-row !flex-wrap gap-3 pb-10 p-5">
            <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border">
                <div class="flex flex-col gap-3 bg-white h-[50%] p-5 w-full">
                    <span class="font-bold text-xl">Frequently Asked Questions</span>
                    <p class="mt-2 text-sm">Updates on safe Shopping in our shops</p>
                </div>
                <div class=" h-[50%] bg-yellow-400 w-full question"></div>
            </div>

            <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border">
                <div class="flex flex-col gap-3 bg-white h-[50%] p-5 w-full">
                    <span class="font-bold text-xl">Navigate WhatSell With Ease</span>
                    <p class="mt-2 text-sm">Updates how you can navigate WhatSell easily</p>
                </div>
                <div class=" h-[50%] bg-green-400 w-full coins"></div>
            </div>

            <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border">
                <div class="flex flex-col gap-3 bg-white h-[50%] p-5 w-full">
                    <span class="font-bold text-xl">Safety Tips for Secure Purchasing</span>
                    <p class="mt-2 text-sm">Get full insight on how to safely buy products on WhatSell</p>
                </div>
                <div class=" h-[50%] bg-green-800 w-full gaurd"></div>
            </div>
        </div>
</div> 
        
    <!-- </div> -->


    <TheFooter/>

    <ScrollToTop/>
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

import MasonryWall from '@yeger/vue-masonry-wall';

import Autoplay from 'embla-carousel-autoplay'

import ScrollToTop from '@/components/ScrollToTop.vue';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'


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
            MasonryWall,

            Carousel,
            CarouselContent,
            CarouselItem,
            CarouselNext,
            CarouselPrevious,

            ScrollToTop,
        },
        data() {
            return {
                images: [
                    require('../assets/images/market/download (1).png'),
                    require('../assets/images/market/download (2).png'),
                    require('../assets/images/market/download (3).png'),
                    // Add more images as needed
                ],
                plugin: 
                    Autoplay({
                        delay: 5000,
                        stopOnMouseEnter: true,
                        stopOnInteraction: false,
                    })
                ,
                Autoplay,
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
                user_shop_is_boosted: false,

                categories: [],


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
                    this.user_shop = response.data?.shop;
                    this.user_shop_is_boosted = response.data?.shop?.is_boosted;
                    this.liked_products = response.data.user?.liked_products;
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
            },

            async getAllCategories(){
                try{
                    const response = await axios.get('categories_image');
                    this.categories = response.data.data;
                    console.log("categories with image: ", response);
                }catch(error){
                    console.log("error getting categgories..");
                }
            },

            async getProductsByCategoryName(){
                try{
                    const response = await axios.get('/products/products_by_category/Office Supplies');
                    console.log('products: ', response);
                }catch(error){
                    console.log('erro getting products: ', error);
                }
            }
        },
        computed:{
            randomHeight(){
                const height = Math.floor(Math.random(40, 100) * 100);
                return height
            },

            checkShopStatus(){
                this.boosted_shops.forEach((shop)=>{
                    shop.owner == this.user._id
                    return shop
                });
            }

            
        },
        mounted(){
            // this.start();
        },

        created() {
            // this.randomHeightInPx();
            this.getUser();
            this.getAllProducts();
            this.getAllShops();
            
            this.getBoostedShops();
            this.getAllCategories();
            
            this.getProductsByCategoryName()
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

.category{
    background-position: center !important;
    background-size: cover;
    background-repeat: no-repeat !important;
}
</style>