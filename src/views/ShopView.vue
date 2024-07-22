<template>
    <div>
        <!-- {{ shop }} -->
        <div v-if="loading">
        loading shop...
        </div>

        <div v-show="!edit_shop" class="flex flex-row flex-wrap gap-4 px-8 py-5 bg-white border rounded-lg items-center">
            <div class="h-28 min-w-28 text-white rounded-full bg-gray-600 flex justify-center items-center">
                <i class="bi bi-shop text-3xl"></i>
            </div>
            <div class="flex flex-row items-start flex-wrap justify-between w-full gap-5">
                <div class="flex flex-col">
                    <h1 class="font-bold text-xl">{{ shop.name }}</h1>
                    <span class="text-green-500">{{ shop.category }}</span>
                    <span class="text-sm" v-if="user.location">{{ user.location.address }}, {{ user.location.LGA }}, {{ user.location.state }}, NG.</span>
                    <RouterLink class="text-blue-600 text-sm mt-4" :to="`/shops/${shop.name}`">visit store <i class="bi bi-box-arrow-up-right"></i> </RouterLink>
                </div>
                <button @click="edit_shop = !edit_shop" class="btn text-white bg-app_green">
                    <i class="bi bi-pen"></i>
                    Edit
                </button>
            </div>
           
        </div>


        <form @submit.prevent="updateShop" v-show="edit_shop" v-if="!loading && user.account_type == 'seller'" class="border rounded-lg flex flex-col justify-center items-center gap-3 p-8 mt-1 bg-white">

            <div class=" h-28 w-28 text-white rounded-full bg-gray-600 mb-5 flex justify-center items-center">
                <i class="bi bi-shop text-3xl"></i>
            </div>

            <span v-if="from_owner_state" class="text-sm rounded-lg bg-blue-100 text-blue-700 p-3 mb-4 w-full">
                <i class="bi bi-exclamation-circle"></i>
                Shop location has been copied from user location
            </span>

            <div class="flex md:flex-row gap-3 w-full">
                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">Shop or business name<span class="text-red-500 ml-1">*</span></span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" placeholder="Fortune and sons telecoms" v-model="shop.name">
                </div>
            </div>

          
            <div class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                <span class="font-bold test-md">Shop category<span class="text-red-500 ml-1">*</span></span>
                <select class="border bg-slate-100 p-3 w-full rounded-md" v-model="shop.category">
                    <option disabled value="">Select category</option>
                    <option v-for="category in categories">{{ category.name }}</option>
                </select>
            </div>
            <div class="flex flex-row gap-3 self-end">
                <!-- <button type="button" class="btn" @click="edit_shop = !edit_shop">cancel</button> -->
           
                <button type="submit" class="bg-app_green btn text-white">
                    Save edit
                </button>
            </div>
        </form>

        <!-- displays only if user is a buyer without a store.. -->
        <div v-else class="p-8 border flex flex-col rounded-lg gap-3">
            <p>create a shop to start selling</p>
            <button class="bg-app_green text-white p-3 rounded-md"> &plus; create</button>
        </div>

        <div class=" p-3 mt-12 rounded-lg border bg-white text-green-800 font-bold">
            My products
        </div>
        <div class="flex flex-col p-6 rounded-lg border bg-white mt-3 overflow-x-auto">

            <table class="table-auto text-left w-[800px]">
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>category</th>
                        <th>QTY Left</th>
                        <th>Status</th>
                        <th>Variants</th>
                        <th>Price/pdt</th>
                    </tr>
                </thead>
                <tbody class="p-3 mt-3">
                    <tr class="hover:bg-gray-50 p-2" v-for="item in 10">
                        <td class="flex flex-row gap-2 items-center">
                            <div class="bg-red-400 h-14 w-14 rounded-xl"></div>
                            <span>Product {{ item }} name here</span>
                        </td>
                        <td>Product Category</td>
                        <td>300 pcs</td>
                        <td>In Stock</td>
                        <td>4</td>
                        <td>NGN 24,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NaijaStates from 'naija-state-local-government';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

    export default {
        name: "ShopView",
        components:{
            DataTable,
            Column,
        },
        data(){
            return{
                NaijaStates,
                state: '',
                user: '',
                shop_state: '',

                shop_name: '',
                shop_category: '',

                shop: {
                    category: '',
                    location: {
                        state: '',
                        LGA: '',
                        address: '',
                    },
                },
                loading: false,
                categories: [],
                from_owner_state: false,

                edit_shop: false,
            }
        },
        methods:{

            // async getAllCategories(){
            //     try{
            //         const response = await axios.get('/categories')
            //     }catch(error){

            //     }
            // }

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

                    this.shop_name = response.data.user.shop.name;
                    this.shop_category = response.data.user.shop.category;

                    if(this.user.location){
                        this.from_owner_state = true;
                        this.shop_state = this.user.location.state;
                    }
                    this.loading = false;
                    if(response.data.user.location.state){
                        this.shop.location.state = this.user.location.state;
                    }
                }catch(error){
                    console.log("error getting user", error);
                    this.loading = false;
                }
            },
            
            
            async updateShop(){
                try{
                    const response = await axios.patch(`/shops/${this.shop._id}/edit`, {name: this.shop.name, category: this.shop.category} );
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                    console.log("edited shop: ", response);
                    
                    // return view to original hidden state
                    this.edit_shop = false;

                }catch(error){
                    console.log("error updating shop: ", error)
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                }
            },

            async createNewShop(){
                try{

                }catch(error){

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