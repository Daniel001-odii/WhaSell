<template>
    <div>
        <div class=" min-h-screen flex flex-col justify-start p-5">
            <div class="border w-full rounded-2xl flex flex-row p-5 gap-5 items-center flex-wrap">
                <div class=" h-20 w-20 bg-gray-200 rounded-full flex justify-center items-center">
                    <i class="bi bi-shop text-gray-400 text-3xl"></i>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-2xl font-bold">SmellySheep Store</h1>
                    <span class="text-gray-500">Faily used items</span>
                    <span class="text-sm">joined 2yrs 4mnths ago | 3k+ followers</span>
                    <div class="flex flex-row gap-2 items-center w-fit justify-center mt-4">
                        <button class="bg-slate-300 rounded-lg w-fit px-6 py-1  flex flex-row items-center justify-center gap-2 hover:bg-opacity-90">
                            edit
                        </button>
                        <button class="bg-orange-500 text-white rounded-lg w-fit px-6 py-1 flex flex-row items-center justify-center gap-2 hover:bg-opacity-90">
                            Boost
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8123 0.0505497L10.9894 0.0744837C11.4575 0.144042 12.077 0.237534 12.4277 0.615991C12.7152 0.92489 12.8257 1.4275 12.8916 1.87627L12.9305 2.16497C13.018 2.8456 13.041 3.73714 12.8916 4.72741C12.5972 6.68177 11.6311 9.01385 9.20526 10.8194C9.19207 10.96 9.19137 11.1021 9.19415 11.2442L9.2011 11.4566C9.21221 11.7835 9.22332 12.1103 9.13859 12.4274C9.00664 12.9211 8.53646 13.2464 8.09685 13.4798L7.88156 13.5897L7.60376 13.7214C7.08428 13.9592 6.38284 14.203 5.94322 13.7289C5.67931 13.4454 5.57097 13.0295 5.48277 12.6159L5.45013 12.4611C5.41335 12.2656 5.36699 12.0724 5.31123 11.8822C5.27651 11.773 5.239 11.6615 5.19872 11.5494C5.15439 11.608 5.10733 11.6641 5.05774 11.7176C4.81814 11.9757 4.46047 12.1559 4.16601 12.2823C3.84446 12.4192 3.48054 12.5389 3.14371 12.6376L2.97078 12.687L2.63951 12.776L2.33949 12.8508L1.98043 12.933L1.75611 12.9802C1.64423 13.0025 1.529 12.9951 1.42034 12.9588C1.31168 12.9224 1.21287 12.8582 1.13241 12.7715C1.05196 12.6849 0.992285 12.5785 0.958535 12.4614C0.924786 12.3444 0.917974 12.2203 0.938688 12.0998L0.998415 11.7775L1.10537 11.2554L1.19148 10.874L1.25677 10.6047C1.34844 10.2427 1.45956 9.85079 1.58735 9.50524C1.70402 9.18737 1.8714 8.80218 2.111 8.54414L2.16656 8.48655L2.12211 8.4671C2.00342 8.4185 1.8832 8.37435 1.76167 8.33472L1.56929 8.27114C1.08731 8.11408 0.571995 7.94504 0.251833 7.59949C-0.137085 7.1814 -0.00582502 6.5449 0.181689 6.01536L0.258083 5.81042L0.381009 5.51125L0.4831 5.27939C0.699782 4.80669 1.00189 4.30034 1.46025 4.15823C1.70333 4.08343 1.95612 4.07895 2.21031 4.08643L2.3631 4.09166C2.56172 4.09914 2.75965 4.10737 2.95342 4.08717C4.62993 1.47388 6.79537 0.433494 8.61008 0.116368C9.33807 -0.0122212 10.0788 -0.0343606 10.8123 0.0505497ZM3.99794 9.53067C3.88863 9.44354 3.758 9.39285 3.62222 9.38488C3.48643 9.3769 3.35145 9.41199 3.23399 9.4858L3.1576 9.54114L3.09301 9.60322L3.0062 9.7214C2.82563 10.0026 2.72285 10.3915 2.64298 10.755L2.56797 11.1051L2.53255 11.2644L2.6652 11.23L2.9555 11.1582C3.35692 11.0572 3.80209 10.9263 4.07572 10.6608C4.1947 10.5327 4.26647 10.3625 4.27771 10.1818C4.28895 10.001 4.23889 9.82202 4.13684 9.67802L4.07989 9.60771L4.06322 9.59051L3.99794 9.53067ZM8.9865 4.31455C8.85754 4.17561 8.70443 4.0654 8.53592 3.99019C8.36741 3.91498 8.18679 3.87625 8.00438 3.87622C7.82197 3.87618 7.64134 3.91484 7.4728 3.98999C7.30427 4.06513 7.15112 4.17529 7.02212 4.31417C6.89311 4.45306 6.79077 4.61795 6.72094 4.79943C6.6511 4.98091 6.61514 5.17542 6.61511 5.37187C6.61508 5.56832 6.65097 5.76284 6.72075 5.94435C6.79052 6.12586 6.89281 6.29078 7.02177 6.42972C7.28222 6.71031 7.6355 6.86798 8.00389 6.86805C8.37228 6.86812 8.72561 6.71058 8.98615 6.43009C9.24669 6.1496 9.3931 5.76914 9.39316 5.3724C9.39323 4.97566 9.24694 4.59514 8.9865 4.31455Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
            </div>

            <!-- TOP SELLING DIVIDER -->
            <div class="p-3 flex flex-row items-center mt-8">
                <div class="flex flex-row items-center gap-3">
                    <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="black"/>
                    </svg>
                    <span class="text-xl font-bold">Your Products </span>
                </div>
            </div>

            <!-- PRODCUT DISPLAY AREA -->
        <div class="masonry">
            <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-52 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-64 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class="h-64 w-full bg-red-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-52 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-64 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           
           <ProductCard>
                <template #product_image>
                    <div class=" h-96 w-full bg-orange-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-80 w-full bg-red-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class="h-64 w-full bg-red-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-40 w-full bg-green-300"></div>
                </template>
           </ProductCard>

           <ProductCard>
                <template #product_image>
                    <div class=" h-52 w-full bg-orange-300"></div>
                </template>
           </ProductCard>
        </div>
        </div>

        
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

    export default {
        name: "ShopDetailView",
        components:{
            ProductCard,
        }

    }
</script>

<style scoped>

</style>