<template>
    <div class="bg-app_light_green">
        <NavbarView/>
    
        
        <div class="bg-app_light_gree">
            <div class="container text-center mx-auto h-[700px] bg-app_light_gree flex flex-row justify-center items-center">
                <div class="">
                    <h1 class="text-6xl font-bold">
                        <span class=" text-app_green">WhatsApp</span> Sales<br/>just got
                        <span class=" text-app_green">better!</span>
                    </h1>
                    <p class=" pt-4 text-sm">...so basically, we stop you from posting products on your status, for good!</p>
                    <div class=" font-bold mt-5 flex flex-row gap-5 items-center justify-center">
                        <button class=" bg-gray-600 hover:bg-black text-white p-3 rounded-md px-8">Start Selling</button>
                        <button class="border-2 border-black hover:bg-app_green hover:text-white hover:border-transparent rounded-md text-black p-3 px-8">Start Selling</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <section>
        <div class="w-full text-center font-bold p-3 mt-6">
            <span class="text-center text-3xl">KEY FEATURES</span>
        </div>

        <div class=" my-24 flex flex-col  md:flex-row gap-12 justify-center items-center w-full p-5">
            <div class="flex flex-col gap-5 justify-center items-center text-center max-w-sm">
                <img src="../assets/images/image_1.png" class=" h-40">
                <div class="flex flex-col flex-1">
                    <h2 class="font-bold text-3xl">Seamless Integration</h2>
                    <p class=" text-2xl">Effortlessly connect your product posts to your WhatsApp for instant customer engagement</p>
                </div>
            </div>

            <div class="flex flex-col gap-5  justify-center items-center text-center max-w-sm">
                <img src="../assets/images/image_2.png" class=" h-40">
                <div class="flex flex-col flex-1">
                    <h2 class="font-bold text-3xl">Boost your reach</h2>
                    <p class=" text-2xl">Expand your audience beyond your status updates and attract more buyers</p>
                </div>
            </div>

            <div class="flex flex-col gap-5  justify-center items-center text-center max-w-sm">
                <img src="../assets/images/image_3.png" class=" h-40">
                <div class="flex flex-col flex-1">
                    <h2 class="font-bold text-3xl">Simple & Effective</h2>
                    <p class=" text-2xl">Give your products the spotlight they deserve with our optimized listing platform.</p>
                </div>
            </div>
        </div>

    </section>

    <!-- <section class="bg-black h-[500px]">

    </section> -->
   
</template>

<script>
import NavbarView from '../components/NavbarView'
import LogoBlack from '../components/LogoBlack'

    export default {
        name: "LandingPageView",
        components: {
            NavbarView,
            LogoBlack,
        },
    }
</script>

<style scoped>

</style>