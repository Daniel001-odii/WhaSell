<template>
    <div>
        <div class="w-full text-center text-gray-400">
            <p v-if="state">You are in: {{ state }}</p>
            <p v-if="error">{{ error }}</p>
        </div>


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

        <div class="p-3 flex flex-row overflow-x-auto justify-start items-end gap-3">
            <ShopCard v-for="(shop, index) in boosted_shops"
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
        </div

       
        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-cursor-fill"></i>
                <span>Shops Near you</span>
            </div>
        </div>


         <!-- SHOPS DISPLAY AREA -->
        <div v-if="getting_nearby_shops" class="w-full text-center p-3">getting nearby shops...</div>
        <div v-else class="p-3 flex flex-row overflow-x-auto justify-start items-end">
         <!-- {{ shops }} -->
            <ShopCard v-for="(shop, index) in shops_near_me"
                :name="shop.name"
                :category="shop.category"
                :image_url="shop.profile.image_url"
            >
            <template #badge>
                <span v-if="shop.badge == 'top-seller'" class="rounded-full status-tag bg-red-500 text-white px-3 p-1 text-[12px] flex flex-row w-fit items-center">
                    <svg width="15" height="15" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="white"/>
                    </svg>
                   {{ shop.badge }}
                </span>
                
            </template>
            </ShopCard>
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
       <!--  <div class="divider">
            <div class="divider-item">
                <i class="bi bi-cursor-fill"></i>
                <span>Visited previously</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
            <div class="w-full h-[200px] flex flex-col gap-3 justify-center items-center">
                <img src="../assets/images/no-products.png" class=" !size-52">
                <p>Nothing to show in this category</p>
            </div>
        </div> -->


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

                    // console.log("user :", response);
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
            
            this.getBoostedShops()
            // get user's location..
            // this.getLocation();
        }
    }
</script>

<style scoped>

</style>