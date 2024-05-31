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
                        <button class=" btn">Start Selling</button>
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
.btn{
    background-color: #1b6df3;
    height: 100%;
    border-radius: 8px;
    box-shadow: rgba(10, 10, 10, 0.05) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 2.76726px 2.21381px 0px, rgba(0, 0, 0, 0.027) 0px 6.6501px 5.32008px 0px, rgba(0, 0, 0, 0.035) 0px 12.5216px 10.0172px 0px, rgba(0, 0, 0, 0.043) 0px 22.3363px 17.869px 0px, rgba(0, 0, 0, 0.05) 0px 41.78px 33.4221px 0px, rgba(0, 0, 0, 0.07) 0px 100px 80px 0px, rgba(0, 0, 0, 0.15) 0px -2px 1px 0px inset, rgba(255, 255, 255, 0.15) 0px 2px 1px 0px inset;
    opacity: 1;
    padding: 12px 20px;
    color: white;
}
</style>