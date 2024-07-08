<template>
  

    <!-- NAVBAR FOR AUTHENTICATED USERS -->
    <div v-if="authenticated" class="bg-gray-20 border-b ">
        <div class="container mx-auto flex flex-row p-3 items-center justify-between">
            <div class="flex flex-row gap-12 items-center">
                <RouterLink to="/">
                    <img src="../assets/images/logo_black.svg"/>
                </RouterLink>
                
                
                <div class="hidden md:flex flex-row gap-10 font-bold">
                    <RouterLink to="/market">Home</RouterLink>
                    <div class="relative group">
                        <span class=" cursor-pointer flex items-center justify-center gap-3 ">Categories <i class="pi pi-chevron-down text-[14px]"></i></span>

                        <!-- CATEGORIES MENU -->
                         <div class="group-hover:flex hidden absolute  font-light text-sm top-6 -left-20 z-50 ">
                            <div class="shadow-lg p-6 mt-4 w-[650px] bg-white rounded-lg">
                                 <div class="flex flex-row flex-wrap gap-2">
                                    <button class="p-5 hover:bg-gray-100 rounded-md border" v-for="category in shop_categories">{{ category }}</button>
                                </div>
                            </div>
                           
                         </div>
                    </div>
                    
                    <RouterLink to="/shops">Shops</RouterLink>
                    <RouterLink to="/likes">Glips</RouterLink>
                </div>

            </div>

            <div class="flex flex-row items-center justify-center gap-8 relative">
                <button>
                    <i class="bi bi-hand-thumbs-up-fill text-2xl"></i>
                </button>

                <!-- <button v-if="premium" class="bg-orange-400 text-white rounded-lg px-8 p-2 text-sm hover:bg-orange-500">Upgrade</button> -->
                
                <div class="flex flex-row items-center gap-6">
                    <div class="flex flex-row gap-3 pr-4 border-r border-gray-300">
                        
                        <CustomDropdown>
                            <template #trigger>
                                <button class="relative">
                                    <i class="bi bi-bell-fill text-2xl"></i>
                                </button>
                            </template>
                            <template #menu>
                                <div class="md:min-w-[450px] w-[400px] z-40 relative shadow-md bg-white top-5 right-0 rounded-xl flex flex-col p-3">
                                    <div class="flex flex-row justify-between">
                                        <span class="font-bold">Notifications</span>
                                        <div class="flex flex-row gap-3">
                                            <i class="bi bi-trash"></i>
                                            <i class="bi bi-x"></i>
                                        </div>
                                    </div>
                                    <div class="flex flex-row justify-between mt-3 border-b pb-5 mb-4">
                                        <div class="bg-app_green px-2 py-1 rounded-lg text-white">
                                            <div>All <span class="bg-white text-black px-2 rounded-md font-bold">8</span></div>
                                        </div>
                                        <button>
                                            <i class="bi bi-gear"></i>
                                        </button>
                                    </div>
                                    <div class="flex flex-col gap-5">
                                        <div class="flex flex-row shadow-md p-3 rounded-xl gap-3" v-for="notify in 3">
                                            <div class=" h-14 w-14 rounded-lg bg-gray-200"></div>
                                            <div>
                                                <p class=""> <span class="font-bold">Edwards Dabere</span> followed your shop</p>
                                                <span>Just now</span>
                                                <i class="bi bi-person-add ml-4"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </CustomDropdown>
                    </div>
                    <CustomDropdown>
                        <template #trigger>
                            <img src="../assets/images/user_profile_img.png" class=" h-10">
                        </template>
                        <template #menu>
                            <div class="text-black bg-white rounded-md p-1 relative top-5 border w-[350px]">
                                <div class="flex flex-row items-center justify-between p-1">
                                    <div class="flex flex-row gap-3 items-center justify-start">
                                        <div>
                                            <i class="bi bi-person-circle text-4xl text-gray-400"></i>
                                        </div>
                                        <div class="flex flex-col">
                                            <p class="text-xl font-bold">Edwards Andrew</p>
                                            <span class="text-sm">edwardsandrew123@gmail.com</span>
                                        </div>
                                    </div>
                                    <button>
                                        <i class="pi pi-chevron-right text-sm"></i>
                                    </button>
                                </div>
                                <div class="flex flex-col ">
                                    <RouterLink class="user-menu-item" to="/account">
                                        <i class="bi bi-gear mr-3"></i>Settings</RouterLink>
                                    <RouterLink class="user-menu-item" to="#">
                                        <i class="bi bi-receipt mr-3"></i>Invoices</RouterLink>
                                    <!-- <RouterLink class="user-menu-item" to="#">Followed Stores</RouterLink> -->
                                    <RouterLink class="user-menu-item" to="#">
                                        <i class="bi bi-info-circle mr-3"></i>Help & Support</RouterLink>
                                </div>
                                <div class=" border-t p-2 pt-5">
                                    <button @click="logout"  class=" text-left w-full  text-black bg-transparent text-red-500 hover:font-bold">
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
    data(){
        return{
            authenticated: true,
            premium: false,
            flip: false,
            shop_categories: [
                    "electronics",
                    "furniture",
                    "clothing & textile",
                    "fashion & beauty",
                    "health",
                    "tools & industrial",
                    "arts & crafts",
                    "footwears",
                    "phone & telecoms", 
                    "accessories", 
                    "phones",
                    "baby, kids & toys",
                    "drinks & groceries",
                    "other"
                ],
        }
    },
    components: {
        LogoBlack,
        CustomDropdown,
    },
    

    methods:{
        // toggleNotificationMenu (e) {
        //     this.notifications_menu = !this.notifications_menu;
        // },
        toggleNotificationMenu (e) {
            this.flip = !this.flip
        },

        close (e) {
            if (!this.$el.contains(e.target)) {
                this.flip = false;
            }
        },

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
        document.addEventListener('click', this.close);
        this.checkAuthenticationState();
        
    },
    beforeDestroy () {
        document.removeEventListener('click',this.close)
    },
    }
</script>

<style scoped>
    .user-menu-item{
        @apply hover:bg-slate-100  p-2 pl-2 rounded-md
    }
</style>