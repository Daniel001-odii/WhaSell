<template>
    <div>
        <div class="flex flex-col">
            <div class="shop-hero w-full bg-app_light_green h-[200px] relative">
                <div class="flex flex-col gap-8 absolute top-[65%] w-full border-red-400">
                    <div class="w-full relative h-[150px]">
                          <div class=" absolute left-[100px] size-[150px] bg-gray-300 rounded-full "></div>
                    </div>
                  

                    <div class="flex flex-col md:flex-row gap-6 p-3">
                        <div class="flex flex-col justify-center text-left md:w-[35%] items-start gap-3">
                            <h1 class="font-bold text-2xl">Shop name here</h1>
                            <span class="bg-app_light_green w-fit rounded-md text-app_green p-3">furniture</span>
                            <div class="flex flex-row justify-between w-full flex-wrap gap-3">
                                <span><i class="bi bi-people-fill text-green-800 mr-2"></i>Followers 20k+</span>
                                <span><i class="bi bi-grid-fill  text-green-800 mr-2"></i>Lisitngs 34</span>
                                <span><i class="bi bi-bookmark-star-fill  text-green-800 mr-2"></i>Ratings 34</span>
                            </div>
                            <p class="mt-6">
                                Welcome to Deluxe Arts and Crafts where artistry meets comfort, you can quickly browse through our catalogue of products ranging from beaded shirts, skirts, paintings, bags and more and bask in the joy of art we create. Feel free to follow my store to stay tuned with new product listings and get early promo discounts on time...... Read More
                            </p>
                            <div class="text-gray-400 flex flex-row flex-wrap gap-4">
                                <span>
                                    <i class="bi bi-geo-alt-fill mr-1"></i>shop location here
                                </span>-
                                <span>joined 3 years ago</span>
                                
                            </div>
                            <div class="flex flex-row flex-wrap gap-3 w-full mt-4">
                                <button class="bg-app_green text-white rounded-md p-3 grow"><i class="bi bi-person-plus mr-2"></i>follow</button>
                                <button class="bg-app_light_green text-app_green rounded-md px-6 py-2"><i class="bi bi-telephone"></i></button>
                                <button class="bg-app_light_green text-app_green rounded-md px-6 py-2"><i class="bi bi-whatsapp"></i></button>
                            </div>
                        </div>
                        <div class="flex flex-col mt-6 md:w-[70%] border-red-400">
                            <div class="flex flex-row justify-stretch items-stretch w-full p-3 text-lg">
                                <button @click="current_tab = 0" :class="current_tab == 0 ? 'font-bold text-app_green':''" class="w-full p-3"><i class="bi bi-grid-fill mr-2"></i> Listings</button>
                                <button @click="current_tab = 1" :class="current_tab == 1 ? 'font-bold text-app_green':''" class="w-full p-3"><i class="bi bi-file-play mr-2"></i>Glips</button>
                            </div>
                            <div class="">
                                <div v-show="current_tab == 0" class="w-full h-[400px] bg-red-500"></div>
                                <div v-show="current_tab == 1" class="w-full h-[400px] bg-green-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
        
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios'


    export default {
        name: "ShopDetailView",
        components:{
            ProductCard,
        },

        data(){
            return{
                current_tab: 0,
            }
        },

        methods:{

        },

        created(){

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
</style>