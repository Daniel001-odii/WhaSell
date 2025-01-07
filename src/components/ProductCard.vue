<template>
    <div class=" relative group">
        <!-- IMAGE -->
        <div class="overflow-hidden rounded-3xl">
            <img :src="image_url" class=" w-auto  transition-transform duration-300 transform group-hover:scale-125 peer">
        </div>

        <!-- TEXT AND WRITE UPS -->
        <div class="hidden flex-col border p-2 h-full bg-black bg-opacity-50 absolute z-10 w-full top-0 rounded-3xl items-start justify-end text-white group-hover:flex">
            <RouterLink v-if="product_slug" :to="`/products/${id}/${product_slug}`" class="text-sm clamp-4">
                {{ product_slug }}
            </RouterLink>
            <div class="flex flex-row justify-between">
                <span class=" text-lg font-bold">NGN {{ product_price }}</span>
                <button @click="addLike()" class="h-8 w-8 rounded-full bg-white flex justify-center items-center border absolute top-3 right-3" :class="is_liked ? 'border-green-500':''">
                    <i class="bi bi-hand-thumbs-up-fill text-green-500" v-if="is_liked"></i>
                    <i class="bi bi-hand-thumbs-up" v-else></i>
                </button>
            </div>
            <div class="text-gray-400 text-[12px] flex justify-between">
                <span>
                    <i class="bi bi-eye-fill" ></i>
                    {{ views }} views 
                </span>
            </div>
        </div>
    </div>
    
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