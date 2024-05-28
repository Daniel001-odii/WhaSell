<template>
    <div>
        <div class=" p-2 border border-transparent hover:border-gray-200 rounded-lg w-fit relative">
            <div class=" relative">
                <button class=" absolute z-10 bottom-3 right-3 h-8 w-8 rounded-full bg-white text-white flex justify-center items-center">
                    <svg width="20" height="20" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80595 20.8562C8.40713 21.1313 9.06485 21.2742 9.73105 21.2745H19.2957C20.3623 21.2745 21.3937 20.9093 22.204 20.2448C23.0144 19.5803 23.5502 18.6602 23.7148 17.6505L24.8348 10.7882C24.9149 10.299 24.8835 9.79895 24.7427 9.32248C24.6018 8.84601 24.3549 8.40443 24.019 8.02811C23.683 7.6518 23.266 7.34968 22.7965 7.14255C22.3271 6.93541 21.8164 6.82818 21.2995 6.82822H15.4276V2.78936C15.4285 2.17234 15.2155 1.57251 14.8221 1.08399C14.4287 0.595477 13.8772 0.245926 13.2541 0.0901915C12.631 -0.0655432 11.9715 -0.0186481 11.3792 0.223518C10.787 0.465684 10.2953 0.889416 9.98153 1.42822L6.26551 7.78822C6.04129 8.17217 5.92363 8.60482 5.92379 9.04479V18.3739C5.92371 18.8596 6.06718 19.3354 6.33758 19.7461C6.60797 20.1569 6.99425 20.4859 7.4517 20.6951L7.80953 20.8579L7.80595 20.8562ZM1.78376 8.10194C1.5496 8.10171 1.31768 8.14571 1.10128 8.23141C0.884873 8.31712 0.688219 8.44285 0.522559 8.60142C0.356898 8.76 0.225479 8.9483 0.135815 9.15556C0.0461511 9.36283 -1.18023e-07 9.585 0 9.80937V18.5728C0 19.0261 0.187931 19.4608 0.52245 19.7813C0.85697 20.1019 1.31068 20.2819 1.78376 20.2819H2.67116C2.90842 20.2819 3.13595 20.1916 3.30371 20.0309C3.47148 19.8701 3.56573 19.6521 3.56573 19.4248V8.95737C3.56573 8.73004 3.47148 8.51202 3.30371 8.35127C3.13595 8.19053 2.90842 8.10022 2.67116 8.10022L1.78376 8.10194Z" fill="blue"/>
                    </svg>
                </button>
                <button class=" absolute z-10 top-3 left-3 h-6 w-6 rounded-md bg-white text-gray-500 shadow-xl flex justify-center items-center">
                    <svg width="12" height="12" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 2H1V0H17V2ZM10 11.5C10 12.64 10.43 13.86 11 15V16H1V10H0V8L1 3H17L17.7 6.5C17 6.18 16.28 6 15.5 6C12.5 6 10 8.5 10 11.5ZM9 10H3V14H9V10ZM19 11.5C19 14.1 15.5 18 15.5 18C15.5 18 12 14.1 12 11.5C12 9.6 13.6 8 15.5 8C17.4 8 19 9.6 19 11.5ZM16.7 11.6C16.7 11 16.1 10.4 15.5 10.4C14.9 10.4 14.3 10.9 14.3 11.6C14.3 12.2 14.8 12.8 15.5 12.8C16.2 12.8 16.8 12.2 16.7 11.6Z" fill="gray"/>
                    </svg>
                </button>
                <RouterLink to="/product/test">
                    <img src="../assets/images/image_5.png" class=" h-48 product-image opacity-20">
                </RouterLink>
            </div>
            
            <div class="flex flex-col ">
                <Routerlink to="/product/test">
                    <slot name="product-title">
                        <span>American Leather Shoe</span>
                    </slot>
                </Routerlink>
                <slot name="product-price">
                    <span class="font-bold text-md">#50,000</span>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import Routerlink from 'vue'

    export default {
        name: "ProductCard",
    }
</script>

<style scoped>
    .product-image{
        filter: grayscale();
    }
</style>