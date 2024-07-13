<template>
    <div>
        <!-- {{ shop }} -->
        <div v-if="loading">
        loading shop...
        </div>


        <div v-if="!loading && user.account_type == 'seller'" class="border rounded-lg flex flex-col gap-3 p-8 mt-1">
            <div class="flex md:flex-row gap-3 w-full">
                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">Shop or business name<span class="text-red-500 ml-1">*</span></span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" placeholder="Fortune and sons telecoms" v-model="shop.name">
                </div>

                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">Location<span class="text-red-500 ml-1">*</span></span>
                    <select class="border bg-slate-100 p-3 w-full rounded-md" v-model="shop_state">
                        <option v-for="state in NaijaStates.all()">{{ state.state }}</option>
                    </select>
                </div>
            </div>

            <!-- <div v-for="state in NaijaStates.all()">{{ state.state }}</div> -->
           <!-- categgories: {{ NaijaStates.all() }} -->

            <div class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                <span class="font-bold test-md">Product categories<span class="text-red-500 ml-1">*</span></span>
                <select class="border bg-slate-100 p-3 w-full rounded-md" v-model="shop.category">
                    <option>Select category</option>
                    <option v-for="category in categories">{{ category.name }}</option>
                </select>
            </div>
            <button class="bg-app_green hover:bg-opacity-95 p-2 rounded-md w-fit px-6 text-white self-end mt-3">
                Save
            </button>
        </div>
        <div v-else class="p-8 border flex flex-col rounded-lg gap-3">
            <p>create a shop to start selling</p>
            <button class="bg-app_green text-white p-3 rounded-md"> &plus; create</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NaijaStates from 'naija-state-local-government';

    export default {
        name: "ShopView",
        components:{

        },
        data(){
            return{
                NaijaStates,
                state: '',
                user: '',
                shop_state: '',
                shop: {
                    category: '',
                    location: {
                        state: '',
                    },
                },
                loading: false,
                categories: [],
            }
        },
        methods:{

            async getAllCategories(){
                try{
                    const response = await axios.get('categories');
                    this.categories = response.data.categories;
                }catch(error){
                    console.log("error getting categgories..");
                }
            },
            
            async getUser(){
                try{
                    this.loading = true;
                    const response = await axios.get('/user');
                    this.user = response.data.user;
                    this.shop = response.data.user.shop;
                    this.loading = false;
                }catch(error){
                    console.log("error getting user", error);
                    this.loading = false;
                }
            }  
        },
        created(){
            this.getUser();
            this.getAllCategories();
        }
    }
</script>

<style scoped>

</style>