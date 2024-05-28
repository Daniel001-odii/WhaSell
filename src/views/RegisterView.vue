<template>
    
    <div class="min-h-screen flex flex-col justify-start items-center bg-app_light_green">
        <div class="flex justify-start p-3 mx-6 w-full">
            <LogoBlack/>
        </div>


        <div class="p-5 my-auto">
            <h1 class="text-5xl text-app_green font-bold">Register</h1>
            <p class="py-3">Login to continue enjoying friends with benefits</p>
            <div class="w-md border flex flex-col gap-3">
                <input type="email" placeholder="johndoe@gmail.com" class="p-3 border-2 border-black rounded-lg w-full"/>
                <input type="password" placeholder="password" class="p-3 border-2 border-black rounded-lg w-full"/>
                <button class="bg-gray-700 hover:bg-black rounded-lg p-3 text-white font-bold">Login nah!</button>
            </div>
        </div>
    </div>
</template>

<script>
import LogoBlack from '../components/LogoBlack'

    export default {
        name: "RegisterView",
        components: {
            LogoBlack,
        },
    }
</script>

<style scoped>

</style>