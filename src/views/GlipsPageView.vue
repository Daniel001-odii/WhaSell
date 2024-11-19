<template>
    <div class=" p-5">
        <h2 class="font-bold">From Shops you follow</h2>
        <div class="flex flex-row gap-3 w-full overflow-x-auto mt-6 py-2">
            <div v-for="glip in 10" class="flex justify-center relative items-center h-[150px] min-w-[120px] rounded-lg bg-gray-800">
                <div class=" size-[60px] bg-green-200 border-2 border-white text-green-600 rounded-full flex justify-center items-center">
                    <i class="bi bi-shop"></i>
                </div>
                <div class=" text-white text-shadow-lg absolute bottom-3 text-sm">Shop name</div>
            </div>
        </div>


        <!-- BEST DEALS FOR YOU TODAY -->
        <h2 class="font-bold mt-12">Best Deals for You Today!</h2>
        <div class="flex flex-row flex-wrap gap-3 w-full mt-6 py-2">
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

         <!-- DISCOVER NEW PRODUCTS -->
         <h2 class="font-bold mt-12">Discover New products</h2>
        <div class="flex flex-row flex-wrap gap-3 w-full mt-6 py-2">
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



    </div>  
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>