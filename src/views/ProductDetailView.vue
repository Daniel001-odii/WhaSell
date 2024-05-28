<template>
    <div class="container mx-auto">

        <!-- SHOP DETAIL BANNER -->
        <div class=" md:mt-3 bg-black text-white p-5 flex flex-row items-end justify-between gap-5 flex-wrap">
            <div class="flex flex-row gap-3">
                <div class="rounded-full w-20 h-20 bg-white"></div>
                <div class="flex flex-col">
                    <span class="text-xl font-bold">SmellySheep Store</span>
                    <span class="text-md">SmellySheep Store</span>
                    <span class="text-sm">Joined 2yrs 4mnths ago | 2k+ followers</span>
                </div>
            </div>

            <div class="flex flex-row gap-2 flex-wrap">
                <button class="bg-white rounded-lg p-3 px-8 text-black font-medium text-lg"> &plus; Follow</button>
                <button class="bg-white rounded-lg p-3 md:px-8 text-app_green capitalize font-medium text-lg flex flex-row gap-2 justify-center items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 0C5.22317 0 0 5.22317 0 11.6667C0 13.8717 0.6125 15.9367 1.67767 17.696L0.637 21.2333C0.577249 21.4364 0.573317 21.6519 0.625619 21.857C0.67792 22.0622 0.784522 22.2494 0.934219 22.3991C1.08392 22.5488 1.27118 22.6554 1.47632 22.7077C1.68146 22.76 1.8969 22.7561 2.1 22.6963L5.63733 21.6557C7.45579 22.7559 9.54126 23.3362 11.6667 23.3333C18.1102 23.3333 23.3333 18.1102 23.3333 11.6667C23.3333 5.22317 18.1102 0 11.6667 0ZM9.02767 14.3068C11.3878 16.6658 13.6407 16.9773 14.4363 17.0065C15.6462 17.0508 16.8245 16.1268 17.283 15.0547C17.3409 14.9213 17.3619 14.7748 17.3438 14.6305C17.3258 14.4863 17.2693 14.3495 17.1803 14.2345C16.541 13.4178 15.6765 12.831 14.8318 12.2477C14.6555 12.1257 14.4388 12.0768 14.2271 12.1112C14.0155 12.1455 13.8254 12.2605 13.6967 12.432L12.9967 13.4995C12.9599 13.5569 12.9025 13.598 12.8364 13.6145C12.7702 13.631 12.7003 13.6216 12.6408 13.5882C12.166 13.3163 11.4742 12.8543 10.9772 12.3573C10.4802 11.8603 10.0462 11.2 9.80233 10.7555C9.7721 10.699 9.76336 10.6335 9.77773 10.5711C9.79211 10.5087 9.82862 10.4536 9.8805 10.416L10.9585 9.61567C11.1123 9.4819 11.2116 9.29623 11.2374 9.09401C11.2633 8.89178 11.2138 8.68712 11.0985 8.519C10.5758 7.75367 9.96683 6.78067 9.08367 6.1355C8.96969 6.0529 8.83617 6.0014 8.69626 5.98606C8.55634 5.97072 8.41483 5.99207 8.28567 6.048C7.21233 6.50767 6.28367 7.686 6.328 8.89817C6.35717 9.69383 6.66867 11.9467 9.02767 14.3068Z" fill="#47C68F"/>
                    </svg>
                    <span class="hidden md:inline-block">message</span>
                </button>
                <button class="bg-app_green text-white rounded-lg p-3 font-medium text-lg px-4">
                    <span>
                        <svg width="18" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.2423 17.6183L19.644 17.2075C19.2209 17.1578 18.792 17.2046 18.3896 17.3445C17.9872 17.4844 17.6217 17.7136 17.3206 18.015L14.714 20.6217C10.6923 18.5763 7.4235 15.3075 5.37815 11.2858L7.99898 8.665C8.60815 8.05583 8.90565 7.20583 8.80648 6.34166L8.39565 2.77166C8.31533 2.08058 7.98367 1.44316 7.46381 0.980779C6.94396 0.518395 6.27222 0.263335 5.57648 0.264162H3.12565C1.52481 0.264162 0.193147 1.59583 0.292313 3.19666C1.04315 15.295 10.719 24.9567 22.8031 25.7075C24.404 25.8067 25.7356 24.475 25.7356 22.8742V20.4233C25.7498 18.9925 24.6731 17.7883 23.2423 17.6183Z" fill="white"/>
                        </svg>
                    </span>
                </button>
            </div>
            
        </div>

        <!-- FULL PRODUCT DESRIPTION AND DETAILS -->
        <div class="flex flex-col md:flex-row gap-5 mt-8 flex-wrap p-5">
            <div class="flex-1 h-[400px] bg-gray-50"></div>
            <div class="flex flex-col flex-1">
                <span class="bg-app_light_green px-3 text-green-700 text-2xl font-semibold">Faily Used Kitchen Spoon & Knife</span>
                <span class="text-3xl font-bold mt-3">#15,000</span>

                <div class="flex flex-col gap-2 mt-5">
                    <span class="font-bold text-xl">Product Description</span>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</span>
                    <div class="flex flex-row gap-3 my-4">
                        <div class=" w-20 h-20 bg-gray-100" v-for="box in 3"></div>
                    </div>
                </div>
                <div>
                    <button class="bg-app_green hover:bg-opacity-90 text-white w-full rounded-lg p-3 text-lg font-semibold">Buy now</button>
                    <div class="flex flex-row gap-2 mt-3">
                        <button class="border border-app_green p-3 flex-1 text-app_green bg-app_light_green rounded-lg">Share</button>
                        <button class="border border-app_green p-3 flex-1 text-app_green bg-app_light_green rounded-lg flex flex-row justify-center items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80595 20.8562C8.40713 21.1313 9.06485 21.2742 9.73105 21.2745H19.2957C20.3623 21.2745 21.3937 20.9093 22.204 20.2448C23.0144 19.5803 23.5502 18.6602 23.7148 17.6505L24.8348 10.7882C24.9149 10.299 24.8835 9.79895 24.7427 9.32248C24.6018 8.84601 24.3549 8.40443 24.019 8.02811C23.683 7.6518 23.266 7.34968 22.7965 7.14255C22.3271 6.93541 21.8164 6.82818 21.2995 6.82822H15.4276V2.78936C15.4285 2.17234 15.2155 1.57251 14.8221 1.08399C14.4287 0.595477 13.8772 0.245926 13.2541 0.0901915C12.631 -0.0655432 11.9715 -0.0186481 11.3792 0.223518C10.787 0.465684 10.2953 0.889416 9.98153 1.42822L6.26551 7.78822C6.04129 8.17217 5.92363 8.60482 5.92379 9.04479V18.3739C5.92371 18.8596 6.06718 19.3354 6.33758 19.7461C6.60797 20.1569 6.99425 20.4859 7.4517 20.6951L7.80953 20.8579L7.80595 20.8562ZM1.78376 8.10194C1.5496 8.10171 1.31768 8.14571 1.10128 8.23141C0.884873 8.31712 0.688219 8.44285 0.522559 8.60142C0.356898 8.76 0.225479 8.9483 0.135815 9.15556C0.0461511 9.36283 -1.18023e-07 9.585 0 9.80937V18.5728C0 19.0261 0.187931 19.4608 0.52245 19.7813C0.85697 20.1019 1.31068 20.2819 1.78376 20.2819H2.67116C2.90842 20.2819 3.13595 20.1916 3.30371 20.0309C3.47148 19.8701 3.56573 19.6521 3.56573 19.4248V8.95737C3.56573 8.73004 3.47148 8.51202 3.30371 8.35127C3.13595 8.19053 2.90842 8.10022 2.67116 8.10022L1.78376 8.10194Z" fill="green"/>
                            </svg>
                            1k+
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- SIMILAR ITEMS YOU MAY LIKE -->
         <div class="p-3 flex flex-row items-center mt-8">
            <div class="flex flex-row items-center gap-3">
                <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="black"/>
                </svg>
                <span class="text-xl font-bold">Similar Items you may like</span>
            </div>
        </div>

        <!-- PRODUCT DISPLAY FOR SIMILAR ITEMS -->
         <div class="p-3 flex flex-row flex-wrap justify-center md:justify-start gap-3 mx-auto">
            <ProductCard v-for="product in 7"/>
        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

    export default {
        name: "ProductDetailView",
        components: {
            ProductCard,
        },
    }
</script>

<style scoped>

</style>