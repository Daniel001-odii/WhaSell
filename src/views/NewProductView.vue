<template>

<div v-if="product_uploaded" class="fixed min-h-screen w-full top-0 right-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
    <div class="flex flex-col justify-center items-center bg-white p-5 rounded-lg">
        <i class="bi bi-check-circle-fill text-green-500 text-4xl"></i>
        <p class="font-bold mt-3">Product uploaded Successfully!</p>
    </div>
</div>

<!-- {{ product }} -->
<!-- {{ images }} -->

    <div class=" min-h-screen flex flex-col justify-start items-center">
        <div class="mt-20"></div>
        
        <!-- SWITCH TO PRODUCT OR GLIP -->
        <div class="flex flex-row flex-wrap justify-center items-center gap-3 md:gap-12 p-5">
            <label :class="upload_type == 'listing'?'bg-app_light_green':''" class="flex flex-row justify-center items-center gap-6 rounded-full border border-app_green px-4 py-2 font-bold">
                <span>Listing</span>
                <input type="radio" name="upload" id="listing" v-model="upload_type" value="listing">
            </label>

            <label  :class="upload_type == 'glip'?'bg-app_light_green':''" class="flex flex-row justify-center items-center gap-6 rounded-full border border-app_green px-4 py-2 font-bold">
                <span>Glip</span>
                <input disabled type="radio" name="upload" id="listing" v-model="upload_type" value="glip">
            </label>
        </div>


        <div class=" max-w-sm md:w-[500px] md:max-w-md p-8">
            <div v-if="upload_type == 'listing'" class="">
                <form @submit.prevent="uploadProduct">
                    <div v-if="tab == 1" class="rounded-2xl flex flex-col gap-4">
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

                        <div class="w-full max-w-lg mx-auto">
                            <h2 class="text-lg font-semibold mb-4">Add Product Photo</h2>
                            <p class="mb-4 text-gray-600">At least 1 photo of this product must be added.<br>The first image will be displayed as the product thumbnail.</p>
                            <div class="flex gap-3 mb-6 flex-wrap">
                                <label class=" w-20 h-20 rounded-lg bg-green-100 text-app_green flex items-center justify-center cursor-pointer">
                                    <input type="file" class="hidden" @change="onFileChange" multiple>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V13" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M3 16L10 13L15.5 15.5" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19 19V22M16 19H19H16ZM22 19H19H22ZM19 19V16V19Z" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </label>

                            <div v-for="(image, index) in images" :key="index">
                                <div class="w-20 h-20 rounded-lg border border-gray-300 overflow-hidden relative">
                                <img :src="image" alt="Product Photo" class="w-full h-full object-cover">
                                <button type="button" @click="removeImage(index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-lg p-1">
                                <i class="bi bi-x-lg"></i>
                                </button>
                                </div>
                            </div>

                        
                            </div>
                            
                        </div>
                        
                        <button :disabled="product.name == '' || product.description == '' || product.category == '' || product.product_images == ''" type="button" @click="tab += 1" class="bg-[#47C67F] rounded-lg p-3 text-white font-semibold hover:bg-opacity-90 flex flex-row items-center justify-center">Next
                            <!-- <i class="pi pi-angle-right pl-3 mt-[2px]"></i> -->
                        </button>
                    </div>
                    <div v-if="tab == 2" type="button" class="rounded-2xl flex flex-col gap-4">
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

            <!-- GLIPS -->
            <div v-if="upload_type == 'glip'" class=" w-full">
                <div class="flex flex-col gap-5 justify-center items-center rounded-lg cursor-pointer bg-app_light_green p-10 border border-app_green">
                    <div>
                        <p class="font-bold text-lg text-app_green">Upload a video lip of your product</p>
                        <span class="text-sm text-gray-400">Drag and drop or tap to input your media content</span>
                    </div>
                   
                    <i class="bi bi-camera-video text-3xl text-app_green"></i>
                </div>

                <div class="flex flex-col mt-4">
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

                <button :disabled="product.name == '' || product.description == '' || product.category == ''" type="button" @click="tab += 1" class="bg-[#47C67F] mt-3 w-full rounded-lg p-3 text-white font-semibold hover:bg-opacity-90 flex flex-row items-center justify-center">Next
                    <!-- <i class="pi pi-angle-right pl-3 mt-[2px]"></i> -->
                </button> 
            </div>
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
                upload_type: "listing",
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
                    "brand new",
                    "refurbished",
                    "refurbished by manufacturer",
                    "fairly used"
                ],

                tab: 1,
                product: {
                    name: '',
                    description: '',
                    category: '',
                    product_images: [],
                    condition: '',
                    price: '',
                    charge_for_delivery: 'no',
                    price_negotiable: 'no',
                    delivery_fee: '',
                },

                product_uploaded: false,
                loading: false,

                images: [],
            }
        },

        methods:{
            onFileChange(event) {
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    this.images.push(URL.createObjectURL(file));
                    this.product.product_images.push(file);
                };
            },

            removeImage(index) {
                this.product.product_images.splice(index, 1);
                this.images.splice(index, 1);
            },

           

            async uploadProduct(){
                const formData = new FormData();
                for (let file of this.product.product_images) {
                    formData.append('product_images', file);
                };
                // append other product fields here...
                formData.append('name', this.product.name)
                formData.append('description', this.product.description)
                formData.append('category', this.product.category)
                formData.append('condition', this.product.condition)
                formData.append('price', this.product.price)
                formData.append('charge_for_delivery', this.product.charge_for_delivery)
                formData.append('price_negotiable', this.product.price_negotiable)
                formData.append('delivery_fee', this.product.delivery_fee)
                try{
                    const response = await axios.post('/products/new', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.product_uploaded = true;

                    // flash product successful upload modal and redirect to shop page..
                    setTimeout( ()=> {
                        this.$router.push('/account/shop')
                    }, 5000);
                    
                    console.log(response);
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