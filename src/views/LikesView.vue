<template>
    <div>
        <!-- PRODCUT DISPLAY AREA -->
        <FullPageLoader v-if="loading"/>
      
        <div v-else class="flex flex-row flex-wrap gap-5 py-5">
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
           <!-- {{ products }} -->
        </div>
        <div v-if="!loading && products.length == 0" class="w-full p-12 text-center text-gray-400">Nothing to see here :)</div>
    </div>
    <TheFooter/>
</template>

<script>
import FullPageLoader from '@/components/fullPageLoader.vue';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import MasonryWall from '@yeger/vue-masonry-wall';
import TheFooter from '@/components/TheFooter.vue';


    export default {
        name: "LikesView",
        components:{
            ProductCard,
            FullPageLoader,
            MasonryWall,
            TheFooter,
        },
        data(){
            return{
                products: [],
                liked_products: [],
                loading: false,
            }
        },
        methods:{
            checkLikes(product_id){
                if(this.liked_products.includes(product_id)){
                    return true;
                } else {
                    return false;
                }
            },

            async getUser(){
                try{
                    
                    const response = await axios.get('/user');
                    console.log("found user: ", response);
                    this.liked_products = response.data.user.liked_products;
                  
                }catch(error){
                    console.log("cant get user..", error);
                  
                }
            },



            async getUserLikedProducts(){
                try{
                    this.loading = true;
                    const response  = await axios.get('/user/likes');
                    this.products = response.data.liked_products;
                    console.log("user likes: ", response)
                    this.loading = false;
                }catch(error){
                    console.log("error getting products: ", error)
                    this.loading = false;
                }
            },

            async addProductToLikes(product_id){
                try{
                    const response = await axios.post(`/products/${product_id}/like`);
                    console.log("likes: ", response);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'default',
                    });
                    this.getUser();
                    this.checkLikes(product_id);
                }catch(error){
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'default',
                    });
                }
            }
        },
        created(){
            this.getUserLikedProducts();
            this.getUser();
        }
    }
</script>

<style scoped>

</style>