<template>

<!-- NEW STORE MODAL -->
 <div v-if="new_shop_created" class="flex justify-center min-h-screen items-center fixed bg-[rgba(0,0,0,0.8)] w-full left-0 top-0">
    <div class="bg-white rounded-lg w-96 p-12 text-center flex flex-col justify-center items-center">
        <p><b class="text-3xl">Shop created</b> <br/> Lets start selling!</p>
        <button @click="visitNewShop" class="btn bg-app_green text-white mt-3  gap-3">
            <span>Continue</span>
            <i class="bi bi-arrow-right"></i>
        </button>
    </div>
 </div>

 <!-- BOOST SHOP? MODAL -->
 <div v-if="boost_shop_modal" class="flex justify-center min-h-screen items-center fixed bg-[rgba(0,0,0,0.8)] w-full left-0 top-0 z-10">
    <div class="bg-white rounded-lg md:w-[700px] p-12 text-center flex flex-col justify-center items-center">
        <div class=" size-40 rounded-full border-4 border-[#00C1F6] relative p-2 flex justify-center items-center">
            <img :src="shop_image" class=" rounded-full h-[100%]" v-if="shop_image"/>
            <i class=" bi bi-rocket-takeoff-fill text-white absolute -bottom-0 right-0 bg-[#00C1F6] p-4 rounded-full size-12 flex justify-center items-center border-4 border-white"></i>
        </div>
        <div class=" mt-3">
            <h1 class=" text-xl">Boost <b>{{ shop.name }}</b> Shop</h1>
            <span class=" ">Proceed to select your desired timeline and make payment</span>
        </div>
        <div class=" mt-6 flex flex-row gap-6 text-left items-center bg-[#00C1F6] bg-opacity-10 text-[#00C1F6] p-4 rounded-md">
            <i class="  bi bi-rocket-takeoff-fill text-3xl"></i>
            <span>This transaction is slot-based, once all slots are booked you have to wait till a slot is available before you can boost your shop.</span>
        </div>
        <form @submit.prevent="boostShop()">
            <div class=" flex flex-row flex-wrap gap-4 justify-start items-center py-3">
                
                <button type="button" :class="shop_boost_duration == coin ? 'border-app_green bg-app_green ':'border-transparent bg-gray-100'" @click="shop_boost_duration = coin" v-for="coin in 7" class=" bg-opacity-15 px-12 py-3 rounded-lg  font-bold flex-1 text-nowrap border ">{{ coin }}D</button>
            </div>
            <div class=" flex flex-row justify-between items-center">
                <span>{{ shop_boost_duration }}D</span>
                <span>=</span>
                <input class=" border-b p-3 outline-none w-[85%]" placeholder="XXX" disabled :value="`${shop_boost_duration * 10} Coins`">
            </div>
            <div class=" flex flex-row gap-3 mt-12 justify-end">
                <button type="button" @click="openBoostModal(true)" class="btn bg-gray-100">Cancel</button>
                <button class="btn bg-app_green text-white" type="submit">Boost Now</button>
            </div>
        </form>
    </div>
 </div>


 <!-- DELETE PRODUCT MODAL -->
<ModalComponent :show="delete_product_modal">
    <div class="w-[400px]">
        <i class="bi bi-exclamation-circle-fill text-red-500 text-4xl mb-12"></i>
        <h1 class="text-2xl font-bold">Are you sure you want to delete this product?</h1>
        <p class=" mt-3 text-center">proceeding with this action with permanently remove this product from your records and can not reversed, do you want to proceed?</p>
        <div class="w-full flex justify-center gap-3 p-3 mt-3">
            <button class="btn bg-gray-200 font-bold" @click="delete_product_modal = !delete_product_modal">cancel</button>
            <button class="btn bg-red-500 text-white font-bold" @click="deleteProduct()">Yes, delete</button>
        </div>
    </div>
</ModalComponent>


    <!-- CREATE NEW SHOP DIV -->

    <div>
        <!-- {{ shop_products }} -->
        <div v-if="loading" class="w-full flex justify-center items-center h-[400px] gap-3">
         <span class="app_spinner"></span>
         <span>loading...</span>
        </div>

        <div v-else>


            <!-- IF USER IS A SELLER THEN USER HAS A SHOP... -->
            <div v-if="user.account_type == 'seller'">

          
                <div v-if="!edit_shop"  class="flex flex-row  gap-4 px-8 py-5 bg-white border rounded-lg items-center">
                    <!-- <div class="h-28 min-w-28 text-white rounded-full bg-gray-600 flex justify-center items-center">
                        <i class="bi bi-shop text-3xl"></i>
                    </div> -->
                    <img :src="shop_image" alt="Product Photo" class="rounded-full w-28 h-28 border object-cover">
                    <div v-if="shop" class="flex flex-row items-center flex-wrap justify-between w-full gap-5">
                        <div class="flex flex-col">
                            <h1 class="font-bold text-xl">{{ shop.name }}</h1>
                            <span class="text-green-500">{{ shop.category }}</span>
                            <!-- <span class="text-sm" v-if="user.location">{{ user.location }}</span> -->
                            <span class="text-sm md:line-clamp-none line-clamp-1" v-if="user.location">{{ user.location.address}}, {{ user.location.LGA }}, {{ user.location.state }}, NG.</span>
                            <RouterLink class="text-blue-600 text-sm mt-4" :to="`/shops/${shop.name}`" target="_blank">visit store <i class="bi bi-box-arrow-up-right"></i> </RouterLink>
                        </div>
                        <button @click="edit_shop = !edit_shop" class="btn text-white bg-app_green flex gap-2">
                            <i class="bi bi-pen"></i>
                            <span>Edit</span>
                        </button>
                    </div>
                
                </div>


                <form @submit.prevent="updateShop" v-if="edit_shop" class="border rounded-lg flex flex-col justify-center items-center gap-3 p-8 mt-1 bg-white">

                    <!-- <div class=" h-28 w-28 text-white rounded-full bg-gray-600 mb-5 flex justify-center items-center hover:bg-gray-300 cursor-pointer">
                        <i class="bi bi-shop text-3xl"></i>
                    </div> -->
                    
              

                    <form @submit.prevent="changeShopImage" class="relative">
                        <div v-if="shop_image" class="min-w-28 w-28 h-28 relative rounded-full border border-gray-300 overflow-hidden">
                            <img :src="shop_image" alt="Product Photo" class="w-full h-full object-cover">
                        </div>

                        <!-- <label v-else class=" w-28 h-28 rounded-full bg-green-100 text-app_green flex items-center justify-center cursor-pointer"> -->
                        <label class=" w-28 h-28 rounded-full bg-black text-app_green flex items-center justify-center cursor-pointer absolute top-0 opacity-0 hover:opacity-50">
                            <input type="file" class="hidden" @change="onFileChange">
                            <i class="bi bi-camera-fill text-white"></i>
                        </label>
                        <!-- <button v-if="shop_image_edit" type="submit">save image</button> -->
                    </form>

                    <span v-if="from_owner_state" class="text-sm rounded-lg bg-blue-100 text-blue-700 p-3 mb-4 w-full">
                        <i class="bi bi-exclamation-circle"></i>
                        Shop location has been copied from user location
                    </span>

                    <div class="flex md:flex-row gap-3 w-full">
                        <div class="flex flex-col justify-center items-start gap-3 w-full">
                            <span class="font-bold test-md">Shop or business name<span class="text-red-500 ml-1">*</span></span>
                            <input disabled type="text" class="bg-slate-100 text-gray-400 w-full p-3 rounded-md overflow-hidden outline-none" placeholder="Fortune and sons telecoms" v-model="shop.name">
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
                        <button type="button" class="btn bg-gray-100" @click="edit_shop = !edit_shop">cancel</button>
                
                        <button type="submit" class="bg-app_green btn text-white">
                            Save edit
                        </button>
                    </div>
                </form>

              

                <!-- PRODUCTS & PRODUCT DETAIL -->
                <div id="inventory" class=" p-3 mt-12 rounded-lg border bg-white text-green-800 font-bold">
                    My products ({{ shop_products.length }})
                </div>

                
                <!-- INVENTORY AREA -->
                <div class="relative overflow-x-auto mt-3" v-if="shop_products.length > 0">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-6 py-3">Items</th>
                                <th scope="col" class="px-6 py-3">Category</th>
                                <!-- <th scope="col" class="px-6 py-3">QTY Left</th> -->
                                <th scope="col" class="px-6 py-3">Status</th>
                                <!-- <th scope="col" class="px-6 py-3">Variants</th> -->
                                <th scope="col" class="px-6 py-3">Price/pdt</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b hover:bg-gray-50 cursor-pointer" v-for="(product, index) in shop_products" :key="index">
                                <td @click="selected_product = index" class="px-6 py-4 flex flex-row gap-2 items-center">
                                    <!-- <div class="bg-red-400 rounded-xl overflow-hidden"> -->
                                        <img :src="product.images[0]" class="!size-[30px] rounded-lg">
                                    <!-- </div> -->
                                    <span class=" line-clamp-3">{{ product.name }}</span>
                                </td>
                                <td class="px-6 py-4">{{ product.category }}</td>
                                <!-- <td class="px-6 py-4">Null</td> -->
                                <!-- <td class="px-6 py-4">Null</td> -->
                                <td class="px-6 py-4">Null</td>
                                <td class="px-6 py-4">NGN {{ product.price.toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- IF THERE ARE NO PRODUCTS IN USER SHOP --> 
               <!--  <div class="no-products w-full h-[300px] flex items-end  justify-center text-xl pb-4 text-gray-400" v-else>
                    <p>You have no products yet <RouterLink class="text-green-500 underline" to="/products/new">Sell Now!</RouterLink></p>
                </div> -->
                <div class="flex flex-col justify-center items-center mt-12" v-else>
                    <img src="../assets/images/no-products.png" class=" !size-52">
                    <p class="mt-3">You have no products yet <RouterLink class="text-green-500 underline" to="/products/new">Sell Now!</RouterLink></p>
                </div>

                <!-- PRODUCT DETAIL PREVIEW -->
                <div class=" p-3 mt-12 rounded-lg border bg-white text-green-800 font-bold" v-if="shop_products.length > 0">
                    Product
                </div>
                <div class="flex flex-row flex-wrap bg-white border p-8 mt-3 items-start gap-12 rounded-lg" v-if="shop_products.length > 0">

                    <div class="flex flex-row flex-wrap gap-3 items-center" >
                        
                        <!-- <div class="!size-40 bg-gray-100 rounded-lg overflow-hidden h-full w-full flex justify-center items-center"> -->
                            <img :src="shop_products[selected_product].images[0]" class="!size-40 bg-gray-100 rounded-lg ">
                        <!-- </div> -->
                        <div class="flex flex-col gap-3">
                            <h2 class="font-bold text-xl"> {{ shop_products[selected_product].name.substring(0,20) }}...</h2>
                            <div class=" bg-green-100 text-green-700 text-sm p-1 rounded-lg text-center w-fit">{{ shop_products[selected_product].category }}</div>
                            <div class="flex flex-row overflow-x-auto gap-1">
                                <!-- {{ shop_products[selected_product].images }} -->
                                <img :src="image" class=" size-10 bg-gray-100 rounded-md" v-for="image in shop_products[selected_product].images"></img>
                            </div>
                        </div>
                    </div>

                    <!-- PRODUCT DESCRIPTIONS -->
                    <div class="flex flex-col gap-3 mt-8 md:mt-0 ">
                       <span>
                        <b>Variants:</b> Black, White, Sky Blue</span>
                       <span><b>Bulk price:</b></span>
                       <div>
                            <b>Product Description:</b><br/>
                            <p>
                                {{ shop_products[selected_product].description }}
                            </p>
                        </div>
                        <span><b>Total Qty:</b> 138pcs</span>
                        <span><b>Qty sold:</b> 14pcs</span>
                        <div class="flex flex-row justify-between items-center">
                            <span><b>Qty left:</b> 123pcs</span>
                            <div class=" gap-3 flex items-center">
                                <span class="  inline-block !size-3 bg-blue-500 rounded-full"></span>
                                <span class="text-blue-500">In stock</span>
                            </div>
                        </div>
                        <div class="flex flex-row  gap-4 justify-between mt-8">
                            <button @click="delete_selected(shop_products[selected_product]._id)" class="bg-red-700 text-white p-3 btn">
                                <i class="bi bi-trash mr-2"></i>
                                Delete
                            </button>
                            <button class="btn bg-blue-100 text-blue-500">
                                <i class="bi bi-pen mr-2"></i>
                                Edit Product
                            </button>
                        </div>
                    </div>
                    
                </div>
                <!-- ************************** -->

                <div class=" p-3 mt-12 rounded-lg border bg-white text-green-800 font-bold" v-if="shop_products.length > 0">
                    Special Actions
                </div>
                <div class="flex flex-row flex-wrap bg-white border p-8 mt-3 items-start gap-12 rounded-lg" v-if="shop_products.length > 0">
                    <div class=" bg-[#2F985E] text-white flex flex-row gap-3 p-5 rounded-md items-center">
                        <i class="bi bi-tools text-2xl"></i>
                        <div>By toggling any of these special actions you can perform the listed transactions. Follow the steps carefully to carry out each action successfully.</div>
                    </div>

                    <!-- settings -->
                    <div class="flex flex-col gap-5 w-full">

                        <!-- BOOST YOUR SHOP -->
                        <div class=" flex flex-row justify-between items-center">
                            <div class=" flex flex-col">
                                <h3 class=" font-bold  text-lg">Boost your shop</h3>
                                <span>increase your shop visibility for a specific time frame</span>
                            </div>
                            <div>
                                <label class="switch scale-75">
                                    <input type="checkbox" @click="openBoostModal(false)" :checked="shop.is_boosted">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>

                         <!-- ADVERT -->
                         <div class=" flex flex-row justify-between items-center">
                            <div class=" flex flex-col">
                                <h3 class=" font-bold  text-lg">Advertise a service/event</h3>
                                <span>Expand reach with front row billboard access, pay per ad click</span>
                            </div>
                            <div>
                                <label class="switch scale-75">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            
            <!-- displays only if user is a buyer without a store.. -->
            <div v-if="user.account_type == 'buyer'" class="p-8 border flex flex-col rounded-lg gap-3">
                <div v-if="!create_shop_option" class="p-8 flex flex-col rounded-lg text-center text-gray-400">
                    <i class="bi bi-exclamation-circle-fill"></i>
                    <span>Your Shop Details will be available when you have a shop</span>
                    <div v-if="!create_shop_option" class="flex justify-center items-center flex-col">
                        <span>Start Selling now</span>
                        <button class="btn bg-black text-white mt-3"  @click="create_shop_option = !create_shop_option">Create My Shop</button>
                    </div>
                </div>
                
                
                <form @submit.prevent="createNewShop" v-if="create_shop_option" class="flex flex-col gap-3">
                    <div>
                        <p>Shop or business name</p>
                        <input v-model="new_shop.name" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" type="text" name="name" :placeholder="`${user.username}'s shop'`" required>
                    </div>

                    <div>
                        <p>Description</p>
                        <textarea v-model="new_shop.description" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none min-h-[150px]" placeholder="a brief description of your shop here.." required></textarea>
                    </div>

                    <div class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                        <span class="font-bold test-md">Shop category</span>
                        <select class="border bg-slate-100 p-3 w-full rounded-md" v-model="new_shop.category">
                            <option disabled value="">Select category</option>
                            <option v-for="category in categories">{{ category.name }}</option>
                        </select>
                    </div>
               
                    <button type="submit" class="bg-app_green text-white p-3 rounded-md" :disabled="creating_new_shop"> 
                        <span v-if="creating_new_shop">creating...</span>
                        <span v-else> &plus; create</span>
                    </button>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NaijaStates from 'naija-state-local-government';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import AmountInput from '../components/AmountInput.vue';

import ModalComponent from '../components/ModalComponent.vue'

    export default {
        name: "ShopView",

        components:{
            DataTable,
            Column,
            AmountInput,
            ModalComponent
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
                    is_boosted: null,
                },
                selected_product: '',
                new_shop: {
                    image: null,
                    name: '',
                    description: '',
                    category: '',
                },
                loading: false,
                categories: [],
                from_owner_state: false,
                edit_shop: false,
                create_shop_option: false,
                creating_new_shop: false,
                new_shop_created: false,
                shop_image: null,
                shop_image_edit: false,
                shop_products: [],
                delete_product_modal: false,
                selected_product_id: '',

                boost_shop_modal: false,
                shop_boost_duration: 1,
                shop_is_boosted: false,
                real_boost: false,
            }
        },
        methods:{

            getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
                } else {
                    this.error = "Geolocation is not supported by this browser.";
                }
            },

            
            showPosition(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Use the OpenCage Geocoding API to get the location details
            const apiKey = 'e99cb79bd180409b8eed5d463de070d1'; // Replace with your OpenCage API key
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                if (data.results && data.results.length > 0) {
                    // Extract the state from the result
                    this.state = data.results[0].components.state;
                } else {
                    this.error = "Unable to retrieve state information.";
                }
                })
                .catch(error => {
                console.error('Error:', error);
                this.error = "An error occurred while fetching location details.";
                });
            },


            showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                this.error = "User denied the request for Geolocation.";
                break;
                case error.POSITION_UNAVAILABLE:
                this.error = "Location information is unavailable.";
                break;
                case error.TIMEOUT:
                this.error = "The request to get user location timed out.";
                break;
                case error.UNKNOWN_ERROR:
                this.error = "An unknown error occurred.";
                break;
            }
            },


            onFileChange(event) {
                const file = event.target.files[0];
                this.new_shop.image = file;
                
                if (file) {
                    this.shop_image = URL.createObjectURL(file);
                  
                }
                this.shop_image_edit  = true;
                // update the shop image automatically after image change...
                this.changeShopImage()
            },

            visitNewShop(){
                this.new_shop_created = !this.new_shop_created;
                window.location.reload();
            },

            delete_selected(product_id){
                this.delete_product_modal = true;
                this.selected_product_id = product_id;
            },

            async changeShopImage(){
                const form = new FormData();
                const file = this.new_shop.image;

                form.append('shop_image', file);


                try{
                    const response = await axios.post(`/shops/${this.shop._id}/image`, form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('upload p-image: ', response);
                    // window.location.reload();
                }catch(error){
                    console.log("error uploading profile image: ", error);
                }
            },

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
                    console.log("user: ", response);

                    this.user = response.data.user;
                    this.shop = response.data.user.shop;

                    if(this.user.shop){
                        this.shop_image = response.data.user.shop.profile.image_url;
                        this.shop_name = response.data.user.shop.name;
                        this.shop_category = response.data.user.shop.category;
                        // this.shop.is_boosted = response.data.user.shop.is_boosted;
                        // get shop products if any..
                        this.getShopProducts();
                    }
                  

                    if(this.user.location){
                        this.from_owner_state = true;
                        this.shop_state = this.user.location.state;
                    }
                    this.loading = false;
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
                    console.log("error updating shop: ", error);
                    if(error.response.status == 401){
                        window.location.reload();
                    }
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                }
            },

            async createNewShop(){
                try{
                    this.creating_new_shop = true;
                    const response = await axios.post('/shops/new', { 
                        name: this.new_shop.name,
                        description: this.new_shop.description,
                        category: this.new_shop.category
                    });
                    setTimeout(() => {
                        this.creating_new_shop = false;
                        this.new_shop_created = true;
                    }, 5000);
                   
                    console.log("res from new shop: ", response);
                    // window.location.reload();
                }catch(error){
                    this.creating_new_shop = false;
                    console.log("error creating new shop: ", error);
                }
            },

            async getShopProducts(){
                try{
                    const response = await axios.get(`/products/${this.shop._id}/shop`);
                    this.shop_products = response.data.products;
                    this.selected_product = 0;
                }catch(error){
                    console.log("error getting shop products: ", error)
                }
            },

            async deleteProduct(){
                try{
                    const response = await axios.delete(`/products/${this.selected_product_id}/delete`);
                //    console.log("response");
                   this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                    this.delete_product_modal = false;
                    setTimeout(()=>{
                        window.location.reload();
                    }, 3000)
                  
                }catch(error){
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                    console.log("error deleting product: ", error)
                    this.delete_product_modal = false;
                }
            },

            openBoostModal(close){
               if(this.shop.is_boosted){
                    this.boost_shop_modal = false;
                    this.boostShop();
               } else {
                // this.boostShop();
                this.boost_shop_modal = true;
               }
               if(close){
                // this.shop.is_boosted = 
                this.getUser()
                this.boost_shop_modal = false;
                // this.shop_is_boosted = 
               }
            },

            async boostShop(){
                try{
                    const response = await axios.post("/shops/boost_shop", { duration:  this.shop_boost_duration});
                    console.log("boosting shop: ", response);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                    window.location.reload();
                }catch(error){
                    console.log("error boosting shop: ", error);
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                }
            }
        },
        created(){
            this.getUser();
            this.getAllCategories();
        },

        mounted(){
            if(!this.real_boost){
                this.shop_is_boosted = false;
            }
        }
    }
</script>

<style scoped>
    td{
        @apply !py-5 px-2
    }

    .no-products {
        background: url('../assets/images/no-products.png');
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: center;

    }
</style>