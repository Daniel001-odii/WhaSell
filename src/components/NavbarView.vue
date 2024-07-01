<template>
    <!-- NON AUTH NAVBAR -->
    <div v-if="!authenticated" class="w-full text-white flex flex-row items-center justify-between px-5 py-3">
        <LogoBlack/>
        <div class="flex-row gap-4 text-black hidden md:flex">
            <RouterLink to="#">About</RouterLink>
            <RouterLink to="#">Features</RouterLink>
            <RouterLink to="#">Pricing</RouterLink>
            <RouterLink to="#">Use Cases</RouterLink>
            <RouterLink to="#">Contact</RouterLink>
        </div>
        <div class="hidden md:flex flex-row gap-3 font-bold justify-stretch items-stretch">
            <RouterLink to="/login" class="text-black hover:bg-slate-200 bg-opacity-20 px-8 rounded-md flex justify-center items-center">Login
                <!-- <button class="text-black hover:bg-slate-200 bg-opacity-20 px-8 rounded-md"></button> -->
            </RouterLink>
           
            <button class="text-white bg-black px-8 py-3 rounded-md">Sign Up</button>
        </div>
    </div>

    <!-- NAVBAR FOR AUTHENTICATED USERS -->
    <div v-if="authenticated" class="bg-gray-20 border-b ">
        <div class="container mx-auto flex flex-row p-3 items-center justify-between">
            <div class="flex flex-row gap-12 items-center">
                <RouterLink to="/">
                    <img src="../assets/images/logo_black.svg"/>
                </RouterLink>
                
                
                <div class="hidden md:flex flex-row gap-10">
                    <RouterLink to="/market">Home</RouterLink>
                    <RouterLink to="/new-product">Sell</RouterLink>
                    <RouterLink to="/shops">Shops</RouterLink>
                    <RouterLink to="/likes">Likes</RouterLink>
                </div>

            </div>

            <div class="flex flex-row items-center gap-3">
                <button v-if="premium" class="bg-orange-400 text-white rounded-lg px-8 p-2 text-sm hover:bg-orange-500">Upgrade</button>
                <div class="flex flex-row items-center gap-6">
                    <div class="flex flex-row gap-3 pr-4 border-r border-gray-300">
                        <button class="relative">
                            <span class=" h-2 w-2 rounded-full bg-red-500 absolute z-10 right-1"></span>
                            <svg width="25" height="25" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.9997 3.16675C16.0603 3.16675 13.2412 4.33445 11.1626 6.41298C9.08412 8.49151 7.91641 11.3106 7.91641 14.2501V19.8361C7.91664 20.0817 7.85973 20.324 7.75016 20.5438L5.03158 25.9794C4.89878 26.245 4.83607 26.5401 4.84942 26.8367C4.86276 27.1333 4.95171 27.4216 5.10781 27.6741C5.26392 27.9267 5.482 28.1351 5.74134 28.2797C6.00068 28.4243 6.29267 28.5001 6.58958 28.5001H31.4099C31.7068 28.5001 31.9988 28.4243 32.2582 28.2797C32.5175 28.1351 32.7356 27.9267 32.8917 27.6741C33.0478 27.4216 33.1367 27.1333 33.1501 26.8367C33.1634 26.5401 33.1007 26.245 32.9679 25.9794L30.2509 20.5438C30.1408 20.3241 30.0833 20.0818 30.0831 19.8361V14.2501C30.0831 11.3106 28.9154 8.49151 26.8368 6.41298C24.7583 4.33445 21.9392 3.16675 18.9997 3.16675ZM18.9997 33.2501C18.0171 33.2504 17.0585 32.946 16.2561 32.3789C15.4536 31.8117 14.8467 31.0098 14.5189 30.0834H23.4806C23.1528 31.0098 22.5459 31.8117 21.7434 32.3789C20.941 32.946 19.9824 33.2504 18.9997 33.2501Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <CustomDropdown>
                        <template #trigger>
                            <img src="../assets/images/user_profile_img.png" class=" h-10">
                        </template>
                        <template #menu>
                            <div class="text-black bg-white rounded-md p-1 border">
                                <div class=" w-[200px] flex flex-col ">
                                    <RouterLink class="user-menu-item" to="/account">
                                        <i class="bi bi-gear mr-3"></i>Settings</RouterLink>
                                    <RouterLink class="user-menu-item" to="#">
                                        <i class="bi bi-receipt mr-3"></i>Invoices</RouterLink>
                                    <!-- <RouterLink class="user-menu-item" to="#">Followed Stores</RouterLink> -->
                                    <RouterLink class="user-menu-item" to="#">
                                        <i class="bi bi-info-circle mr-3"></i>Help & Support</RouterLink>
                                </div>
                                <div class=" border-t p-2">
                                    <button @click="logout"  class=" text-left w-full  text-black bg-transparent hover:text-red-500 hover:font-bold">
                                        <i class="bi bi-box-arrow-right mr-3"></i> Log out
                                    </button>
                                </div>
                            </div>
                        </template>
                    </CustomDropdown>
                    
                </div>
            </div>
            
        </div>

        <!-- FOR MOBILE -->
        <div class=" md:hidden bg-white text-black flex flex-row border-t w-full justify-around fixed bottom-0 z-50 p-3 text-sm">
            <RouterLink to="/market">
                <button class="flex flex-col justify-center items-center">
                    <i class="bi bi-house-door"></i>
                    <span>Home</span>
                </button>
            </RouterLink>

            <RouterLink to="/shops">
                <button class="flex flex-col justify-center items-center">
                    <i class="bi bi-shop"></i>
                    <span>Shops</span>
                </button>
            </RouterLink>

            <RouterLink to="/likes">
                <button class="flex flex-col justify-center items-center">
                    <i class="bi bi-hand-thumbs-up"></i>
                    <span>Likes</span>
                </button>
            </RouterLink>

            <RouterLink to="/new-product">
                <button class="flex flex-col justify-center items-center">
                    <i class="bi bi-tag"></i>
                    <span>Sell</span>
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import CustomDropdown from './CustomDropdown.vue';
import LogoBlack from './LogoBlack.vue';
import axios from 'axios'


export default {
        name: "NavbarView",
        components: {
            LogoBlack,
            CustomDropdown,
        },
        data(){
            return{
                authenticated: true,
                premium: false,
            }
        },

        methods:{
            async logout() {
                try {
                    const response = await axios.post('/logout');
                    console.log(response.data);
                    this.$router.push('/login');
                } catch (error) {
                    console.error(error);
                }
            },

            checkAuthenticationState(){
                this.authenticated = localStorage.getItem("is_authenticated");
            }
        },

        mounted(){
            this.checkAuthenticationState();
        }
    }
</script>

<style scoped>
    .user-menu-item{
        @apply hover:bg-slate-100  p-2 pl-2 rounded-md
    }
</style>