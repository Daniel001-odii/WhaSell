<template>
    <!-- <div> -->
        <div class=" flex flex-1 flex-col overflow-hidden min-w-[150px] max-w-[200px] relative">
        <!-- <div class=" flex flex-1 relative min-w-[150px] md:max-w-[200px] md:min-w-[200px] flex-col overflow-hidden"> -->
            <div class=" relative">
                <RouterLink :to="`/products/${id}/${product_slug}`">
                    <div class=" prod-alt-image rounded-md overflow-hidden">
                        <!-- <slot name="product_image"></slot> -->
                        <img :src="image_url" class=" !size-full rounded-md transition-transform duration-300 transform hover:scale-125 peer">
                        <!-- <div class=""></div> -->
                    </div>
                </RouterLink>
            </div>
            
            <div class="flex flex-col mt-3">
                <RouterLink v-if="product_slug" :to="`/products/${id}/${product_slug}`" class="text-sm clamp-4">
                    {{ product_slug }}
                </RouterLink>
                <div class="flex flex-row justify-between">
                <!-- <slot name="product-price"> -->
                    <span class=" text-lg font-bold">NGN {{ product_price }}</span>
                <!-- </slot> -->
                <button @click="addLike()" class="h-8 w-8 rounded-full bg-white flex justify-center items-center border absolute top-3 right-3" :class="is_liked ? 'border-green-500':''">
                    <i class="bi bi-hand-thumbs-up-fill text-green-500" v-if="is_liked"></i>
                    <i class="bi bi-hand-thumbs-up" v-else></i>
                </button>
            </div>
            <div class="mt-1 text-gray-400 text-[12px] flex justify-between">
                <span>
                    <i class="bi bi-eye-fill" ></i>
                    {{ views }} views 
                </span>
                <!-- <span v-if="posted">listed {{ formatDistanceToNow(posted) }} ago</span> -->
                
            </div>

           <!--  <div>
                <button class="bg-[#37B36E] text-white btn w-full mt-3 font-bold text-sm">Buy</button>
            </div> -->
                
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Routerlink from 'vue'
import { formatDistanceToNow } from 'date-fns'


    export default {
        name: "ProductCard",
        props:{
            id: String,
            product_slug: String,
            product_price: String,
            product_image: String,
            views: Number,
            posted: String,
            shop: String,
            is_liked: Boolean,
            shop_name: String,
            image_url: String,
        },

        data(){
            return{
                formatDistanceToNow,
            }
        },

        methods: {
            addLike(){
                this.$emit('like-product');
            }
        }
    }
</script>

<style scoped>
    .product-image{
        filter: grayscale();
        background-size: cover;
        background-position: center;
        background-repeat: none;
    }

    .prod-alt-image{
        background-image: url('../assets/images/image_5.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-blend-mode: saturation;
        /* filter: grayscale(100%); */
        min-height: 100px;
    }
</style>