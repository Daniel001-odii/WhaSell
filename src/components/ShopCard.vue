<template>
   <!--   <RouterLink :to="`/shops/${name}`">
            <div>
                <div>
                <div class="relative w-[200px] p-4 bg-gray-100 border border-transparent hover:border-app_green rounded-3xl flex flex-col justify-center items-center gap-3">
                    <div class="scale-[0.7] text-small justify-center items-center flex flex-row gap-0.5 absolute -top-4 right-0 z-10">
                        <slot name="badge"></slot>
                    </div>
                    <div class=" relative">
                        <img :src="image_url" class=" h-40 product-image rounded-full">
                    </div>
                    
                    <div class="flex flex-col text-center gap-2">
                        <div name="store-name">
                            <span class="font-bold text-xl">{{ name }}</span>
                        </div>
                        <div name="store-category" class="bg-[#A4F4E7] px-3 py-1 rounded-lg text-green-700">
                            <span class="text-sm">{{ category }}</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </RouterLink> -->

    <RouterLink :to="`/shops/${name}`" class="flex flex-1 min-w-[300px] relative h-[260px] bg-gray-50 rounded-lg flex-col overflow-hidden">
        <div class=" h-[60%] w-full relative" :style="`background: url(${image_url})`" style="background-position: center; background-repeat: no-repeat; background-size: cover;">
            <div class=" size-16 border-2 absolute top-[76%] left-[20px] border-white bg-green-100 rounded-full flex justify-center items-center text-2xl">
                <i class="bi bi-shop text-green-600"></i>
            </div>
        </div>
        <div class=" h-[30%] w-full p-8">
            <p class="font-bold text-lg">{{ name }}</p>
            <p class=" text-gray-400">{{ category }}</p>
        </div>
    </RouterLink>
</template>

<script>
    export default {
        name: "ShopCard",
        props: {
            name: '',
            category: '',
            image_url: '',
        }
    }
</script>

<style scoped>
.status-tag{
    /* background: linear-gradient(light-orange, orange); */
}
</style>