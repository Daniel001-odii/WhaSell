<template>
    <div>
        <div>
        <div class="w-sm p-4 hover:bg-gray-50 w-fit rounded-3xl flex flex-col gap-3">
            <div>
                <span class="rounded-full status-tag bg-orange-400 text-white px-3 p-1 text-[12px] flex flex-row w-fit items-center">
                    <svg width="15" height="15" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="white"/>
                    </svg>
                    Top Seller
                </span>
            </div>
            <div class=" relative">
                <img src="../assets/images/image_5.png" class=" h-40 product-image opacity-20 rounded-full">
            </div>
            
            <div class="flex flex-col text-center">
                <slot name="store-name">
                    <span class="font-bold text-md">Felix Djardin Stores</span>
                </slot>
                <slot name="store-category">
                    <span class="text-sm">Electronics Gadgets</span>
                </slot>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "ShopCard"
    }
</script>

<style scoped>
.status-tag{
    /* background: linear-gradient(light-orange, orange); */
}
</style>