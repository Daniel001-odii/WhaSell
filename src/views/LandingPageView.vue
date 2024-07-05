<template>
    <div class="bg-app_light_green">
        <NavbarView class="container mx-auto"/>
    </div>
    
    <div class="bg-app_light_green">
        <div class="container mx-auto h-[700px] bg-app_light_green flex flex-col justify-center items-center">
            <div class="text-center">
                <h1 class="text-8xl text-center font-bold">
                    <span class=" text-app_green">WhatsApp</span> Sales<br/>just got
                    <span class=" text-app_green">beta!</span>
                </h1>
                <p class=" pt-4 text-sm">convert your sales from WhatsApp easily, save time and scale fast</p>
                <div class=" font-bold mt-5 flex flex-row gap-5 items-center justify-center flex-wrap">
                    <button class=" bg-[#16492D] hover:bg-black text-white p-3 rounded-md px-8">Start Selling</button>
                    <button class="border border-black hover:bg-app_green hover:text-white hover:border-transparent rounded-md text-black p-3 px-8">Shop Now!</button>
                </div>
            </div>
        </div>

       


    </div>

    <section class="mx-auto border border-red-50 max-w-screen-2xl flex flex-col gap-4">

        
        <div class="w-full mt-6 flex justify-center">
            <span class="tag_box">
            <i class="bi bi-key-fill text-2xl"></i>
                Key Features
            </span>
        </div>

        <div class="section_box">
            <div>
                <img class="h-[300px]" src="../assets/images/image_1.png">
            </div>
            <div class="section_sub">
                <h2 class="section_title">Seamless Integration</h2>
                <p class="section_text">
                    Do you know that as a seller on WhatSell you can effortlessly sync up your product posts for instant customer engagement by seamlessly integrating your shop with your WhatsApp.<br/><br/>Keep your customers always updated with a few clicks... 
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-20 justify-center items-center md:flex-row-reverse bg-app_green rounded-[50px] md:m-20 m-5 p-20 text-white">
            <div>
                <img class="h-[300px]" src="../assets/images/image_1.png">
            </div>
            <div class="section_sub">
                <h2 class="section_title">Boost your reach</h2>
                <p class="section_text">
                    Do you know that as a seller on WhatSell you can effortlessly sync up your product posts for instant customer engagement by seamlessly integrating your shop with your WhatsApp.<br/><br/>Keep your customers always updated with a few clicks... 
                </p>
                <button class=" w-fit bg-black text-white p-3 rounded-md px-8">Try now, no dull oo!</button>
            </div>
        </div>

        <!-- NEXT BOX -->
        <div class="section_box">
            <div>
                <img class="h-[300px]" src="../assets/images/image_3.png">
            </div>
            <div class="section_sub">
                <h2 class="section_title">Simple, Swift and Efficient</h2>
                <p class="section_text">
                    Post, share, Create Invoices and sell in a few clicks – it's that easy
                </p>
            </div>
        </div>

        <!-- NEXT BOX -->
        <div class="flex flex-col gap-20 justify-center items-center md:flex-row-reverse bg-black rounded-[50px] md:m-20 m-5 p-20 text-white">
            <div>
                <img class="h-[300px]" src="../assets/images/image_2.png">
            </div>
            <div class="section_sub">
                <h2 class="section_title">Ease your work</h2>
                <p class="section_text">
                    Save time posting your products on your status. You can easily list your products and update your status at an instant.
                </p>
                <button class=" w-fit bg-app_green text-white p-3 rounded-md px-8">Try for free!</button>
            </div>
        </div>

        <!-- NEXT BOX -->
        <div class=" flex flex-col md:flex-row items-center justify-center bg-app_light_green p-20">
            <img class="" src="../assets/images/WhatSell-hand.png">
            <div class="flex flex-col gap-3">
                <h2 class="font-bold text-3xl text-app_green">Direct Communication</h2>
                <p class=" text-2xl">Facilitate immediate customer interactions and sales through WhatsApp</p>
                <button class=" w-fit bg-black font-bold hover:bg-gray-600 text-white p-3 rounded-md px-8">Register now!</button>
            </div>
        </div>

        <div class="w-full mt-6 flex justify-center">
            <span class="tag_box">
            <i class="bi bi-lock-fill text-2xl"></i>
                Use Cases
            </span>
        </div>

        <div class="flex flex-row flex-wrap gap-8 bg-app_light_green justify-center p-2 w-fit mx-auto px-8 rounded-md">
            <button class="px-6 py-2 bg-green-700 rounded-sm text-white">Purchasing</button>
            <button class="toggle-button">Listing</button>
            <button class="toggle-button">Creating Invoices</button>
            <button class="toggle-button">Customer interaction</button>
        </div>

        <div class=" flex flex-col md:flex-row-reverse items-center justify-center bg-app_light_green px-20 gap-20">
            <img class="" src="../assets/images/WhatSell-circle.png">
            <div class="flex flex-col gap-3">
                <h2 class="font-bold text-3xl text-app_green">Shopping with steeze!</h2>
                <p class=" text-2xl">As a buyer on WhatSell you can shop in style from thousands of local shops found around your vicinity and get your order shipped in minutes! </p>
                <!-- <button class=" w-fit bg-black font-bold hover:bg-gray-600 text-white p-3 rounded-md px-8">Register now!</button> -->
            </div>
        </div>


    </section>


   <TheFooter/>
</template>

<script>
import NavbarView from '../components/NavbarView'
import TheFooter from '../components/TheFooter'

    export default {
        name: "LandingPageView",
        components: {
            NavbarView,
            TheFooter,
        },
    }
</script>

<style scoped>
.button-active{
    @apply bg-green-700 rounded-sm text-white;
}

.toggle-button{
    @apply px-6 py-2
}

.tag_box{
    @apply text-center bg-app_light_green text-app_green p-3 rounded-sm capitalize flex items-center justify-center w-fit gap-3;
}

.section_start{
    @apply max-w-4xl mx-auto flex flex-col-reverse gap-5 items-center justify-center p-5 pl-12;
}
.section_sub{
    @apply flex flex-col flex-1 gap-3 justify-center items-center text-center md:text-left md:items-start
}



.section_box{
    @apply flex flex-col gap-20 justify-center items-center p-8 md:flex-row
}

/* .section_box2{
    @apply flex flex-col gap-20 justify-center items-center p-8 md:flex-row-reverse
} */

.section_title{
    @apply font-bold text-4xl ;
}

.section_text{
    @apply text-lg
}
</style>