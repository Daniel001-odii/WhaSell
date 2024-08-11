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
                    <div v-if="shop.name" class="flex flex-row items-center flex-wrap justify-between w-full gap-5">
                        <div class="flex flex-col">
                            <h1 class="font-bold text-xl">{{ shop.name }}</h1>
                            <span class="text-green-500">{{ shop.category }}</span>
                            <span class="text-sm" v-if="user.location">{{ user.location.address }}, {{ user.location.LGA }}, {{ user.location.state }}, NG.</span>
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
                        <button type="button" class="btn bg-gray-100" @click="edit_shop = !edit_shop">cancel</button>
                
                        <button type="submit" class="bg-app_green btn text-white">
                            Save edit
                        </button>
                    </div>
                </form>


                <!-- PRODUCTS & PRODUCT DETAIL -->
                <div class=" p-3 mt-12 rounded-lg border bg-white text-green-800 font-bold">
                    My products ({{ shop_products.length }})
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
                        <tbody class="">
                            <tr class="hover:bg-gray-50 p-2 cursor-pointer" v-for="(product, index) in shop_products" :key="index">
                                <td @click="selected_product = index" class="flex flex-row gap-2 items-center">
                                    <div class="bg-red-400 !size-12 rounded-xl overflow-hidden">
                                        <img :src="product.images[0]" class="h-full w-full ">
                                    </div>
                                    <span>
                                        {{ product.name.substring(0,30) }}...
                                    </span>
                                </td>
                                <td>{{ product.category }}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>NGN {{ product.price.toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- PRODUCT DETAIL PREVIEW -->
                <div class=" p-3 mt-12 rounded-lg border bg-white text-green-800 font-bold">
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
                        <div class="flex flex-row justify-between mt-8">
                            <button class="bg-red-700 text-white p-3 btn">
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
            </div>

            
            <!-- displays only if user is a buyer without a store.. -->
            <div v-if="user.account_type == 'buyer'" class="p-8 border flex flex-col rounded-lg gap-3">
                <p v-if="!create_shop_option">No shop yet? create a shop to <br/><button class="btn bg-black text-white mt-3"  @click="create_shop_option = !create_shop_option">start selling</button></p>
                
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
            }
        },
        methods:{

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

            async changeShopImage(){
                const form = new FormData();
                const file = this.new_shop.image;

                form.append('shop_image', file);


                try{
                    const response = await axios.patch(`/shops/${this.shop._id}/image`, form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('upload p-image: ', response);
                    window.location.reload();
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
            }
        },
        created(){
            this.getUser();
            this.getAllCategories();
        }
    }
</script>

<style scoped>
    td{
        @apply !py-5 px-2
    }
</style>