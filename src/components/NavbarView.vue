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
        <div class="hidden md:flex flex-row gap-3 font-bold">
            <button class="text-black hover:bg-slate-200 bg-opacity-20 px-8 rounded-md">Login</button>
            <button class="text-white bg-black px-8 py-3 rounded-md">Sign Up</button>
        </div>
    </div>


    <!-- NAVBAR FOR AUTHENTICATED USERS -->
    <div v-if="authenticated" class="bg-black">
        <div class="container mx-auto text-white flex flex-row p-3 items-center justify-between">
            <div class="flex flex-row gap-12 items-center">
                <RouterLink to="/">
                    <img src="../assets/images/whaSell-white.png"/>
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
                    <div class="flex flex-row gap-3 pr-4 border-r border-gray-500">
                        <button>
                            <svg width="25" height="25" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.9997 3.16675C16.0603 3.16675 13.2412 4.33445 11.1626 6.41298C9.08412 8.49151 7.91641 11.3106 7.91641 14.2501V19.8361C7.91664 20.0817 7.85973 20.324 7.75016 20.5438L5.03158 25.9794C4.89878 26.245 4.83607 26.5401 4.84942 26.8367C4.86276 27.1333 4.95171 27.4216 5.10781 27.6741C5.26392 27.9267 5.482 28.1351 5.74134 28.2797C6.00068 28.4243 6.29267 28.5001 6.58958 28.5001H31.4099C31.7068 28.5001 31.9988 28.4243 32.2582 28.2797C32.5175 28.1351 32.7356 27.9267 32.8917 27.6741C33.0478 27.4216 33.1367 27.1333 33.1501 26.8367C33.1634 26.5401 33.1007 26.245 32.9679 25.9794L30.2509 20.5438C30.1408 20.3241 30.0833 20.0818 30.0831 19.8361V14.2501C30.0831 11.3106 28.9154 8.49151 26.8368 6.41298C24.7583 4.33445 21.9392 3.16675 18.9997 3.16675ZM18.9997 33.2501C18.0171 33.2504 17.0585 32.946 16.2561 32.3789C15.4536 31.8117 14.8467 31.0098 14.5189 30.0834H23.4806C23.1528 31.0098 22.5459 31.8117 21.7434 32.3789C20.941 32.946 19.9824 33.2504 18.9997 33.2501Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                    <CustomDropdown>
                        <template #trigger>
                            <img src="../assets/images/user_profile_img.png" class=" h-10">
                        </template>
                        <template #menu>
                            <div class="text-black bg-white rounded-md p-1 ">
                                <div class=" w-[200px] flex flex-col ">
                                    <RouterLink class="user-menu-item" to="#">Account</RouterLink>
                                    <RouterLink class="user-menu-item" to="#">Invoices</RouterLink>
                                    <!-- <RouterLink class="user-menu-item" to="#">Followed Stores</RouterLink> -->
                                    <RouterLink class="user-menu-item" to="#">Help & Support</RouterLink>
                                </div>
                                <div class="p-1 ">
                                    <button  class=" text-left w-full border-t p-2 user-menu-item text-black">
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </template>
                    </CustomDropdown>
                    
                </div>
            </div>
            
        </div>

        <!-- FOR MOBILE -->
        <div class=" bg-black md:hidden flex flex-row text-white w-full justify-around fixed bottom-0 z-50 p-3 text-sm">
            <RouterLink to="/market">
                <button class="flex flex-col justify-center items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7066 2.29303C12.5191 2.10556 12.2648 2.00024 11.9996 2.00024C11.7344 2.00024 11.4801 2.10556 11.2926 2.29303L4.29259 9.29303L2.29259 11.293C2.19708 11.3853 2.1209 11.4956 2.06849 11.6176C2.01608 11.7396 1.9885 11.8709 1.98734 12.0036C1.98619 12.1364 2.01149 12.2681 2.06177 12.391C2.11205 12.5139 2.18631 12.6255 2.2802 12.7194C2.37409 12.8133 2.48574 12.8876 2.60864 12.9379C2.73154 12.9881 2.86321 13.0134 2.99599 13.0123C3.12877 13.0111 3.25999 12.9835 3.382 12.9311C3.504 12.8787 3.61435 12.8025 3.70659 12.707L3.99959 12.414V19C3.99959 19.7957 4.31566 20.5587 4.87827 21.1214C5.44088 21.684 6.20394 22 6.99959 22H16.9996C17.7952 22 18.5583 21.684 19.1209 21.1214C19.6835 20.5587 19.9996 19.7957 19.9996 19V12.414L20.2926 12.707C20.4812 12.8892 20.7338 12.99 20.996 12.9877C21.2582 12.9854 21.509 12.8803 21.6944 12.6948C21.8798 12.5094 21.985 12.2586 21.9873 11.9964C21.9895 11.7342 21.8888 11.4816 21.7066 11.293L12.7066 2.29303Z" fill="white"/>
                    </svg>
                    <span>Home</span>
                </button>
            </RouterLink>

            <RouterLink to="/shops">
                <button class="flex flex-col justify-center items-center">
                    <svg width="20" height="20" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 2H1V0H17V2ZM10 11.5C10 12.64 10.43 13.86 11 15V16H1V10H0V8L1 3H17L17.7 6.5C17 6.18 16.28 6 15.5 6C12.5 6 10 8.5 10 11.5ZM9 10H3V14H9V10ZM19 11.5C19 14.1 15.5 18 15.5 18C15.5 18 12 14.1 12 11.5C12 9.6 13.6 8 15.5 8C17.4 8 19 9.6 19 11.5ZM16.7 11.6C16.7 11 16.1 10.4 15.5 10.4C14.9 10.4 14.3 10.9 14.3 11.6C14.3 12.2 14.8 12.8 15.5 12.8C16.2 12.8 16.8 12.2 16.7 11.6Z" fill="white"/>
                    </svg>
                    <span>Shops</span>
                </button>
            </RouterLink>

            <RouterLink to="/likes">
                <button class="flex flex-col justify-center items-center">
                    <svg width="20" height="20" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80595 20.8562C8.40713 21.1313 9.06485 21.2742 9.73105 21.2745H19.2957C20.3623 21.2745 21.3937 20.9093 22.204 20.2448C23.0144 19.5803 23.5502 18.6602 23.7148 17.6505L24.8348 10.7882C24.9149 10.299 24.8835 9.79895 24.7427 9.32248C24.6018 8.84601 24.3549 8.40443 24.019 8.02811C23.683 7.6518 23.266 7.34968 22.7965 7.14255C22.3271 6.93541 21.8164 6.82818 21.2995 6.82822H15.4276V2.78936C15.4285 2.17234 15.2155 1.57251 14.8221 1.08399C14.4287 0.595477 13.8772 0.245926 13.2541 0.0901915C12.631 -0.0655432 11.9715 -0.0186481 11.3792 0.223518C10.787 0.465684 10.2953 0.889416 9.98153 1.42822L6.26551 7.78822C6.04129 8.17217 5.92363 8.60482 5.92379 9.04479V18.3739C5.92371 18.8596 6.06718 19.3354 6.33758 19.7461C6.60797 20.1569 6.99425 20.4859 7.4517 20.6951L7.80953 20.8579L7.80595 20.8562ZM1.78376 8.10194C1.5496 8.10171 1.31768 8.14571 1.10128 8.23141C0.884873 8.31712 0.688219 8.44285 0.522559 8.60142C0.356898 8.76 0.225479 8.9483 0.135815 9.15556C0.0461511 9.36283 -1.18023e-07 9.585 0 9.80937V18.5728C0 19.0261 0.187931 19.4608 0.52245 19.7813C0.85697 20.1019 1.31068 20.2819 1.78376 20.2819H2.67116C2.90842 20.2819 3.13595 20.1916 3.30371 20.0309C3.47148 19.8701 3.56573 19.6521 3.56573 19.4248V8.95737C3.56573 8.73004 3.47148 8.51202 3.30371 8.35127C3.13595 8.19053 2.90842 8.10022 2.67116 8.10022L1.78376 8.10194Z" fill="white"/>
                    </svg>
                    <span>Likes</span>
                </button>
            </RouterLink>

            <RouterLink to="/new-product">
                <button class="flex flex-col justify-center items-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.41 9.41L10.58 0.58C10.21 0.21 9.7 0 9.17 0H2C0.9 0 0 0.9 0 2V9.17C0 9.7 0.21 10.21 0.59 10.58L9.42 19.41C10.2 20.19 11.47 20.19 12.25 19.41L19.42 12.24C20.2 11.46 20.2 10.2 19.41 9.41ZM4.5 6C3.67 6 3 5.33 3 4.5C3 3.67 3.67 3 4.5 3C5.33 3 6 3.67 6 4.5C6 5.33 5.33 6 4.5 6Z" fill="white"/>
                    </svg>
                    <span>Sell</span>
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import CustomDropdown from './CustomDropdown.vue';
import LogoBlack from './LogoBlack.vue';

    export default {
        name: "NavbarView",
        components: {
            LogoBlack,
            CustomDropdown,
        },
        data(){
            return{
                authenticated: true,
            }
        }
    }
</script>

<style scoped>
    .user-menu-item{
        @apply hover:bg-blue-500 hover:text-white p-2 pl-8
    }
</style>