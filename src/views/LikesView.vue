<template>
    <div>
 <!-- PRODCUT DISPLAY AREA -->
 <div class="masonry">
            <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-52 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-64 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class="h-64 w-full bg-red-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-52 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-64 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           
           <ProductCard>
                <template #product_image>
                    <div class=" h-96 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-80 w-full bg-red-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class="h-64 w-full bg-red-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-52 w-full bg-orange-300"></div>
                </template>
           </ProductCard>
        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'


    export default {
        name: "LikesView",
        components:{
            ProductCard,
        },
        data(){
            return{

            }
        },
        created(){
            
        }
    }
</script>

<style scoped>

</style>