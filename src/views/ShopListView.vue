<template>
    <div class="p-5">
        <div class="w-full text-center text-gray-400">
            <p v-if="state">You are in: {{ state }}</p>
            <p v-if="error">{{ error }}</p>
        </div>


          <!-- TOP SELLING DIVIDER -->
          <div v-if="user.account_type == 'seller' && shop" class="divider">
            <div class="divider-item">
                <span>Your Shop</span>
            </div>
        </div>


         <!-- SHOP DETAIL BANNER -->
          <!-- {{ user }} -->
         <div v-if="user.account_type == 'seller' && user.shop" class=" m-3 bg-app_gree border rounded-lg p-3 flex flex-row items-end justify-between gap-5 flex-wrap shadow-sm">
            <div class="flex flex-row items-center gap-3 w-full flex-wrap" >
                <RouterLink :to="`/shops/${user.shop.name}`">
                    <div class=" min-w-28 w-full md:!w-[200px] h-28 relative rounded-xl border border-gray-300 overflow-hidden">
                        <img :src="user.shop.profile.image_url" alt="shop Photo" class="w-full h-full object-cover">
                    </div>
                </RouterLink>
                <div class="flex flex-row flex-wrap gap-3 justify-between border-green-30">
                    <div class="flex flex-col" v-if="user.shop.followers">
                        <RouterLink :to="`/shops/${user.shop.name}`">
                            <span class="text-xl font-bold">{{ user.shop.name }}</span>
                        </RouterLink>
                        <!-- <Rating v-model="value" disabled /> -->
                        <span class="text-md">{{ user.shop.category }}</span>
                        <span class="text-sm">Joined {{ formatDistanceToNow(user.shop.createdAt) }} ago | {{ user.shop.followers.length }} followers</span>
                    </div>

                   
                </div>
            </div>
        </div>



      

        <!-- SHOPS YOU FOLLOW -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-person-fill-check"></i>
                <span>Shops You Follow</span>
            </div>
        </div>


        <div class="flex flex-row gap-3 p-3 pb-10">

            <!-- LOADING SHOPS -->
            <div v-if="this.loading_shops['followed']"  v-for="loader in 4" class=" flex flex-1 relative lg:max-w-[300px] min-w-[300px] h-[260px] bg-gray-50 rounded-lg x justify-start items-end">
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
            <CarouselItem v-for="(shop, index) in followed_shops" :key="index" 
            class="md:basis-1/2 lg:basis-1/3">
                <ShopCard
                    :name="shop.name"
                    :category="shop.category"
                    :image_url="shop.profile.image_url"
                />
            </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>

            <div class="h-[200px] justify-center items-center flex flex-col text-center w-full text-gray-500" v-if="followed_shops.length <= 0">
                <i class="bi bi-exclamation-circle-fill "></i>
                <span>You are not following any shop at the moment</span>
            </div>
        </div>


       
         <!-- BOOSTED SHOPS -->
        <div class="p-3 flex flex-row items-center mt-8 pb-4">
            <div class="flex flex-row items-center gap-3 text-[#00C1F6] justify-center">
                <i class="bi bi-rocket-takeoff-fill"></i>
                <span class="text-xl font-bold ">Boosted Shops</span>
            </div>
        </div>

        <div class="flex flex-row !flex-wrap gap-3">

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

        <div v-if="!loading_shops['boosted'] && boosted_shops.length <= 0" class="p-5 py-8 text-center w-full bg-[#00c1f618] rounded-lg text-xl text-[#00C1F6]">There are limited slots available,<br/> be the first to take an available slot. <br/> 

            <RouterLink v-if="user.shop" :to="`/shops/${user.shop.name}?boost_shop=true`">
                <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6 font-bold">Boost Your Shop Now! <i class="bi bi-rocket-fill ml-3"></i></button>
            </RouterLink>
            
            <RouterLink v-else to="/account/shop">
                <button class="rounded-full bg-black text-white p-3 px-6 mt-6 font-bold">Create Your shop</button>
            </RouterLink>
        </div>

        <!-- BEST SELLING -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-geo-alt-fill"></i>
                <span>Shops Near You</span>
            </div>
        </div>


        <div class="flex flex-row gap-3 p-3 pb-10">
            <!-- LOADING SHOPS -->
            <div v-if="loading_shops['followed']" v-for="loader in 4" class=" flex flex-1 relative lg:max-w-[300px] min-w-[300px] h-[260px] bg-gray-50 rounded-lg x justify-start items-end">
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
            <CarouselItem v-for="(shop, index) in shops_near_me" :key="index" 
            class="md:basis-1/2 lg:basis-1/3">
                <ShopCard
                    :name="shop.name"
                    :category="shop.category"
                    :image_url="shop.profile.image_url"
                />
            </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
           <!--  <ShopCard v-for="(shop, index) in all_shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            /> -->
        </div>



         <!-- BEST SELLING -->
        <div v-if="followed_shops.length > 0" class="divider">
            <div class="divider-item">
                <i class="bi bi-stars"></i>
                <span>Best Selling Shops</span>
            </div>
        </div>   

        <div class="flex flex-row gap-3 p-3 pb-10">
            <!-- LOADING SHOPS -->
            <div v-if="loading_shops['followed']" v-for="loader in 4" class=" flex flex-1 relative lg:max-w-[300px] min-w-[300px] h-[260px] bg-gray-50 rounded-lg x justify-start items-end">
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
            <CarouselItem v-for="(shop, index) in followed_shops" :key="index" 
            class="md:basis-1/2 lg:basis-1/3">
                <ShopCard
                    :name="shop.name"
                    :category="shop.category"
                    :image_url="shop.profile.image_url"
                />
            </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>
    </div>
    <TheFooter/>
</template>

<script>
import BoostedShopCard from '@/components/BoostedShopCard.vue';
import PageTitle from '@/components/PageTitle.vue'
import ShopCard from '@/components/ShopCard.vue'
import TheFooter from '@/components/TheFooter.vue';
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Rating from 'primevue/rating';
import Skeleton from 'primevue/skeleton';
import { RouterLink } from 'vue-router';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'


    export default {
        name: "ShopListView",
        components:{
            TheFooter,
            PageTitle,
            ShopCard,
            Rating,
            Skeleton,
            BoostedShopCard,

            Carousel,
            CarouselContent,
            CarouselItem,
            CarouselNext,
            CarouselPrevious,
        },
        data(){
            return{
                shop: '',
                shop_list: '',
                formatDistanceToNow,
                value: 4,

                state: null,
                error: null,

                
                getting_nearby_shops: false,

                boosted_shops: [],
                followed_shops: [],
                shops_near_me: [],

                user: '',

                loading_shops: [],
                all_shops: [],
            }
        },

        methods: {

            async getFollowedShops(){
                try{
                    this.loading_shops['followed'] = true;
                    const response = await axios.get('/shops/followed/all');
                    console.log("followed shops: ", response);
                    this.followed_shops = response.data.followed_shops;
                    this.loading_shops['followed'] = false;
                }catch(error){
                    console.log("error getting followed shops: ", error);
                    this.loading_shops['followed'] = false;
                }
            },  

            async getBoostedShops(){
                try{
                    this.loading_shops["boosted"] = true;
                    const response = await axios.get(`/shops/boosted/all`);

                   /*  setTimeout(()=>{
                        this.boosted_shops = response.data.shops;
                        this.loading_shops["boosted"] = false;
                    }, 4000) */
                    this.boosted_shops = response.data.shops;
                    console.log("boosted shops: ", this.boosted_shops);
                    this.loading_shops["boosted"] = false;
                }catch(error){
                    this.loading_shops["boosted"] = false;
                    console.log(error);
                }
            },


            async getAllShops(){
                try{
                    const response = await axios.get('/shops/list/all');
                    this.all_shops = response.data.shops;
                    console.log("all shops: ", response)
                }catch(error){
                    console.log("error getting all shops: ", error);
                }
            },

            async getShopsNearMe(current_state){
                try{
                    this.getting_nearby_shops = true;
                    const response = await axios.get(`/shops/near_me/${current_state}/all`);
                    this.shops_near_me = response.data.nearby_stores;
                    console.log("shops near me: ", response);
                    this.getting_nearby_shops = false;
                }catch(error){
                    console.log("error getting nearby states: ", error);
                    this.getting_nearby_shops = false;
                }
            },
            
            getLocation() {
                // const lat = position.coords.latitude;
                // const lon = position.coords.longitude;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
                
                } else {
                    this.error = "Geolocation is not supported by this browser.";
                }
            },

            
            showPosition(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // console.log("user lat long: ", lat, lon);
                /* if user has a stored location, check if its thesame with the current location,
                 if not call the api again,
                 else store user's new location...
                */

                const locale ={
                    lat,
                    lon
                };

                 // Use the OpenCage Geocoding API to get the location details
                const apiKey = '9c37d543078e4fbeb7d968fdb8893f2e'; // Replace with your OpenCage API key
                const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

                const getttt =()=>{
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                        if (data.results && data.results.length > 0) {
                            // Extract the state from the result
                            this.state = data.results[0].components.state;

                            console.log("got shop from geo location: ", this.state)

                            // call request from backend..
                            this.getShopsNearMe(this.state);
                        } else {
                            this.error = "Unable to retrieve state information.";
                        }
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        this.error = "An error occurred while fetching location details.";
                    });
                };

                getttt();

               /* const user_stored_lat_long = JSON.parse(localStorage.getItem('user2L'));
                if(!user_stored_lat_long){
                    localStorage.setItem("user2L", JSON.stringify(locale));
                    console.log("user locale not saved")
                    // store the new lat long and
                    // call fetch api here...
                    getttt();
                } else {
                    // if theres a stored location...check if its still thesame or close-by...
                    // console.log("users stored lat long: ", user_stored_lat_long);
                    if(user_stored_lat_long.lat != lat || user_stored_lat_long.lon != lon){
                        // user location has changed... call the fetch api
                        console.log("user locale changed!");
                        console.log("stored locale: ", user_stored_lat_long.lat, user_stored_lat_long.lon);
                        console.log("current locale: ", locale);
                        localStorage.setItem("user2L", JSON.stringify(locale));
                        getttt();
                    } else {
                         // continue with the previous saved state... user is still in same place...
                         this.getShopsNearMe(this.shop.profile.location.state);
                        console.log("user location unchanged")
                    }
                } */
    
           
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


            isAllowed(){
                const user = localStorage.getItem('user');
                return user == this.shop.owner;
            },


            async getUserDetails(){
                try{
                    this.authenticated = true;
                    const response = await axios.get('/user');
                    const user = response.data.user;
                    this.shop = user;
                    this.user = user;
                    console.log("user: ", user)
                }catch(error){
                    this.authenticated = false;
                    console.log("error getting user details: ", error)
                    if(error.response.status == 401){
                        this.unauthorized = true;
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
            
            this.getBoostedShops()
            this.getFollowedShops()
            this.getAllShops();
            
            // get user's location..
            this.getLocation();
        }
    }
</script>

<style scoped>

</style>