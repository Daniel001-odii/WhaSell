<template>
    <div class=" p-5">
        <h2 v-if="fl_shop_glips.length > 0" class="font-bold">From Shops you follow </h2>
        <div v-if="fl_shop_glips.length > 0" class="flex flex-row gap-3 w-full overflow-x-auto mt-6 py-2">
            <div 
            :style="`background: url(${glip?.shop.profile?.image_url}); `"
            style="background-position: center; background-size: cover;" 
            v-for="glip in fl_shop_glips" class="flex justify-center relative items-center h-[200px] w-[150px] rounded-lg  bg-opacity-10 overflow-hidden">
                <div class=" z-10 size-[60px] bg-green-200 border-2 border-white text-green-600 rounded-full flex justify-center items-center">
                    <i class="bi bi-shop"></i>
                </div>
                <div class=" text-white text-shadow-lg absolute bottom-3 text-sm z-10">{{ glip?.shop?.name }}</div>
                <div class=" h-full w-full absolute bg-black bg-opacity-50 "></div>
               
            </div>
        </div>

        <!-- {{ fl_shop_glips }} -->

         <!-- GLIPS MODAL HERE -->

        <GlipComponent
        @closeGlip = "glip_modal_visible = !glip_modal_visible"
            :glips_modal="glip_modal_visible"
            :glips="video_array"
        />

        <!-- <div ref="videoContainer" class="video-container">
            <video ref="videoElement" width="600" loop >
            <source src="https://storage.googleapis.com/test-for-mongo.appspot.com/product-glips/y2mate.com%20-%20Shortest%20Video%20on%20Youtube_480p%20%281%29.mp4?GoogleAccessId=firebase-adminsdk-5xhge%40test-for-mongo.iam.gserviceaccount.com&Expires=4102444800&Signature=sdqjDRtXemffQj1u3q8XIZVpq%2B8RBsSfV7VSpKxLlNq43GirIZBaBwC4TA%2Bf10p2ddCBfXpoHianuxQj%2BtkGe6hRwJXoibv1B1HFZsYQUWkmXzuV6%2FXrAX1hrUVB4o8g1ZL3VQQv3SUpeOXf4Jb45EE2BN2W4geZJ7YfhhBYctdcr8dmMXvj3M71vvP1F7yQlbLjCh1xlh%2BjKwAe7QHLNhNmBWF1IBj3Yyxy7cdtc1ZX5i5OBsrvJ62EQYtEQDx%2BMHT2jX2KA%2Bc5XOET%2BcgQ2j51Uy1D1F%2BkB%2FzZmkviXF6It8L%2BppaxPE64R05ZMBwj0OvNKYxINq1xn7aj7mN51g%3D%3D" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
 -->

        <!-- BEST DEALS FOR YOU TODAY -->
        <h2 class="font-bold mt-12">Best Deals for You Today!</h2>
        <div class="flex flex-row flex-wrap gap-3 w-full mt-6 py-2">
            <div 
            :style="`background: url(${glip?.shop.profile?.image_url}); `"
            style="background-position: center; background-size: cover;" 
            v-for="glip in all_glips" class="flex justify-center relative items-center h-[300px] w-[250px] rounded-lg  bg-opacity-10 overflow-hidden">
                <div class=" z-10 size-[60px] text-white rounded-full flex justify-center items-center">
                    <i class="bi bi-play-circle-fill text-4xl"></i>
                </div>
                <div class=" text-white text-shadow-lg absolute bottom-3 text-sm z-10">{{ glip?.shop?.name }}</div>
                <div class=" h-full w-full absolute bg-black bg-opacity-50 "></div>
               
            </div>

            <!-- <div v-for="glip in all_glips" class=" flex-1 h-[260px] min-w-[220px] bg-gray-300 rounded-md relative">
                <button class="absolute top-5 right-5 bg-white rounded-full size-[30px]">
                    <i class="bi bi-hand-thumbs-up-fill"></i>
                </button>
                <div class="absolute bottom-3 left-5 flex flex-col">
                    <span>Product Name</span>
                    <span class="font-bold text-md">NGN Product Price</span>
                </div>
            </div> -->
        </div>

         <!-- DISCOVER NEW PRODUCTS -->
         <!-- <h2 class="font-bold mt-12">Discover New products</h2> -->
       <!--  <div class="flex flex-row flex-wrap gap-3 w-full mt-6 py-2">
            <div v-for="glips in 17" class=" flex-1 h-[260px] min-w-[220px] bg-gray-300 rounded-md relative">
                <button class="absolute top-5 right-5 bg-white rounded-full size-[30px]">
                    <i class="bi bi-hand-thumbs-up-fill"></i>
                </button>
                <div class="absolute bottom-3 left-5 flex flex-col">
                    <span>Product Name</span>
                    <span class="font-bold text-md">NGN Product Price</span>
                </div>
            </div>
        </div>
 -->


    </div>  
    <TheFooter/>
</template>

<script>
import GlipComponent from '@/components/GlipComponent.vue';
import ReelsComponent from '@/components/ReelsComponent.vue';
import { ref, onMounted, onUnmounted } from "vue";
import axios from 'axios';
import TheFooter from '@/components/TheFooter.vue';


    export default {
        name: "GlipsPageView",
        components: {
            ReelsComponent,
            GlipComponent,
            TheFooter
        },

        data(){
            return{
                glip_modal_visible: false,
                /* video_array: [
                    {video_url: "https://storage.googleapis.com/test-for-mongo.appspot.com/product-glips/y2mate.com%20-%20Shortest%20Video%20on%20Youtube_480p%20%281%29.mp4?GoogleAccessId=firebase-adminsdk-5xhge%40test-for-mongo.iam.gserviceaccount.com&Expires=4102444800&Signature=sdqjDRtXemffQj1u3q8XIZVpq%2B8RBsSfV7VSpKxLlNq43GirIZBaBwC4TA%2Bf10p2ddCBfXpoHianuxQj%2BtkGe6hRwJXoibv1B1HFZsYQUWkmXzuV6%2FXrAX1hrUVB4o8g1ZL3VQQv3SUpeOXf4Jb45EE2BN2W4geZJ7YfhhBYctdcr8dmMXvj3M71vvP1F7yQlbLjCh1xlh%2BjKwAe7QHLNhNmBWF1IBj3Yyxy7cdtc1ZX5i5OBsrvJ62EQYtEQDx%2BMHT2jX2KA%2Bc5XOET%2BcgQ2j51Uy1D1F%2BkB%2FzZmkviXF6It8L%2BppaxPE64R05ZMBwj0OvNKYxINq1xn7aj7mN51g%3D%3D"},
                    { video_url: "https://storage.googleapis.com/test-for-mongo.appspot.com/product-glips/853889-sd_960_540_25fps.MP4?GoogleAccessId=firebase-adminsdk-5xhge%40test-for-mongo.iam.gserviceaccount.com&Expires=4102441200&Signature=xV8H%2FqejBkN05FwxtJtPBxh3DQ%2BI5cIihLWg1%2FsIpVJfgucH4nhYf9nu%2ByKuCeN5ZI3995XcjaaO5V1gm40AGTLHEl0NNMkLHmBWwsaIhGAq%2BYUL8KrNGA6tZiowCYWb82ieoug7T5CCa6HBcrHZGDAtqubWtEfZnC2xUk%2FEb3nwfqbEOZVySnsQNpc6PZgG3iGC5CIQEpE9Ua9C8LmlLghdPBgsFjT2MJEFP1q8CyVKF222PimmNFY2eRMzqyjM9iEl8h2SQc%2B5Fms9QsllGNcJPUaCvu05t3cXUe0iziBj3L4CsP6emwnp5PHJCb0RQlAF9GgBQt0ovJwxeQvZDA%3D%3D"},
                    { video_url: "https://storage.googleapis.com/test-for-mongo.appspot.com/product-glips/y2mate.com%20-%20Shortest%20Video%20on%20Youtube_480p%20%281%29.mp4?GoogleAccessId=firebase-adminsdk-5xhge%40test-for-mongo.iam.gserviceaccount.com&Expires=4102444800&Signature=sdqjDRtXemffQj1u3q8XIZVpq%2B8RBsSfV7VSpKxLlNq43GirIZBaBwC4TA%2Bf10p2ddCBfXpoHianuxQj%2BtkGe6hRwJXoibv1B1HFZsYQUWkmXzuV6%2FXrAX1hrUVB4o8g1ZL3VQQv3SUpeOXf4Jb45EE2BN2W4geZJ7YfhhBYctdcr8dmMXvj3M71vvP1F7yQlbLjCh1xlh%2BjKwAe7QHLNhNmBWF1IBj3Yyxy7cdtc1ZX5i5OBsrvJ62EQYtEQDx%2BMHT2jX2KA%2Bc5XOET%2BcgQ2j51Uy1D1F%2BkB%2FzZmkviXF6It8L%2BppaxPE64R05ZMBwj0OvNKYxINq1xn7aj7mN51g%3D%3D"},
                ], */
                followed_shops: '',
                loading_shops: [],

                fl_shop_glips: [],
                all_glips: [],
            }
        },

        methods: {
            async getFollowedShops(){
                try{
                    this.loading_shops['followed'] = true;
                    const response = await axios.get('/shops/followed/all');
                    console.log("followed shops: ", response);
                    this.followed_shops = response.data.followed_shops;
                    this.fl_shop_glips = response.data.glips;
                    this.loading_shops['followed'] = false;
                }catch(error){
                    console.log("error getting followed shops: ", error);
                    this.loading_shops['followed'] = false;
                }
            },  

            async getAllGlips(){
                try{
                    this.loading = true;
                    const response = await axios.get("/shops/glips/all");
                    this.all_glips = response.data.glips;
                    this.loading = false;
                }catch(error){
                    console.log("error loading all glips: ", error);
                }
            }

        },

        created(){
            this.getFollowedShops();
            this.getAllGlips();
        }


    }
</script>

<style scoped>

</style>