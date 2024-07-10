<template>

<div v-if="product_uploaded" class="fixed min-h-screen w-full top-0 right-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
    <div class="flex flex-col justify-center items-center bg-white p-5 rounded-lg">
        <i class="bi bi-check-circle-fill text-green-500 text-4xl"></i>
        <p class="font-bold mt-3">Product uploaded Successfully!</p>
    </div>
</div>

    <div class=" min-h-screen flex flex-col justify-start items-center">
        <div class="mt-20"></div>
      
        <div>
            <form @submit.prevent="uploadProduct" class="w-[400px]">
                <div v-if="tab == 1" class="border rounded-2xl flex flex-col p-8 gap-4">
                    <div class="flex flex-col">
                        <span class="label">Product Name *</span>
                        <input class="form-input" type="text" name="product-name" placeholder="Samsung S23 Ultra" v-model="product.name">
                    </div>
                    <div class="flex flex-col">
                        <span class="label">Product Description *</span>
                        <textarea class="form-input h-[150px] max-h-[150px]" name="product-name" placeholder="Samsung S23 Ultra" v-model="product.description"></textarea>
                    </div>

                    <div class="flex flex-col">
                        <span class="label">Product Category *</span>
                        <select class="form-input" v-model="product.category">
                            <option disabled value="">Select Category</option>
                            <option v-for="category in categories" :value="category">{{ category }}</option>
                        </select>
                    </div>

                    <div class="flex flex-col">
                        <span class="label">Add product photo *</span>
                        <p class="text-sm">Add at least 1 photo for this product <br/>the first picture is the title picture when displayed</p>
                    </div>
                    <div class="flex flex-row gap-2">
                        <div class="bg-app_light_green p-5 rounded-lg w-11 h-11 flex justify-center items-center text-app_green">
                            <i class="bi bi-plus"></i>
                        </div>
                        <div class="w-11 h-11 rounded-lg bg-gray-200">
                            <!-- <img src="../assets/images/image_3.png"> -->
                        </div>
                    </div>
                    <button :disabled="product.name == '' || product.description == '' || product.category == ''" type="button" @click="tab += 1" class="bg-[#47C67F] rounded-lg p-3 text-white font-semibold hover:bg-opacity-90 flex flex-row items-center justify-center">Next
                        <!-- <i class="pi pi-angle-right pl-3 mt-[2px]"></i> -->
                    </button>
                </div>
                <div v-if="tab == 2" type="button" class="border rounded-2xl flex flex-col p-8 gap-4">
                    <div class="flex flex-col">
                        <span class="label">Condition *</span>
                        <select class="form-input" v-model="product.condition">
                            <option disabled value="">Select Condition</option>
                            <option v-for="condition in conditions" :value="condition">{{ condition }}</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <span class="label">Product Price *</span>
                        <input class="form-input" type="number" name="product-price" placeholder="NGN 999, 000.00" v-model="product.price">
                    </div>

                    <div class="flex flex-col">
                        <span class="label">Will you charge for delivery?</span>
                        <select class="form-input" v-model="product.charge_for_delivery">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <input v-show="product.charge_for_delivery == 'yes'" class="form-input mt-3" type="number" name="delivery-fee" placeholder="NGN 999, 000.00" v-model="product.delivery_fee">
                    </div>

                    <div class="flex flex-col">
                        <span class="label">Are you open to negotiation?</span>
                        <select class="form-input" v-model="product.price_negotiable">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div class="flex flex-row gap-3 justify-between items-center">
                        <button type="button" @click="tab -= 1" class="bg-gray-400 rounded-lg p-3 text-white font-semibold hover:bg-opacity-90 px-6">
                            Prev
                            <!-- <i class="pi pi-angle-left"></i> -->
                        </button>
                        <button :disabled="product.condition == '' || product.price == ''" type="button" @click="uploadProduct" class="bg-[#47C67F] rounded-lg p-3 text-white font-semibold hover:bg-opacity-90 w-full">
                            <span v-if="loading">uploading...</span>
                            <span v-else>Post</span>
                        </button>
                    </div>
                </div>
                
            </form>
        </div>

        <!-- {{  product }} -->

    </div>
</template>

<script>
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'
import axios from 'axios';


    export default {
        name: "NewProductView",
        components: {
            Stepper,
            StepperPanel
        },  
        data(){
            return{
                categories: [
                    "Electronics & Gadgets",
                    "Health & Beauty",
                    "Automotive",
                    "Office Supplies",
                    "Arts & Crafts Supplies",
                    "Fashion & Apparel",
                    "Books & Media",
                    "Toys & Games",
                    "Pet Supplies",
                    "Jewelry & Watches",
                    "Home & Kitchen",
                    "Sports & Outdoors",
                    "Grocery & Gourmet Food",
                    "Baby Products",
                    "Travel & Luggage"
                ],

                conditions: [
                    "Brand new",
                    "Refurbished",
                    "Refurbished by Manufacturer",
                    "Fairly used"
                ],

                tab: 1,
                product: {
                    name: '',
                    description: '',
                    category: '',
                    image: '',
                    condition: '',
                    price: '',
                    charge_for_delivery: 'no',
                    price_negotiable: 'no',
                    delivery_fee: '',
                },

                product_uploaded: false,
                loading: false,
            }
        },

        methods:{
            async uploadProduct(){
                try{
                    const response = await axios.post('/products/new', this.product);
                    this.product_uploaded = true;

                    // flash product successful upload modal and redirect to shop page..
                    setTimeout( ()=> {
                        this.$router.push('/account/shop')
                    }, 5000);
                    
                    // console.log(response);
               }catch(error){
                console.log("error uploading product: ", error);
                this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .label{
        @apply font-semibold
    }
</style>