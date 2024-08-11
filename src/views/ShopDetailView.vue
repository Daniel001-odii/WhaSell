<template>

    <!-- GLIPS MODAL HERE -->
    <div v-if="glips_modal" class="fixed h-screen w-full z-50 top-0 right-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
        <button class="absolute bg-red top-3 right-3" @click="glips_modal = !glips_modal">
            <i class="bi bi-x-lg text-white text-2xl"></i>
        </button>
        <div class="glips-container border-red-500 w-full h-[90vh] md:max-h-[800px] flex flex-col justify-start items-center gap-3 p-3">
            
            
            <!-- MAIN GLIP -->
            <div class="glips rounded-xl bg-black text-white min-h-[100%]  h-full w-full md:max-h-[1000px] md:max-w-[400px] flex justify-center items-center relative" v-for="item in 10">
                <i class="pi pi-spinner-dotted pi-spin ml-3 text-2xl"></i>


                <!-- GLIP ACTIONS -->
                 <div class="flex flex-col gap-4 bg-red-5 h-[200px] absolute right-5 text-2xl">
                    <button class="bg-app_light_green rounded-full p-2 text-app_green h-14 w-14 relative">
                        <i class="bi bi-shop"></i>
                        <i class="bi bi-plus-circle-fill absolute top-7 text-[20px] -right-0"></i>
                        
                    </button>
                    <button>
                        <i class="bi bi-upload"></i>
                    </button>
                    <button>
                        <i class="bi bi-hand-thumbs-up"></i>
                    </button>
                    <button>
                        <i class="bi bi-three-dots"></i>
                    </button>
                    
                 </div>



                <!-- GLIP TEXTS -->
                <div class=" flex flex-col absolute left-5 right-5 bottom-5">
                    <div class="w-[80%] flex flex-col gap-3">
                        <h1 class="font-bold text-2xl">Wooden Bed Frame {{ item }}</h1>
                        <div>NGN 45,000</div>
                        <div class="text-sm">
                            <p>Transform your bedroom with our elegant wooden black bed frame, crafted from premium hardwood with a rich black finish. Its sturdy construction ensures lasting durability while its sleek design adds a touch of contemporary flair. Perfect for any bedroom sett... See More </p>
                        </div>
                    </div>
                   
                    <button class="btn bg-app_green text-white w-full mt-5">Buy now</button>
                </div>


              
            </div>
            
        </div>
    </div>





    <div>
        <!-- {{ isAllowed() }} -->
        <div class="flex flex-col">
            <div v-if="loading">loading</div>
            <div v-else class="shop-hero w-full bg-app_light_green h-[200px] relative">
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
                                <span>
                                    <i class="bi bi-geo-alt-fill mr-1"></i>
                                    Somewhere in Nigeria
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
                                                :product_name="product.name"
                                                :views="product.views"
                                                :posted="product.createdAt"
                                                :product_price="product.price.toLocaleString()"
                                                :shop="product.shop.name"
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
                                <div v-show="current_tab == 1" class="w-full" @click="glips_modal = !glips_modal">
                                    <div v-if="loading_products">Loading glips...</div>
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
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Rating from 'primevue/rating';

    export default {
        name: "ShopDetailView",
        components:{
            ProductCard,
            Rating,
        },

        data(){
            return{
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
            }
        },

        computed:{
            
        },

        methods:{
            isAllowed(){
                this.user = localStorage.getItem('user');
                return this.user == this.shop.owner;
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
        },

        created(){
            this.getShopByName();
          
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
        background: url('../assets/images/chair.png');
        background-size: cover;
    }
</style>