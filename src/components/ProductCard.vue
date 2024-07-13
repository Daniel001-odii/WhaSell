<template>
    <div>
        <div class=" break-inside-avoid flex-auto p-3 hover:shadow-md rounded-lg relative w-fit">
            <div class=" relative">
                
                <button class=" absolute z-10 top-3 left-3 h-6 w-6 rounded-md bg-white text-gray-500 shadow-xl flex justify-center items-center">
                    <svg width="12" height="12" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 2H1V0H17V2ZM10 11.5C10 12.64 10.43 13.86 11 15V16H1V10H0V8L1 3H17L17.7 6.5C17 6.18 16.28 6 15.5 6C12.5 6 10 8.5 10 11.5ZM9 10H3V14H9V10ZM19 11.5C19 14.1 15.5 18 15.5 18C15.5 18 12 14.1 12 11.5C12 9.6 13.6 8 15.5 8C17.4 8 19 9.6 19 11.5ZM16.7 11.6C16.7 11 16.1 10.4 15.5 10.4C14.9 10.4 14.3 10.9 14.3 11.6C14.3 12.2 14.8 12.8 15.5 12.8C16.2 12.8 16.8 12.2 16.7 11.6Z" fill="gray"/>
                    </svg>
                </button>
                <RouterLink :to="`/products/${id}/${product_name}`">
                    <slot name="product_image">
                        <div class="h-64 bg-gray-300"></div>
                    </slot>
                </RouterLink>
            </div>
            
            <div class="flex flex-col ">
                <RouterLink :to="`/products/${id}/${product_name}`" class="font-bold">
                    {{ product_name }}
                </RouterLink>
                <div class="flex flex-row justify-between">
                <!-- <slot name="product-price"> -->
                    <span class=" text-xl">&#8358;{{ product_price }}</span>
                <!-- </slot> -->
                <button class="h-8 w-8 rounded-full bg-white flex justify-center items-center">
                    <i class="bi bi-hand-thumbs-up"></i>
                </button>
            </div>
            <div class="mt-3 text-gray-400 text-[12px] flex justify-between">
                <span>
                    <i class="bi bi-eye-fill"></i>
                    {{ views }} views 
                </span>
                <!-- <span v-if="posted">listed {{ formatDistanceToNow(posted) }} ago</span> -->
                
            </div>
                
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
            product_name: String,
            product_price: String,
            product_image: String,
            views: Number,
            posted: String,
            shop: String,
        },
        data(){
            return{
                formatDistanceToNow,
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
</style>