<template>
    <div>
        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-person-plus-fill"></i>
                <span>Your'e following</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
                <ShopCard v-for="product in 5"/>
        </div>

        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4731 2.499L11.1081 1.61816L10.8481 3.30866C10.4342 5.978 8.74098 8.45833 6.87331 10.2013C3.21707 13.615 2.41648 17.325 3.54857 20.3875C4.6319 23.3182 7.3814 25.3248 10.1721 25.6597L10.8177 25.7367C9.2209 24.6855 8.19606 22.2297 8.55356 20.3945C8.90673 18.5908 10.1114 16.9015 12.4254 15.3428L13.5921 14.5588L14.0276 15.9647C14.2844 16.7953 14.7286 17.4627 15.1803 18.1405C15.397 18.4672 15.6169 18.7973 15.8184 19.1485C16.515 20.3677 16.6991 21.7233 16.2496 23.0685C15.8401 24.2912 15.1651 25.2525 14.2346 25.7857L15.2854 25.6597C17.9049 25.3458 19.8278 24.381 21.0769 22.7675C22.3151 21.168 22.7496 19.1088 22.7496 16.9167C22.7496 14.875 21.9706 12.7703 21.052 11.0192C19.9751 8.96816 18.5701 7.26483 17.0361 5.614C16.7706 6.18566 16.7912 6.41666 16.2452 7.33483C15.5365 5.30692 14.2056 3.60071 12.4731 2.499Z" fill="black"/>
                </svg>
                <span>Recommended</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
            <ShopCard v-for="product in 5"/>
        </div>

        <!-- TOP SELLING DIVIDER -->
        <div class="divider">
            <div class="divider-item">
                <i class="bi bi-cursor-fill"></i>
                <span>Visited previously</span>
            </div>
        </div>

        <div class="p-3 flex flex-row overflow-x-auto justify-start">
            <ShopCard v-for="product in 5"/>
        </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageTitle'
import ShopCard from '../components/ShopCard'

    export default {
        name: "ShopListView",
        components:{
            PageTitle,
            ShopCard
        },
        data(){
            return{

            }
        },
        created(){
            
        }
    }
</script>

<style scoped>

</style>