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
            <div class="flex flex-row justify-between gap-3 w-full" >
                <div class=" min-w-28 !w-[200px] h-28 relative rounded-xl border border-gray-300 overflow-hidden">
                    <img :src="user.shop.profile.image_url" alt="shop Photo" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-row flex-wrap gap-3 justify-between border-green-30 w-full">
                    <div class="flex flex-col" v-if="user.shop.followers">
                        <RouterLink :to="`/shops/${user.shop.name}`">
                            <span class="text-xl font-bold">{{ user.shop.name }}</span>
                        </RouterLink>
                        <Rating v-model="value" disabled />
                        <span class="text-md">{{ user.shop.category }}</span>
                        <span class="text-sm">Joined {{ formatDistanceToNow(user.shop.createdAt) }} ago | {{ user.shop.followers.length }} followers</span>
                    </div>

                   
                </div>
            </div>
        </div>



        <!-- SHOPS YOU FOLLOW -->
        <div class="divider">
            <div class="divider-item">
                <span>Shops You Follow</span>
            </div>
        </div>


        <div class="flex flex-row !flex-wrap gap-3 p-3 pb-10">
            <ShopCard v-for="(shop, index) in boosted_shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            />
        </div>


        <!-- BEST SELLING -->
        <div class="divider">
            <div class="divider-item">
                <span>Best Selling Shops</span>
            </div>
        </div>


        <div class="flex flex-row !flex-wrap gap-3 p-3 pb-10">
            <ShopCard v-for="(shop, index) in boosted_shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            />
        </div>

        <!-- BEST SELLING -->
        <div class="divider">
            <div class="divider-item">
                <span>Shops Near You</span>
            </div>
        </div>


        <div class="flex flex-row !flex-wrap gap-3 p-3 pb-10">
            <ShopCard v-for="(shop, index) in boosted_shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            />
        </div>

        <!-- BEST SELLING -->
        <div class="divider">
            <div class="divider-item">
                <span>Shops Near You</span>
            </div>
        </div>


        <div class="flex flex-row !flex-wrap gap-3 p-3 pb-10">
            <ShopCard v-for="(shop, index) in boosted_shops"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            />
        </div>


         <!-- BOOSTED SHOPS -->
         <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3 text-[#00C1F6] justify-center">
                <i class="bi bi-rocket-takeoff-fill"></i>
                <span class="text-xl font-bold ">Boosted Shops</span>
            </div>
        </div>
        <div class="flex flex-row !flex-wrap gap-3 pb-10 p-5">
         <div v-for="shop in 2" class="flex flex-1 relative min-w-[300px] h-fit bg-gray-50 rounded-lg flex-col overflow-hidden">
            <div class=" h-[200px] lg:h-[300px] w-full relative bg-green-100" style="background-position: center; background-repeat: no-repeat; background-size: cover;">
                <span class="absolute right-6 top-4 rounded-full size-[40px] flex justify-center items-center text-white bg-[#00C1F6]">
                    <i class="bi bi-rocket-takeoff-fill"></i>
                </span>
            </div>
            <div class=" h-[30%] w-full p-8">
                <p class="font-bold text-lg">Shop name here</p>
                <p class=" text-gray-400">category</p>
                <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6">Shop Now</button>
            </div>
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

                state: null,
                error: null,

                shops_near_me: [],
                getting_nearby_shops: false,

                boosted_shops: [],
                user: '',
            }
        },

        methods: {

            async getBoostedShops(){
                try{
                    const response = await axios.get(`/shops/boosted/all`);
                    this.boosted_shops = response.data.shops;
                    console.log("boosted shops: ", this.boosted_shops)
                }catch(error){
                    console.log(error);
                }
            },

            async getShopsNearMe(current_state){
                try{
                    this.getting_nearby_shops = true;
                    const response = await axios.get(`/shops/near_me/${current_state}/all`);
                    this.shops_near_me = response.data.nearby_stores;
                    // console.log("shops near me: ", response);
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
                const apiKey = 'e99cb79bd180409b8eed5d463de070d1'; // Replace with your OpenCage API key
                const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

               /*  const getttt = async()=>{
                    try{
                        const response = await axios.get(apiUrl);
                        if(response.data.result && response.data.results.length > 0){
                                // Extract the state from the result
                                this.state = data.results[0].components.state;

                                // call request from backend..
                                this.getShopsNearMe(this.state);
                            } else {
                            this.error = "Unable to retrieve state information.";
                        }
                    }catch(error){
                        console.error('Error:', error);
                        this.error = "An error occurred while fetching location details.";
                    }
                    
                }; */
                const getttt =()=>{
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                        if (data.results && data.results.length > 0) {
                            // Extract the state from the result
                            this.state = data.results[0].components.state;

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
            // get user's location..
            // this.getLocation();
        }
    }
</script>

<style scoped>

</style>