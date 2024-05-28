<template>
    <div class="bg-app_light_green">
        <NavbarView class="container mx-auto"/>
    </div>
    
    <div class="bg-app_light_green">
        <div class="container mx-auto h-[700px] bg-app_light_green flex flex-col justify-center items-center">
            <div class="text-center">
                <h1 class="text-6xl text-center font-bold">
                    <span class=" text-app_green">WhatsApp</span> Sales<br/>just got
                    <span class=" text-app_green">beta!</span>
                </h1>
                <p class=" pt-4">we stop you from posting products on your status, for good!</p>
                <div class=" font-bold mt-5 flex flex-row gap-5 items-center justify-center">
                    <button class=" bg-gray-600 hover:bg-black text-white p-3 rounded-md px-8">Start Selling</button>
                    <button class="border-2 border-black hover:bg-app_green hover:text-white hover:border-transparent rounded-md text-black p-3 px-8">Start Selling</button>
                </div>
            </div>
        </div>

       


    </div>

    <div class="w-full text-center font-bold p-3 mt-6">
        <span class="text-center text-3xl">KEY FEATURES</span>
    </div>

    <section class=" mt-12 flex flex-col gap-12">
        <div class="max-w-4xl mx-auto flex flex-row gap-5 justify-center items-center">
                <img class="h-[300px]" src="../assets/images/image_1.png">
            <div class="flex flex-col flex-1">
                <h2 class="font-bold text-3xl">Seamless Integration</h2>
                <p class=" text-2xl">Effortlessly connect your product posts to your WhatsApp for instant customer engagement</p>
            </div>
        </div>

        <div class=" bg-app_green">
            <div class=" max-w-4xl mx-auto flex flex-row gap-5 items-center justify-center p-5 pl-12">
                <div class="flex flex-col gap-3 flex-1">
                    <h2 class="text-white text-3xl font-bold">Boost your reach</h2>
                    <p class=" text-2xl text-white">Expand your audience beyond your status updates and attract more buyers</p>
                    <button class=" w-fit bg-gray-600 hover:bg-black text-white p-3 rounded-md px-8">Get Started</button>
                </div>
                <img src="../assets/images/image_2.png" class="h-[300px]" />
            </div>
        </div>

        <div class="max-w-4xl mx-auto flex flex-row gap-5 justify-center items-center">
            <img src="../assets/images/image_3.png" class="h-[300px]" />
            <div class="flex flex-col flex-1">
                <h2 class="font-bold text-3xl">Simple & Effective</h2>
                <p class=" text-2xl">Post, share, Create Invoices and sell in a few clicks – it's that easy</p>
            </div>
        </div>


        <div class=" bg-black">
            <div class=" max-w-4xl mx-auto flex flex-row gap-5 items-center justify-center p-5 pl-12">
                <div class="flex flex-col gap-3 flex-1">
                    <h2 class="text-white text-3xl font-bold">Enhanced Visibility</h2>
                    <p class=" text-2xl text-white">Give your products the spotlight they deserve with our optimized listing platform.</p>
                    <button class=" w-fit bg-gray-600 hover:bg-black text-white p-3 rounded-md px-8">Get Started</button>
                </div>
                <img src="../assets/images/image_2.png" class="h-[300px]" />
            </div>
        </div>

        <div class="max-w-4xl mx-auto flex flex-row gap-5 justify-center items-center">
                <img class="h-[300px]" src="../assets/images/image_1.png">
            <div class="flex flex-col flex-1">
                <h2 class="font-bold text-3xl">Direct Communication</h2>
                <p class=" text-2xl">Facilitate immediate customer interactions and sales through WhatsApp</p>
            </div>
        </div>
        

    </section>
   
</template>

<script>
import NavbarView from '../components/NavbarView'


    export default {
        name: "LandingPageView",
        components: {
            NavbarView,
        },
    }
</script>

<style scoped>

</style>