<template>

    <!-- GLIPS MODAL HERE -->
    <GlipComponent
        :glips_modal="glips_modal"
        :glips="glips"
        @close-glip="glips_modal = !glips_modal"
    />

 <!-- BOOST SHOP? MODAL -->
 <div v-if="boost_shop_modal" class="flex justify-center min-h-screen items-center fixed bg-[rgba(0,0,0,0.8)] w-full left-0 top-0 z-50 p-5">
    <div class="bg-white rounded-lg md:w-[700px] p-12 text-center flex flex-col justify-start items-center max-h-[85vh] overflow-y-auto">
        <div class=" !size-40 min-h-40 rounded-full border-4 border-[#00C1F6] relative p-2 flex justify-center items-center">
            <img :src="shop_image" class=" rounded-full h-[100%]" v-if="shop_image"/>
            <i class=" bi bi-rocket-takeoff-fill text-white absolute -bottom-0 right-0 bg-[#00C1F6] p-4 rounded-full size-12 flex justify-center items-center border-4 border-white"></i>
        </div>
        <div class=" mt-3">
            <h1 class=" text-xl">Boost <b>{{ shop.name }}</b> Shop</h1>
            <span class=" ">Proceed to select your desired timeline and make payment</span>
        </div>
        <div class=" mt-6 flex flex-row gap-6 text-left items-center bg-[#00C1F6] bg-opacity-10 text-[#00C1F6] p-4 rounded-md">
            <i class="  bi bi-rocket-takeoff-fill text-3xl"></i>
            <span>This transaction is slot-based, once all slots are booked you have to wait till a slot is available before you can boost your shop.</span>
        </div>
        <form @submit.prevent="boostShop()">
            <div class=" flex flex-row flex-wrap gap-4 justify-start items-center py-3">
                
                <button type="button" :class="shop_boost_duration == coin ? 'border-app_green text-app_green':'border-transparent bg-gray-100'" @click="shop_boost_duration = coin" v-for="coin in 7" class=" bg-opacity-15 px-12 py-3 rounded-lg  font-bold flex-1 text-nowrap border ">{{ coin }}D</button>
            </div>
            <div class=" flex flex-row justify-between items-center">
                <span>{{ shop_boost_duration }}D</span>
                <span>=</span>
                <input class=" border-b p-3 outline-none w-[85%]" placeholder="XXX" disabled :value="`${shop_boost_duration * 10} Coins`">
            </div>
            <div class=" flex flex-row gap-3 mt-12 justify-end">
                <button type="button" @click="boost_shop_modal = !boost_shop_modal" class="btn bg-gray-100">Cancel</button>
                <button class="btn bg-app_green text-white" type="submit">Boost Now</button>
            </div>
        </form>
    </div>
 </div>



    <div>
        <!-- {{ isAllowed() }} -->
        <div class="flex flex-col">
            
            
            <FullPageLoader v-if="loading"/>
            <div v-else :class=" shop.is_boosted ? 'bg-[#00C1F6]':'bg-app_green'" class=" w-full h-[200px] relative flex justify-center items-center">
                <span class=" relative text-3xl font-bold text-green-100 flex flex-col justify-center items-center ">
                    <div class=" absolute w-fit !left-0">
                        <Vue3Lottie :animation-data="Rocket" :height="200" :width="200"/>
                    </div>
                    <span class="glitch_for_boost drop-shadow-2xl"> {{ shop.category }}</span>
                </span>
                <RouterLink to="/account/shop/true">
                    <button v-if="isAllowed()"class="rounded-full border border-black bg-white bg-opacity-50 px-5 py-2 absolute bottom-5 right-5 z-40 flex justify-center items-center gap-3">
                        <span class="hidden md:flex">edit profile</span>
                        <i class="bi bi-pencil"></i>
                    </button>
                </RouterLink>
                <div class="flex flex-col gap-8 absolute top-[65%] w-full border-red-400">
                    <div class="w-full relative h-[150px] flex md:block justify-center items-center ">
                          <img :src="shop.profile.image_url" alt="Product Photo" class="rounded-full absolute md:left-[100px] size-[150px] object-cover">
                    </div>
                  

                    <div class="flex flex-col justify-start items-start md:flex-row gap-6 p-3">
                        <div v-if="shop" class="flex flex-col justify-center text-left md:w-[35%] items-center w-full md:items-start gap-3">
                            <h1 class="font-bold text-2xl">{{ shop.name }}</h1>
                            <span class="bg-app_light_green w-fit rounded-md text-app_green p-3">{{ shop.category}}</span>
                            <div class="flex flex-row justify-evenly md:justify-between w-full flex-wrap gap-3">
                                <span><i class="bi bi-people-fill text-green-800 mr-2"></i>Followers {{ shop.followers.length }}</span>
                                <span><i class="bi bi-grid-fill  text-green-800 mr-2"></i>Lisitngs {{ shop.listings }}</span>
                                <span><i class="bi bi-bookmark-star-fill  text-green-800 mr-2"></i>Ratings 
                                    <!-- <Rating v-model="shop_rating" disabled/> -->
                                </span>
                            </div>
                            <p class="mt-2">
                                {{ shop.description }}
                            </p>
                            <div class="text-gray-400 flex flex-col gap-4 text-[12px]">
                                <span v-if="shop.owner.location" class=" whitespace-nowrap">
                                    <i class="bi bi-geo-alt-fill mr-1"></i>
                                    {{ shop.owner.location.address.substring(0,20) }}...,
                                    {{ shop.owner.location.LGA }},
                                    {{ shop.owner.location.state }}.
                                </span>
                                <span><i class="bi bi-arrow-clockwise mr-1"></i>joined {{ formatDistanceToNow(shop.createdAt)}} ago</span>
                                
                            </div>
                           
                            <div v-if="isAllowed()" class="flex flex-row flex-wrap gap-3 w-full mt-4 justify-center md:justify-start">
                                <RouterLink to="/products/new">
                                    <button class="bg-app_green text-white rounded-md p-3 w-full"><i class="bi bi-plus-circle-fill mr-2"></i>Add new product</button>
                                </RouterLink>
                                <button class="rounded-md bg-[#00C1F6] text-white p-3 px-6" @click="boost_shop_modal = !boost_shop_modal">
                                    <span class=" hidden md:inline-block mr-3">Boost Shop </span>
                                    <i class="bi bi-rocket-fill"></i>
                                </button>
                            </div>
                            <div v-else class="w-full flex flex-wrap gap-3">
                            <!-- <div class="w-full flex gap-3"> -->
                                <button :class="shop && userIsFollowingShop(followers, user) ? 'bg-green-600 text-white border-none':''" @click="followShop(shop._id)" class="border text-green-500 rounded-md p-3 grow md:min-w-[180px]">
                                    <span v-if="!userIsFollowingShop(followers, user)"><i class="bi bi-plus mr-1"></i>follow</span>
                                    <span v-else>following</span>
                                </button>
                                <div class="bg-app_light_green text-app_green rounded-md p-2 flex flex-row gap-3 px-3">
                                    <button class="bg-app_light_green text-app_green rounded-md p-1 "><i class="bi bi-telephone"></i></button>
                                    <div class=" border-r border-app_green"></div>
                                    <button class="bg-app_light_green text-app_green rounded-md p-1"><i class="bi bi-whatsapp"></i></button>
                                </div>
                               <!--  <button class="bg-app_light_green text-app_green rounded-md px-6 py-2"><i class="bi bi-telephone"></i></button>
                                <button class="bg-app_light_green text-app_green rounded-md px-6 py-2"><i class="bi bi-whatsapp"></i></button> -->
                            </div>
                        </div>
                        <div class="flex flex-col mt-6 md:mt-0 md:w-[70%] border-red-400 w-full p-3 mb-3">
                            <div class="flex flex-row justify-stretch items-stretch w-full text-lg  bg-gray-100 rounded-lg p-3">
                                <button @click="current_tab = 0" :class="current_tab == 0 ? 'font-bold text-app_green bg-white border shadow-md':''" class="w-full p-3 rounded-md"><i class="bi bi-grid-fill mr-2"></i> Listings</button>
                                <button @click="current_tab = 1" :class="current_tab == 1 ? 'font-bold text-app_green bg-white border shadow-md':''" class="w-full p-3 rounded-md"><i class="bi bi-file-play mr-2"></i>Glips</button>
                            </div>
                            <div class="w-full min-h-[400px] rounded-sm p-5">

                                <!-- FOR PRODUCTS LISTING -->
                                <div v-show="current_tab == 0" class="w-full ">
                                    <!-- <div v-if="loading_products">Loading products...</div> -->
                                <div  class="flex flex-row flex-wrap gap-3">
                                    <div v-if="loading_products" v-for="loader in 6" class=" flex flex-1 flex-col bg-gray-100 min-w-[150px] max-w-[200px] relative h-[220px] rounded-lg justify-end items-start">
                                        <div class="flex flex-col gap-2 p-3">
                                            <Skeleton width="120px" borderRadius="10px" height="15px"></Skeleton>
                                            <Skeleton width="100px" borderRadius="10px" height="30px"></Skeleton>
                                        </div>
                                    </div>
                               
                                    
                                    <MasonryWall 
                                    :items="products"
                                    :ssr-columns="1"
                                    :column-width="200" :gap="10">
                                        <template #default="{ item, index }">
                                        <ProductCard class=" -mt-[15px]"
                                            :hasLikedButton="false"
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
                                    <!-- <div class="flex justify-center items-center p-8 text-gray-500" v-if="!loading_products || products.length == 0">
                                        <div class="flex flex-col justify-center items-center mt-12">
                                            <img src="../assets/images/no-products.png" class=" !size-52">
                                            <span class="mt-3">You have not posted any products yet</span>
                                        </div>
                                    </div> -->
                                </div>



                                <!-- FOR GLIPS -->
                                <div v-show="current_tab == 1" class="w-full p-3" >
                                    <div v-if="loading_glips">Loading glips...</div>
                                    <!-- {{glips}} -->
                                    <div v-if="glips.length > 0" class="flex flex-row flex-wrap gap-2">

                                        <GlipVideoBox v-for="glip in glips"
                                            :name="glip.name"
                                            :price="glip.price"
                                            :video_url="glip.video_url"
                                            @fullscreen="glipPreview(glip, index)"
                                        />
                                    </div>
                                    <div v-else class="flex flex-col justify-center items-center h-full">
                                    </div>
                                    <div class="h-full flex justify-center items-center p-8 text-gray-500" v-if="!glips || glips.length <= 0">
                                        <div class="flex flex-col justify-center items-center mt-12">
                                            <img src="../assets/images/no-products.png" class=" !size-52">
                                            <span class="mt-3">You have not posted any glips yet</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
        <!-- {{ shop_id }} -->
    </div>
</template>

<script>
import FullPageLoader from '@/components/fullPageLoader.vue';
import GlipComponent from '@/components/GlipComponent.vue';
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Rating from 'primevue/rating';

import router from '@/router';
import { RouterLink } from 'vue-router';
import GlipVideoBox from '@/components/GlipVideoBox.vue';
import Skeleton from 'primevue/skeleton';

import MasonryWall from '@yeger/vue-masonry-wall';

import { Vue3Lottie } from 'vue3-lottie'
import Rocket from '../assets/lottie/rocket.json';

    export default {
        name: "ShopDetailView",
        components:{
            ProductCard,
            Rating,
            GlipComponent,
            FullPageLoader,
            GlipVideoBox,
            Skeleton,

            MasonryWall,
            Vue3Lottie,
            
        },

        data(){
            return{
                Rocket,
                shop_image: '',
                shop_boost_duration: 1,

                glips_modal: false,
                loading: false,
                current_tab: 0,
                products: [],
                glips: [],
                shop: '',
                user: '',
                shop_id: '',
                shop_rating: 4,
                loading_products: false,
                loading_glips: false,
                formatDistanceToNow,
                current_glip: null,
                followers: [],
                isPlaying: false,
                currentTime: 0, // Current time of the video
                videoDuration: 0, // Total duration of the video
                dragging: false, // To track whether the user is dragging
                progressPercentage: 0, // Progress in percentage (0 - 100)

                boost_shop_modal: false,
                liked_products: [],
            }
        },

        computed:{
            
        },

        methods:{

            checkLikes(product_id){
                if(this.liked_products.includes(product_id)){
                    return true;
                } else {
                    return false;
                }
            },

            userIsFollowingShop(followers, idToCheck) {
                let exists = false; // Initialize a flag
                followers.forEach(follower => {
                    if (follower._id === idToCheck) {
                        exists = true; // Set flag to true if a match is found
                    }
                });
                return exists; // Return the flag
            },


            isAllowed(){
                this.user = localStorage.getItem('user');
                return this.user == this.shop.owner._id;
            },

           

            async addViewsToShop(){
              try{
                const response = await axios.get(`/shops/${this.shop_id}/view`);
                console.log("adding view to shop: ", response);
              }catch(error){
                // just do nothing...
                console.log("error adding views to shop: ", error);
              }
            },
            

            async getShopByName(){
                try{
                    this.loading = true;
                    const response = await axios.get(`/shops/${this.$route.params.name}/full`);
                    this.shop = response.data.shop;
                    console.log("shop: ", response);
                    this.shop_image = response.data.shop.profile.image_url;
                    this.shop_id = response.data.shop._id;
                    this.followers = response.data.shop.followers;
                    // this.products = response.data.shop.products;
                    this.loading = false;
                    // get products...
                    this.getShopProducts(this.shop_id);
                    this.getShopGlips(this.shop_id);
                    this.addViewsToShop();
                }catch(error){
                    if(error.response.status == 404){
                        this.$router.push('/404');
                    }
                    console.log("error getting shop: ", error);
                    this.loading = false;
                }   
            },

            async getShopById(shop_id){
                try{
                    const response = await axios.get(`/shops/${shop_id}`);
                    this.followers = response.data.shop.followers;
                    this.shop = response.data.shop;
                }catch(error){
                    console.log("error getting shop..", error);
                    
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error'
                    })
                }
            },  

            async getShopProducts(shop_id){
                try{
                    this.loading_products = true;
                    const response = await axios.get(`/products/${shop_id}/shop`);

                   /*  setTimeout(()=>{
                        this.products = response.data.products;
                        console.log("products: ", response)
                        this.loading_products = false;
                    }, 5000) */
                    this.products = response.data.products;
                    console.log("products: ", response)
                    this.loading_products = false;
                }catch(error){
                    console.log("error getting products..");
                    this.loading_products = false;
                }
            },

            async getShopGlips(shop_id){
                try{
                    this.loading_glips = true;
                    const response = await axios.get(`/products/glips/${shop_id}/all`);
                    this.glips = response.data.glips;
                    console.log("glips: ", response)
                    this.loading_glips = false;
                }catch(error){
                    console.log("error getting products..");
                    this.loading_glips = false;
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

            async boostShop(){
                try{
                    const response = await axios.post("/shops/boost_shop", { duration:  this.shop_boost_duration});
                    console.log("boosting shop: ", response);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                    window.location.reload();
                }catch(error){
                    console.log("error boosting shop: ", error);
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                }
            },

            glipPreview(glip, index){
                this.current_glip = glip;
                this.glips_modal = !this.glips_modal
            }
        },

        created(){
            this.getShopByName();
           /*  if(this.shop_id){
                this.addViewsToShop();
            } */
          
          
        },

        mounted() {

        },


    }
</script>

<style scoped>
    .shop-hero{
        background: url('../assets/images/shop_hero.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .shop-image{
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
    }

    .glips-container{
        overflow: auto;
  -webkit-scroll-snap-type: y mandatory;
      -ms-scroll-snap-type: y mandatory;
          scroll-snap-type: y mandatory;
          -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
    }


    .glips-container::-webkit-scrollbar {
       display: none;
    }


    .glips{
        scroll-snap-align: start;
       /*  background: url('../assets/images/chair.png'); */
        background:  black;
        background-size: cover;
    }


 
</style>