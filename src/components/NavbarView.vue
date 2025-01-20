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
    <div v-if="authenticated" class="bg-gray-20 border-b flex flex-col gap-3">
        <div class="container mx-auto flex flex-row p-3 items-center justify-between">
            <div class="flex flex-row gap-12 items-center">
                <RouterLink to="/">
                    <img src="../assets/images/logo_black.svg"/>
                </RouterLink>
                
                
                <div class="hidden md:flex flex-row gap-10 font-bold">
                    <RouterLink to="/market">Home</RouterLink>
                    <RouterLink to="/shops">Shops</RouterLink>
                    <RouterLink to="/glips">Glips</RouterLink>
                </div>

            </div>

            <div class="flex flex-row items-center justify-center gap-3 relative">
                <RouterLink :to="{ path: '/account/subscriptions', hash: '#coins' }">
                    <span class="flex flex-row items-center font-bold text-xl" v-if="user"> <img src="../assets/images/coins_group.png" class=" h-[30px] mr-1"> {{formattedCoins}}</span>
                </RouterLink>
                <RouterLink to="/likes" class="hidden md:block">
                    <button>
                        <i class="bi bi-hand-thumbs-up-fill text-2xl" :class="isLikes ? 'text-green-500':''"></i>
                    </button>
                </RouterLink>

                <!-- <button v-if="premium" class="bg-orange-400 text-white rounded-lg px-8 p-2 text-sm hover:bg-orange-500">Upgrade</button> -->
                
                <div class="flex flex-row items-center gap-3">
                    <div class="flex flex-row gap-3 border-r border-gray-300">
                        
                       <!--  <CustomDropdown>
                            <template #trigger>
                                <button class="relative ">
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
                        </CustomDropdown> -->
                    </div>

                    <CustomDropdown v-if="user">
                        <template #trigger>
                           <!--  <div class=" uppercase font-bold flex justify-center items-center rounded-full !size-10 bg-green-500 text-white"> {{ user.username[0] }}{{ user.username[1] }}</div> -->
                           <!--  <i class="bi bi-person-circle text-4xl text-gray-400"></i> -->
                            <img src="../assets/images/avatar.png" class=" size-10 rounded-full">
                        </template>
                        <template #menu>
                            <div class="text-black bg-white rounded-xl relative top-5 border w-[350px] p-3">
                                <RouterLink to="/account">
                                    <div class="flex flex-row items-center justify-between p-3 rounded-md cursor-pointer hover:bg-gray-100">
                                        <div class="flex flex-row gap-3 items-center justify-start ">
                                            <div>
                                                <div class=" uppercase font-bold flex justify-center items-center rounded-full !size-10 bg-green-500 text-white"> {{ user.username[0] }}{{ user.username[1] }}</div>
                                                <!-- <i class="bi bi-person-circle text-4xl text-gray-400"></i> -->
                                                <!-- <img :src="user.profile.image_url" class=" size-10 rounded-full"> -->
                                            </div>
                                            <div class="flex flex-col">
                                                <span class="text-xl font-bold">{{ user.username }}</span>
                                                
                                                <span class="text-sm">{{ user.email }}</span>
                                                <span class=" px-3 text-[10px] text-white rounded-lg w-fit" :class="user.account_type == 'buyer' ?'bg-red-500':'bg-gray-500'">{{ user.account_type }}</span>
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
                                    <!-- http://localhost:8080/account/shop -->
                                    <RouterLink class="user-menu-item" :to="{ path: '/account/shop', hash: '#inventory' }">
                                        <i class="bi bi-stack mr-3"></i>Inventory
                                    </RouterLink>
                                    <!-- <RouterLink class="user-menu-item" to="#">Followed Stores</RouterLink> -->
                                    <RouterLink class="user-menu-item" :to="{ path: '/account', hash: '#location' }">
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
        <div v-if="true"  :class="isHidden ? '-bottom-20':'bottom-2'" class=" md:hidden bg-white text-gray-400 flex flex-row w-[95%] justify-around fixed left-0 right-0  border-t shadow-xl z-50 p-3 text-[10px] rounded-xl mx-auto items-center mobile-nav">
        <!-- <div :class="isHidden ? '-bottom-20':'bottom-0'" class="mobile-nav"> -->

            <RouterLink to="/market">
                <button :class="isHome ? 'text-green-500  ':''" class="flex flex-col justify-center items-center">
                    <svg width="30" height="30" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_470_61039)">
                        <path d="M19.793 9.07276L14.2378 4.75192C13.7502 4.37266 13.1502 4.16675 12.5326 4.16675C11.9149 4.16675 11.3149 4.37266 10.8273 4.75192L5.27109 9.07276C4.93718 9.33243 4.66702 9.66497 4.48126 10.045C4.29549 10.425 4.19902 10.8425 4.19922 11.2655V18.7655C4.19922 19.318 4.41871 19.8479 4.80941 20.2386C5.20011 20.6293 5.73002 20.8488 6.28255 20.8488H18.7826C19.3351 20.8488 19.865 20.6293 20.2557 20.2386C20.6464 19.8479 20.8659 19.318 20.8659 18.7655V11.2655C20.8659 10.4082 20.4701 9.5988 19.793 9.07276Z" fill="currentColor" />
                        <path d="M16.6668 15.625C14.3647 17.0135 10.6335 17.0135 8.3335 15.625" stroke="#FAFAFA" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_470_61039">
                        <rect width="30" height="30" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span>Market</span>
                </button>

              <!--   <button :class="isHome ? 'text-green-500  ':''" class="flex flex-col justify-center items-center">
                    <i class="bi bi-house-door-fill mobile-menu-icon"></i>
                    <span>Home</span>
                </button> -->
            </RouterLink>

           
            <RouterLink to="/likes">
                <button :class="isLikes ? 'text-green-500  ':''" class="flex flex-col justify-center items-center gap-3">
                    <i class="bi bi-hand-thumbs-up-fill mobile-menu-icon size-[20px]"></i>
                    <span>Likes</span>
                </button>
            </RouterLink>

            <RouterLink to="/products/new" v-if="user && user.account_type == 'seller'">
                <button :class="isNewProduct ? 'text-green-500':''" class="flex flex-col justify-center items-center gap-3">
                    <i class="bi bi-plus-square-fill mobile-menu-icon size-[20px]"></i>
                    <span>New Product</span>
                </button>
            </RouterLink>
            
            <RouterLink to="/shops">
                <button :class="isShops ? 'text-green-500':''" class="flex flex-col justify-center items-center">
                    <!-- <i class="bi bi-bag-fill mobile-menu-icon"></i> -->
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.9998 21.5H22.4373C22.3876 21.5 22.3399 21.4803 22.3047 21.4451C22.2696 21.41 22.2498 21.3623 22.2498 21.3125V13.3208C22.2502 13.291 22.2436 13.2615 22.2303 13.2348C22.217 13.208 22.1976 13.1849 22.1735 13.1672C22.1495 13.1495 22.1216 13.1378 22.0922 13.133C22.0627 13.1283 22.0326 13.1306 22.0042 13.1399C21.5741 13.2751 21.1274 13.3505 20.6767 13.364C20.6214 13.364 20.5689 13.3663 20.5173 13.3663C19.6505 13.3683 18.7976 13.1482 18.04 12.7269C17.9826 12.695 17.9181 12.6783 17.8525 12.6783C17.7869 12.6783 17.7223 12.695 17.665 12.7269C16.9076 13.1482 16.0548 13.3683 15.1881 13.3663C14.3263 13.3675 13.4789 13.1448 12.729 12.7199C12.6712 12.6871 12.6059 12.6699 12.5394 12.6699C12.473 12.6699 12.4077 12.6871 12.3498 12.7199C11.5887 13.1464 10.7304 13.3692 9.85795 13.3668C8.99031 13.3673 8.1376 13.1411 7.38435 12.7105C7.32607 12.6773 7.26016 12.6599 7.1931 12.6599C7.12604 12.6599 7.06014 12.6773 7.00185 12.7105C6.24861 13.1411 5.39589 13.3673 4.52826 13.3668C4.47717 13.3668 4.4256 13.3668 4.37029 13.3644H4.36748C3.90097 13.3504 3.43884 13.2701 2.99498 13.1258C2.96687 13.1167 2.93701 13.1144 2.90784 13.1191C2.87867 13.1237 2.85101 13.1352 2.82711 13.1526C2.80321 13.1699 2.78375 13.1927 2.77032 13.219C2.75689 13.2453 2.74987 13.2744 2.74982 13.304V21.3125C2.74982 21.3623 2.73007 21.41 2.6949 21.4451C2.65974 21.4803 2.61205 21.5 2.56232 21.5H2.02326C1.61826 21.5 1.26857 21.8113 1.25076 22.2163C1.2462 22.3175 1.2622 22.4186 1.29778 22.5135C1.33337 22.6083 1.3878 22.695 1.45781 22.7682C1.52781 22.8415 1.61193 22.8998 1.70509 22.9396C1.79824 22.9795 1.8985 23 1.99982 23H22.9764C23.3814 23 23.7311 22.6888 23.7489 22.2838C23.7534 22.1826 23.7374 22.0815 23.7019 21.9866C23.6663 21.8918 23.6118 21.8051 23.5418 21.7319C23.4718 21.6586 23.3877 21.6003 23.2946 21.5605C23.2014 21.5206 23.1011 21.5001 22.9998 21.5ZM10.9998 18.3125C10.9998 18.3623 10.9801 18.41 10.9449 18.4451C10.9097 18.4803 10.8621 18.5 10.8123 18.5H6.68732C6.63759 18.5 6.5899 18.4803 6.55474 18.4451C6.51958 18.41 6.49982 18.3623 6.49982 18.3125V15.3125C6.49982 15.1634 6.55909 15.0203 6.66458 14.9148C6.77006 14.8093 6.91314 14.75 7.06232 14.75H10.4373C10.5865 14.75 10.7296 14.8093 10.8351 14.9148C10.9406 15.0203 10.9998 15.1634 10.9998 15.3125V18.3125ZM18.3123 21.5H14.9373C14.8876 21.5 14.8399 21.4803 14.8047 21.4451C14.7696 21.41 14.7498 21.3623 14.7498 21.3125V15.3125C14.7498 15.1634 14.8091 15.0203 14.9146 14.9148C15.0201 14.8093 15.1631 14.75 15.3123 14.75H17.9373C18.0865 14.75 18.2296 14.8093 18.3351 14.9148C18.4406 15.0203 18.4998 15.1634 18.4998 15.3125V21.3125C18.4998 21.3623 18.4801 21.41 18.4449 21.4451C18.4097 21.4803 18.3621 21.5 18.3123 21.5Z" fill="currentColor"/>
<path d="M23.5891 8.48187L21.5772 3.86516C21.0504 2.73219 19.8471 2 18.5116 2H6.48582C5.15035 2 3.94707 2.73219 3.4202 3.86516L1.40832 8.48187C0.986446 9.39172 1.54379 10.3259 1.54426 10.3264L1.55738 10.3475C1.58035 10.3841 1.62113 10.4412 1.64598 10.4778C1.64832 10.4806 1.6502 10.4839 1.65254 10.4872L1.88692 10.7708C1.89568 10.7815 1.90507 10.7917 1.91504 10.8012L2.14941 11.0277L2.1691 11.0445C2.30674 11.1625 2.45397 11.2688 2.60926 11.3623V11.3647C3.1194 11.6737 3.70061 11.846 4.29676 11.8648C4.3352 11.8648 4.37363 11.8648 4.41254 11.8648C5.31454 11.8665 6.18368 11.5263 6.84488 10.9128L6.86035 10.8983C6.92941 10.8332 7.02071 10.797 7.11559 10.797C7.21047 10.797 7.30177 10.8332 7.37082 10.8983L7.38629 10.9128C8.05454 11.5253 8.92809 11.8651 9.83457 11.8651C10.741 11.8651 11.6146 11.5253 12.2829 10.9128C12.3522 10.8486 12.4432 10.813 12.5376 10.813C12.6321 10.813 12.7231 10.8486 12.7924 10.9128C13.4587 11.5234 14.329 11.8629 15.2327 11.8649C16.1364 11.8669 17.0083 11.5312 17.6772 10.9236C17.7455 10.8603 17.8352 10.8252 17.9282 10.8252C18.0213 10.8252 18.111 10.8603 18.1793 10.9236C18.8489 11.5349 19.7246 11.871 20.6313 11.8648H20.748C21.3292 11.8431 21.8947 11.6703 22.3886 11.3633C22.4332 11.3366 22.4758 11.3084 22.5189 11.2803C22.8521 11.0557 23.142 10.7729 23.3749 10.4455L23.4564 10.3222C23.4646 10.3097 23.4721 10.2966 23.4789 10.2828C23.5568 10.1244 23.9739 9.30969 23.5891 8.48187Z" fill="currentColor"/>
</svg>
                    <span>Shops</span>
                </button>
            </RouterLink>


            <RouterLink to="/glips" >
                <button class="flex flex-col justify-center items-center" :class="isGlips ? 'text-green-500':''">
                    <!-- <i class="bi bi-play-btn-fill mobile-menu-icon"></i> -->
                    <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 19.9V5.1C2 4.76863 2.26863 4.5 2.6 4.5H17.4C17.7314 4.5 18 4.76863 18 5.1V19.9C18 20.2314 17.7314 20.5 17.4 20.5H2.6C2.26863 20.5 2 20.2314 2 19.9Z" fill="currentColor"/>
                        <path d="M22 6.5V18.5" stroke="#959595" stroke-width="2" stroke-linecap="round"/>
                        <path d="M11 15C11 15.8284 10.3284 16.5 9.5 16.5C8.67157 16.5 8 15.8284 8 15C8 14.1716 8.67157 13.5 9.5 13.5C10.3284 13.5 11 14.1716 11 15Z" fill="currentColor"/>
                        <path d="M11 15V9.1C11 8.76863 11.2686 8.5 11.6 8.5H13M11 15C11 15.8284 10.3284 16.5 9.5 16.5C8.67157 16.5 8 15.8284 8 15C8 14.1716 8.67157 13.5 9.5 13.5C10.3284 13.5 11 14.1716 11 15Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>Glips</span>
                </button>
            </RouterLink>
        </div>

        <!-- SEARCH BAR AREA -->
        <div class=" flex flex-col p-3 border-b w-full justify-center items-center sticky top-0 bg-inherit z-20 backdrop-blur-2xl border-t">
            <form @submit.prevent="handleSearch()" class=" flex flex-row w-full md:w-[600px] rounded-full overflow-hidden gap-1 bg-white border">
                <input 
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                class=" px-5 p-3 outline-none w-full" type="text" placeholder=" Search for shops, foods,cloths, drinks..."/>
                <div class=" flex flex-row-reverse justify-between gap-4 flex-1 px-3 items-center">
                    <button @click="openFilter" type="button" class="flex md:hidden">
                        <i class="bi bi-filter"></i>
                    </button>
                    <button type="submit">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>


      <!-- NON AUTH NAVBAR -->
      <div v-else class="w-full p-5 flex flex-col md:flex-row items-center h-full  border-b border-gray-300">
        <div class=" border-red-500   md:w-fit w-full flex flex-row justify-between items-center">
            <LogoBlack/>
     

            <button @click="nav_open = !nav_open" class="text-black text-2xl font-bold inline-block md:hidden">
                <i class="bi bi-list"></i>
            </button>
        </div>

        <div :class="nav_open ? 'flex':'hidden md:flex'" class=" w-full flex-col gap-3 md:flex-row md:justify-between md:items-center  border-red-500">
            <div class=" flex flex-col w-full justify-center items-center mt-6 md:mt-0">
                <form @submit.prevent="handleSearch()" class=" flex flex-row w-full md:w-[600px] rounded-full overflow-hidden gap-1 bg-white border items-center">
                    <input 
                    v-model="searchQuery"
                    @keyup.enter="handleSearch"
                    class=" px-5 p-3 outline-none w-full" type="text" placeholder=" Search for shops, foods,cloths, drinks..."/>
                    <div class=" flex flex-row-reverse justify-between items-center gap-6 flex-1 px-4">
                        <button @click="openFilter" type="button" class="flex md:hidden">
                            <i class="bi bi-filter"></i>
                        </button>
                        <button type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex flex-row gap-3 font-bold   self-end align-bottom flex-nowrap ">
                <RouterLink to="/login" class="text-black hover:bg-slate-200 bg-opacity-20 px-8 rounded-md flex justify-center items-center">Login</RouterLink>
                <RouterLink to="/register">
                    <button class="text-white bg-black px-8 py-3 rounded-md text-nowrap">Sign Up</button>
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
import { RouterLink } from 'vue-router';
import { Handshake } from 'lucide-vue-next';

export default {
    name: "NavbarView",
    components: {
        LogoBlack,
        CustomDropdown,
        FullPageModal
    },
    data(){
        return{
            searchQuery:'',
            nav_open: false,
            authenticated: false,
            premium: false,
            flip: false,
            user: '',

            unauthorized: false,

            feedback_modal: false,
            feeling: null,

            isHidden: false, // Tracks if the nav should be hidden
            lastScrollY: 0, // Stores the last scroll position
          
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
            PreviousSrollPos: window.scrollY,
        }
    },

    

    methods:{
        // toggleNotificationMenu (e) {
        //     this.notifications_menu = !this.notifications_menu;
        // },

        openFilter(){
            this.$emit('open-filter');
        },

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
                this.user.credits = response.data.credits;
                localStorage.setItem('user', response.data.user._id);
                // console.log("user :", response);
            }catch(error){
                this.authenticated = false;
                
                if(error.response.status == 401){
                    // this.unauthorized = true;
                    // window.location.reload();
                    // alert('session expired please login!');
                };
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
        },

        handleScroll() {
            /* const currentScrollY = window.scrollY;
            if (currentScrollY > this.lastScrollY) {
                // Scrolling up
                this.isHidden = true;
            } else {
                // Scrolling down
                this.isHidden = false;
            }
            this.lastScrollY = currentScrollY; */
            const currentSrollPos = window.scrollY;
            if(this.PreviousSrollPos > currentSrollPos){
                this.isHidden = false;
            } else {
                this.isHidden = true;
            }

            this.PreviousSrollPos = currentSrollPos;
        },

        async handleSearch(){
        if (!this.searchQuery.trim()) return;
  
        try {
            console.log("searching...")
          /* loading.value = true;
  
          // Example API Call (replace with actual API implementation)
          const response = await axios.get(`${props.apiEndpoint}?keyword=${searchQuery.value}`);
          console.log("search results: ", response);
          const results = response.data; */
  
          // Navigate to the results page with query and results as route params
          this.$router.push({
            path: 'search-results',
            query: { find: this.searchQuery }, // Passing results through state (optional, depending on your use case)
          });
        //   window.location.reload();
  
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          
        }
      },
    },

    computed:{
        isLikes(){
            return this.$route.path.startsWith('/likes')
        },
        isHome(){
            return this.$route.path.startsWith('/market')
        },
        isNewProduct(){
            return this.$route.path.startsWith('/products/new')
        },
        isShops(){
            return this.$route.path.startsWith('/shops')
        },
        isGlips(){
            return this.$route.path.startsWith('/glips')
        },

        formattedCoins() {
            const coins = this.user.credits;

            if (coins >= 1_000_000) {
                return `${Math.floor(coins / 1_000_000)}M+`;
            } else if (coins >= 10_000) {
                return `${Math.floor(coins / 1_000)}K+`;
            } else if (coins >= 1_000) {
                return `${(coins / 1_000).toFixed(1)}K+`;
            } else {
                return coins.toString();
            }
        },

       

        
    },

    beforeUnmount() {
        document.removeEventListener("scroll", this.handleScroll);
    },

    mounted(){
        document.addEventListener("scroll", this.handleScroll);

        document.addEventListener('click', this.close);
        this.checkAuthenticationState();    
        this.getUserDetails();

        if(this.$route.query.find){
            this.searchQuery = this.$route.query.find;
        }
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
        @apply hover:bg-slate-200 p-3 rounded-lg
    }


    .rating-btn{
        background: linear-gradient(187deg, #FFF64920.07%, #0BDC6880.03%, #3CA16911.06%);
    }

    .mobile-menu-icon{
        @apply text-2xl
    }

   /*  .mobile-nav{

    }
 */
    .mobile-nav{
/*   position: fixed;
  left: 0;
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  */
  /* z-index: 10; */
  transition: bottom 0.5s ease-in-out;
}

.mobile-nav.hidden {
  transform: translateY(80%);
}


</style>