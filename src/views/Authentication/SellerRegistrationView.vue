<template>
    <!-- <div> -->
        <div class=" min-h-screen flex flex-col md:flex-row">
            <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-12 md:p-12">
                <div class=" p-3">
                    <form onsubmit.prevent="register()">
                        <h1 class="text-4xl font-bold text-app_green mb-3">Sign up Seller</h1>
                        <p class="my-6">What do you intend doing on Whasell?</p>
                        <div class="flex flex-col md:flex-row gap-5">
                            <label for="buyer" class="input-type" :class="user_type == 'buyer' ? 'border-app_green':''">
                                <div class="flex flex-row justify-between w-full">
                                    <span class="text-2xl font-bold">Buyer</span>
                                    <input v-model="user_type" type="radio" name="user-type" id="buyer"value="buyer">
                                </div>
                                <p>As a buyer I intend on browsing and buying product listings only</p>
                            </label>

                            <label for="seller" class="input-type" :class="user_type == 'seller' ? 'border-app_green':''">
                                <div class="flex flex-row justify-between w-full">
                                    <span class="text-2xl font-bold">Seller</span>
                                    <input v-model="user_type" type="radio" name="user-type" id="seller"value="seller" class=" checked:bg-app_green checked:border-app_green">
                                </div>
                                <p>As a seller I intend on listing, selling and buying products only</p>
                            </label>
                        </div>
                        <button class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-12 hover:bg-opacity-80">Let moove!</button>
                    </form>
                </div>
            </div>
            <div class=" hidden md:flex bg-app_green w-[50%] min-h-screen"></div>
        </div>
    <!-- </div> -->
</template>

<script>
    export default {
        name: "SellerRegistrationView",
        data(){
            return{
                user_type: "",
            }
        }
    }
</script>

<style scoped>
.input-type{
    @apply flex border flex-col p-3 rounded-lg justify-start items-start gap-5
}

input[type="radio"]:checked{
    @apply bg-app_green border border-app_green
}
</style>