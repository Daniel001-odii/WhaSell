<template>

    <!-- GLIPS MODAL HERE -->
    <GlipComponent
        :glips_modal="glips_modal"
        :glips="glips"
        @close-glip="glips_modal = !glips_modal"
    />




    <div>
        <!-- {{ isAllowed() }} -->
        <div class="flex flex-col">
            <div v-if="loading">loading</div>
            <div v-else class=" w-full bg-app_green h-[200px] relative flex justify-center items-center">
                <span class=" text-3xl font-bold text-green-100">{{ shop.category }}</span>
                <RouterLink to="/account/shop/true">
                    <button v-if="isAllowed()"class="rounded-full border border-black bg-white bg-opacity-50 px-5 py-2 absolute bottom-5 right-5 z-40 flex justify-center items-center gap-3">
                        <span class="hidden md:flex">edit profile</span>
                        <i class="bi bi-pencil"></i>
                    </button>
                </RouterLink>
                <div class="flex flex-col gap-8 absolute top-[65%] w-full border-red-400">
                    <div class="w-full relative h-[150px] flex md:block justify-center items-center ">
                          <!-- <div class=" absolute left-[100px] size-[150px] rounded-full shop-image" :style="`background: url('${shop.profile.image_url}')`"></div> -->
                          <!-- <div class=" absolute md:left-[100px] size-[150px] rounded-full shop-image bg-app_light_green text-app_green text-4xl flex justify-center items-center">
                            <i class="bi bi-shop"></i>
                           
                          </div> -->
                          <img :src="shop.profile.image_url" alt="Product Photo" class="rounded-full absolute md:left-[100px] size-[150px] object-cover">
                    </div>
                  

                    <div class="flex flex-col justify-start items-start md:flex-row gap-6 p-3">
                        <div v-if="shop" class="flex flex-col justify-center text-left md:w-[35%] items-center w-full md:items-start gap-3">
                            <h1 class="font-bold text-2xl">{{ shop.name }}</h1>
                            <span class="bg-app_light_green w-fit rounded-md text-app_green p-3">{{ shop.category}}</span>
                            <div class="flex flex-row justify-evenly md:justify-between w-full flex-wrap gap-3">
                                <span><i class="bi bi-people-fill text-green-800 mr-2"></i>Followers {{ shop.followers_count }}</span>
                                <span><i class="bi bi-grid-fill  text-green-800 mr-2"></i>Lisitngs {{ shop.listings }}</span>
                                <span><i class="bi bi-bookmark-star-fill  text-green-800 mr-2"></i>Ratings 
                                    <!-- <Rating v-model="shop_rating" disabled/> -->
                                </span>
                            </div>
                            <p class="mt-2">
                                {{ shop.description }}
                            </p>
                            <div class="text-gray-400 flex flex-col gap-4 text-[12px]">
                                <span class=" whitespace-nowrap">
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
                            </div>
                            <div v-else class="w-full flex gap-3">
                                <!-- <button @click="followShop(shop._id)" class=" text-sm border hover:border-gray-300 hover:bg-slate-100 rounded-full p-3 px-8 text-black font-medium"> 
                                    
                                </button> -->
                                <button :class="shop.followers.includes(user) ? 'bg-green-600 text-app_green':'text-white'" @click="followShop(shop._id)" class="bg-app_green text-white rounded-md p-3 grow">
                                    <span v-if="!shop.followers.includes(user)"><i class="bi bi-plus mr-1"></i>follow</span>
                                    <span v-else>following</span>
                                </button>
                                <button class="bg-app_light_green text-app_green rounded-md px-6 py-2"><i class="bi bi-telephone"></i></button>
                                <button class="bg-app_light_green text-app_green rounded-md px-6 py-2"><i class="bi bi-whatsapp"></i></button>
                                
                            </div>
                        </div>
                        <div class="flex flex-col mt-6 md:mt-0 md:w-[70%] border-red-400 w-full">
                            <div class="flex flex-row justify-stretch items-stretch w-full p-3 text-lg">
                                <button @click="current_tab = 0" :class="current_tab == 0 ? 'font-bold text-app_green':''" class="w-full p-3"><i class="bi bi-grid-fill mr-2"></i> Listings</button>
                                <button @click="current_tab = 1" :class="current_tab == 1 ? 'font-bold text-app_green':''" class="w-full p-3"><i class="bi bi-file-play mr-2"></i>Glips</button>
                            </div>
                            <div class="w-full bg-gray-50 min-h-[400px] rounded-sm">
                                <div v-show="current_tab == 0" class="w-full ">
                                    <div v-if="loading_products">Loading products...</div>
                                    <div v-else class="masonry flex flex-wrap gap-5">
                                        <ProductCard v-for="(product, index) in products" :key="index"
                                                :id="product._id"
                                                :product_slug="product.slug"
                                                :views="product.views"
                                                :posted="product.createdAt"
                                                :product_price="product.price.toLocaleString()"
                                                :shop_name="shop.name"
                                            >
                                                <template #product_image>
                                                    <img :src="product.images[0]" class="max-h-[300px] max-w-[200px]">
                                                </template>
                                        </ProductCard>
                                    </div>
                                    <div class="flex justify-center items-center p-8 text-gray-500" v-if="!products || products.length <= 0">
                                        <div class="flex flex-col justify-center items-center mt-12">
                                            <img src="../assets/images/no-products.png" class=" !size-52">
                                            <span class="mt-3">You have not posted any products yet</span>
                                        </div>
                                    </div>
                                </div>



                                <!-- FOR GLIPS -->
                                <div v-show="current_tab == 1" class="w-full p-3" >
                                    <div v-if="loading_products">Loading glips...</div>
                                    <!-- {{glips}} -->
                                    <div v-if="glips.length > 0">
                                        <div v-for="glip in glips" class="relative">
                                            <div @click="glipPreview(glip, index)" class=" w-[200px] h-[300px] bg-black rounded-lg flex justify-center items-center relative overflow-hidden">
                                                <video>
                                                    <source :src="glip.video_url">
                                                    <!-- <source src="../assets/videos/glip_test.mp4"> -->
                                                </video>
                                                <div class="bg-black bg-opacity-40 text-white absolute p-3 rounded-md bottom-5 left-1/2 transform -translate-x-1/2 flex flex-row gap-3 text-sm w-[90%]">
                                                    <button class="p-3 rounded-full bg-white text-app_green size-8 flex justify-center items-center"><i class="bi bi-hand-thumbs-up"></i></button>
                                                    <div class="flex flex-col">
                                                        <span class="font-bold">{{glip.name}}</span>
                                                        <span class="text-[12px]">NGN {{glip.price}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>
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
import GlipComponent from '@/components/GlipComponent.vue';
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Rating from 'primevue/rating';

    export default {
        name: "ShopDetailView",
        components:{
            ProductCard,
            Rating,
            GlipComponent,
        },

        data(){
            return{
                glips_modal: false,
                loading: false,
                current_tab: 1,
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

                isPlaying: false,
                currentTime: 0, // Current time of the video
                videoDuration: 0, // Total duration of the video
                dragging: false, // To track whether the user is dragging
                progressPercentage: 0, // Progress in percentage (0 - 100)
            }
        },

        computed:{
            
        },

        methods:{
            togglePlayPause() {
      const video = document.getElementById("videoPlayer");
      if (video.paused) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    },
    updateProgress() {
    if (!this.dragging) {
        const video = document.getElementById("videoPlayer");
      this.currentTime = video.currentTime;
      this.progressPercentage = (this.currentTime / video.duration) * 100;
    }
  },
    seekVideo(event) {
      const video = document.getElementById("videoPlayer");
      video.currentTime = event.target.value;
      this.currentTime = event.target.value;
    },
    startDrag(event) {
      this.dragging = true;
      this.dragSeek(event);
    },
    dragSeek(event) {
      if (this.dragging) {
        const progressBar = document.getElementById("progressBar");
        const rect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
        this.progressPercentage = percentage;
        this.seekTo(percentage);
      }
    },
    stopDrag() {
      this.dragging = false;
    },
    seekTo(percentage) {
    const video = document.getElementById("videoPlayer");
    video.currentTime = (percentage / 100) * video.duration;
    this.currentTime = video.currentTime;
    this.progressPercentage = percentage;
  },

    
            isAllowed(){
                this.user = localStorage.getItem('user');
                return this.user == this.shop.owner._id;
            },
            

            async getShopByName(){
                try{
                    this.loading = true;
                    const response = await axios.get(`/shops/${this.$route.params.name}/full`);
                    this.shop = response.data.shop;
                    console.log("shop: ", response)
                    this.shop_id = response.data.shop._id;
                    // this.products = response.data.shop.products;
                    this.loading = false;
                    // get products...
                    this.getShopProducts(this.shop_id);
                    this.getShopGlips(this.shop_id);
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
                    this.loading_products = true;
                    const response = await axios.get(`/products/glips/${shop_id}/all`);
                    this.glips = response.data.glips;
                    console.log("glips: ", response)
                    this.loading_products = false;
                }catch(error){
                    console.log("error getting products..");
                    this.loading_products = false;
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

            glipPreview(glip, index){
                this.current_glip = glip;
                this.glips_modal = !this.glips_modal
            }
        },

        created(){
            this.getShopByName();
          
        },

        mounted() {
            const video = document.getElementById("videoPlayer");
            if(video){
                video.onloadedmetadata = () => {
                    this.videoDuration = video.duration;
                };
            }
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