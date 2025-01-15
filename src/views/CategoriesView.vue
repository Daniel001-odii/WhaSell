<template>
<div class=" flex flex-col gap-3">
    <div class=" h-[200px] bg-red-500 category relative flex justify-center items-center" :style="header_image ? `background: url('${header_image}')`:''">
        <h1 class=" text-4xl uppercase font-bold text-white z-10">{{ this.$route.params.name }}</h1>
        <div class=" absolute h-full w-full bg-black bg-opacity-40 top-0"></div>
        
    </div>

   
    
    <div v-if="loading_products">
            <MasonryWall 
            :items="items" 
            :ssr-columns="1" 
            :column-width="150" 
            :gap="10">
                <template #default="{ item, index }">
                    <div class="flex flex-col gap-2 rounded-3xl"
                        :style="{ height: `${item + 100}px`}"
                        style="background: url('../assets/images/whaLogo.svg');">
                            <div class="rounded-md h-[100%] bg-gray-200"></div>
                            <div class="rounded-md h-[15px] bg-gray-200"></div>
                            <div class="rounded-md h-[30px] bg-gray-200"></div>
                    </div>
                </template>
            </MasonryWall> 
    </div>
    <!-- {{ products }} -->
    <div class=" flex flex-row flex-wrap gap-3 mt-12" v-for="(item, index) in products" :key="index">
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
    </div>
  <!--  <div v-if="products.length > 0">
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
        </div> -->
</div>
</template>

<script>
import axios from 'axios'
import MasonryWall from '@yeger/vue-masonry-wall';
import ProductCard from '@/components/ProductCard.vue';

    export default {
        name: "CategoriesView",
        components: {
            MasonryWall,
            ProductCard,
        },
        data(){
            return{
                items: [0,0,0,0,0,0,0,0,0,0,0,0,0],
                categories: '',
                products: [],
                header_image: '',
                loading_products: false,
            }
        },

        methods: {
            
            checkLikes(product_id){
               /*  if(this.liked_products.includes(product_id)){
                    return true;
                } else {
                    return false;
                } */
            },

            async getAllCategories(){
                try{
                    const response = await axios.get('/categories');
                    this.categories = response.data.categories;
                }catch(error){
                    console.log("error getting categgories..: ", error);
                }
            },

            
            async getProductsByCategoryName(){
                try{
                    this.loading_products = true
                    const response = await axios.get(`/products/products_by_category/${this.$route.params.name}`);
                    this.products = response.data.data;
                    this.header_image = response.data.header_image;
                    console.log('products: ', response);
                    this.loading_products = false
                }catch(error){
                    console.log('erro getting products: ', error);
                    this.loading_products = false
                }
            }
        },

        created(){
            this.getProductsByCategoryName();
        }
    }
</script>

<style scoped>

.category{
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
}
</style>