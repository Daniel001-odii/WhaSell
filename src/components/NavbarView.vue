<template>
    <FullPageModal @close-modal="unauthorized = false" v-if="unauthorized"/>
  
    <!-- FEEDBACK -->
     <div v-if="feedback_modal" class=" min-h-screen fixed w-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50 p-3">
        <div class="bg-white size-40 rounded-md flex flex-col justify-center items-center w-[400px] h-fit">
            <div class="w-full flex flex-row justify-between p-3 border-b">
                <div class="font-bold flex flex-row gap-2">
                    <img src="../assets/images/feedback-icon.png" class=" !size-8">
                    <span class="text-xl">Feedback</span>
                </div>
                <button class=" text-2xl" @click="feedback_modal = !feedback_modal">&times;</button>
            </div>
            <div class="flex flex-col p-5 text-center">
                <h1 class="text-3xl font-bold">How are you feeling?</h1>
                <p class="mt-3">Your feedback is invaluable in helping us better understand your  need and tailor our service accordingly.</p>
                <form>
                    <div class="flex flex-row justify-between mt-12">
                        <div class="text-sm flex flex-col justify-center items-center gap-3 cursor-pointer">
                            <div @click="feeling = 0" class="p-5 rounded-full border-gray-100 hover:border-4" :class="feeling == 0 ? 'bg-green-400':''">
                                <img src="../assets/images/sad.png" class=" size-16">
                            </div>
                            <span>Disappointed</span>
                        </div>

                        <div class="text-sm flex flex-col justify-center items-center gap-3 cursor-pointer ">
                            <div @click="feeling = 1" class="p-5 rounded-full border-gray-100 hover:border-4" :class="feeling == 1 ? 'bg-green-400':''">
                                <img src="../assets/images/good.png" class=" size-16">
                            </div>
                            <span>Good</span>
                        </div>

                        <div class="text-sm flex flex-col justify-center items-center gap-3 cursor-pointer">
                            <div @click="feeling = 2" class="p-5 rounded-full border-gray-100 hover:border-4" :class="feeling == 2 ? 'bg-green-400':''">
                                <img src="../assets/images/awesome.png" class=" size-16">
                            </div>
                            <span>Awesome</span>
                        </div>
                    </div>
                    <textarea placeholder="Why do you feel this way, and what can we do to make it better?" class=" min-h-20 w-full p-3 text-sm  bg-gray-100 rounded-lg mt-12"></textarea>
                    <button class="btn bg-green-500 text-white w-full mt-3 shadow-lg font-bold text-sm">Submit Now</button>
                </form>
            </div>
        </div>
     </div>

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
                         <div class="group-hover:flex hidden absolute  font-light text-sm top-6 -left-52 z-50 ">
                            <div class="shadow-lg p-6 mt-6 w-[650px] bg-white rounded-lg">
                                 <div class="flex flex-row gap-2">
                                    <div class="w-[35%] bg-red-5 flex flex-col gap-2">
                                        <span class="hover:bg-gray-100 p-1 rounded-md" v-for="category in shop_categories.splice(0,5)">{{ category }}</span>
                                    </div>
                                    <div class="w-[35%] bg-blue-5 h-16 flex flex-col gap-2">
                                        <span class="hover:bg-gray-100 p-1 rounded-md"  v-for="category in shop_categories">{{ category }}</span>
                                    </div>
                                    <div class="w-[35%] bg-orange-5 h-16 flex flex-col gap-2">
                                        <span  class="hover:bg-gray-100 p-1 rounded-md"  v-for="category in shop_categories">{{ category }}</span>
                                    </div>
                                    <!-- <button class="p-5 hover:bg-gray-100 rounded-md border" v-for="category in shop_categories">{{ category }}</button> -->
                                </div>
                            </div>
                           
                         </div>
                    </div>
                    
                    <RouterLink to="/shops">Shops</RouterLink>
                    <RouterLink to="/likes">Glips</RouterLink>
                </div>

            </div>

            <div class="flex flex-row items-center justify-center gap-8 relative">
                <RouterLink to="/likes">
                    <button>
                        <i class="bi bi-hand-thumbs-up-fill text-2xl" :class="isLikes ? 'text-green-500':''"></i>
                    </button>
                </RouterLink>

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
                    <CustomDropdown v-if="user">
                        <template #trigger>
                            <div class=" uppercase font-bold flex justify-center items-center rounded-full !size-10 bg-blue-500 text-white"> {{ user.username[0] }}{{ user.username[1] }}</div>
                            <!-- <i class="bi bi-person-circle text-4xl text-gray-400"></i> -->
                            <!-- <img :src="user.profile.image_url" class=" size-10 rounded-full"> -->
                        </template>
                        <template #menu>
                            <div class="text-black bg-white rounded-xl relative top-5 border w-[350px] p-3">
                                <RouterLink to="/account">
                                    <div class="flex flex-row items-center justify-between p-3 rounded-md cursor-pointer hover:bg-gray-100">
                                        <div class="flex flex-row gap-3 items-center justify-start ">
                                            <div>
                                                <div class=" uppercase font-bold flex justify-center items-center rounded-full !size-10 bg-blue-500 text-white"> {{ user.username[0] }}{{ user.username[1] }}</div>
                                                <!-- <i class="bi bi-person-circle text-4xl text-gray-400"></i> -->
                                                <!-- <img :src="user.profile.image_url" class=" size-10 rounded-full"> -->
                                            </div>
                                            <div class="flex flex-col">
                                                <p class="text-xl font-bold">{{ user.username }}</p>
                                                <span class="text-sm">{{ user.email }}</span>
                                            </div>
                                        </div>
                                        
                                            <button>
                                                <i class="pi pi-chevron-right text-sm"></i>
                                            </button>
                                      
                                    </div>
                                </RouterLink>
                                <div class="flex flex-col ">
                                    <!-- <RouterLink class="user-menu-item" to="/account">
                                        <i class="bi bi-gear mr-3"></i>Settings
                                    </RouterLink> -->
                                    <RouterLink class="user-menu-item" to="#">
                                        <i class="bi bi-stack mr-3"></i>Inventory
                                    </RouterLink>
                                    <!-- <RouterLink class="user-menu-item" to="#">Followed Stores</RouterLink> -->
                                    <RouterLink class="user-menu-item" to="#">
                                        <i class="bi bi-geo-fill mr-3"></i>Location
                                    </RouterLink>
                                </div>
                                <div class=" border-t mt-3 pt-3 w-full flex justify-start items-start">
                                    <button @click="logout"  class=" text-red-500 user-menu-item w-full flex items-start justify-start">
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
        <div v-if="false" class=" md:hidden bg-white text-black flex flex-row border-t w-full justify-around fixed bottom-0 z-50 p-3 text-sm">
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


      <!-- NON AUTH NAVBAR -->
      <div v-else class="w-full p-5 flex flex-col md:flex-row items-center h-full bg-app_light_green border-b border-gray-300">
        <div class=" border-red-500   md:w-fit w-full flex flex-row justify-between items-center">
            <LogoBlack/>
     

            <button @click="nav_open = !nav_open" class="text-black text-2xl font-bold inline-block md:hidden">
                <i class="bi bi-list"></i>
            </button>
        </div>

        <div :class="nav_open ? 'flex':'hidden md:flex'" class=" w-full flex-col gap-3 md:flex-row md:justify-between md:items-center  border-red-500">
            <div class="w-full md:w-fit md:p-0 mt-4 md:mt-0 flex-col md:flex-row gap-2 text-black flex  border-red-500 relative mx-auto my-0">
                <RouterLink class="nav-link" to="#">About</RouterLink>
                <RouterLink class="nav-link" to="#">Features</RouterLink>
                <RouterLink class="nav-link" to="#">Pricing</RouterLink>
                <RouterLink class="nav-link" to="#">Use Cases</RouterLink>
                <RouterLink class="nav-link" to="#">Contact</RouterLink>
            </div>

            <div class="flex flex-row gap-3 font-bold  border-red-500  self-end align-bottom">
                <RouterLink to="/login" class="text-black hover:bg-slate-200 bg-opacity-20 px-8 rounded-md flex justify-center items-center">Login</RouterLink>
                <RouterLink to="/register">
                    <button class="text-white bg-black px-8 py-3 rounded-md">Sign Up</button>
                </RouterLink>
            </div>
        </div>
      
    </div>
</template>

<script>
import CustomDropdown from './CustomDropdown.vue';
import LogoBlack from './LogoBlack.vue';
import axios from 'axios'

import FullPageModal from '../components/FullPageModal.vue';

export default {
    name: "NavbarView",
    components: {
        LogoBlack,
        CustomDropdown,
        FullPageModal
    },
    data(){
        return{
            nav_open: false,
            authenticated: false,
            premium: false,
            flip: false,
            user: '',

            unauthorized: false,

            feedback_modal: false,
            feeling: null,
          
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

        async getUserDetails(){
            try{
              
                const response = await axios.get('/user');
                this.user = response.data.user;
                localStorage.setItem('user', response.data.user._id);
                // console.log("user :", response);
            }catch(error){
                this.authenticated = false;
                
                if(error.response.status == 401){
                    this.unauthorized = true;
                    // window.location.reload();
                    // alert('session expired please login!');
                };

                /*
                this.$toast.open({
                    message: `${error.response.data.message}`,
                    type: 'error',
                });
                */
            }
        },

        async logout() {
            try {
                const response = await axios.post('/logout');
                localStorage.clear();
                console.log(response.data);
                window.location.reload();
                // this.authenticated = false,
            } catch (error) {
                console.error(error);
            }
        },

        checkAuthenticationState(){
            this.authenticated = localStorage.getItem("is_authenticated");
        }
    },

    computed:{
        isLikes(){
            return this.$route.path.startsWith('/likes')
        }
    },

    mounted(){
        document.addEventListener('click', this.close);
        this.checkAuthenticationState();    
        this.getUserDetails();

        // show feedback...
        // setTimeout(()=>{
        //     this.feedback_modal = true;
        // },10000)
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


    .nav-link{
        @apply hover:bg-gray-600 hover:text-white p-3 rounded-lg
    }


    .rating-btn{
        background: linear-gradient(187deg, #FFF64920.07%, #0BDC6880.03%, #3CA16911.06%);
    }
</style>