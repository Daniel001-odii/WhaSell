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

        <!-- {{ product }} -->

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
                            <span class="text-red-500" v-if="file_upload_error"> error:{{ file_upload_error }}</span>
                            <!-- <div>{{ upoad_image_results }}</div> -->
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

                           
                            <div v-for="(image, index) in upoad_image_results" :key="index">
                                <!-- status   progress  image_preview -->
                                <div class="w-20 h-20 rounded-lg border border-gray-300 overflow-hidden relative">
                                        <SpinnerComponent v-if="image.status === 'uploading'" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                                    <!-- </div> -->
                                  
                                    <img :src="image.image_preview" alt="Product Photo" class="w-full h-full object-cover">
                                    <button type="button" @click="removeImage(image.filePath, index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-lg p-1 z-20">
                                    <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            </div>

                        
                            </div>
                            
                        </div>
                        
                        <button :disabled="product.name == '' || product.description == '' || product.category == '' || product.images == ''" type="button" @click="tab += 1" class="bg-[#47C67F] rounded-lg p-3 text-white font-semibold hover:bg-opacity-90 flex flex-row items-center justify-center">Next
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
                            <!-- <input class="form-input" type="number" name="product-price" placeholder="NGN 999, 000.00" v-model="product.price"> -->
                            <AmountInput v-model="product.price"/>
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

import AmountInput from '../components/AmountInput.vue';

import SpinnerComponent from '../components/SpinnerComponent.vue'


    export default {
        name: "NewProductView",
        components: {
            Stepper,
            StepperPanel,
            AmountInput,
            SpinnerComponent,
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
                    images: [],
                    condition: '',
                    price: '',
                    charge_for_delivery: 'no',
                    price_negotiable: 'no',
                    delivery_fee: '',
                },

                product_uploaded: false,
                loading: false,

                images: [],
                file_upload_error: '',
                upoad_image_results: [],
                // product_i
            }
        },

        methods:{
            onFileChange(event) {
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (file) {
                    // Allowed file types
                    const allowedTypes = ["image/"];

                    // Check if the file type is allowed
                    const isValidFileType = allowedTypes.some(type => file.type.startsWith(type));

                    if (!isValidFileType) {
                        this.file_upload_error = "Please select a valid image file (jpg, png, svg, etc)";
                    } else if (file.size > 3 * 1024 * 1024) {
                        this.file_upload_error = "File size should not exceed 3MB.";
                    } else {
                        this.file_upload_error = "";
                        file.progress 
                        this.uploadFile(file);
                    }
                }
                };
            },

            removeImage(filePath, index) {
                this.upoad_image_results.splice(index, 1);
                this.product.images.splice(index, 1);
                this.deleteImage(filePath);
            },

            /* async uploadProductImage(file){
                try{
                    const form = new FormData();
                    form.append('images', file);
                    const response = await axios.post('/products/images', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log("file uploaded: ", response)
                    return response
                }catch(error){
                    return error;
                }
            }, */

           

            async uploadProduct(){
               const payload = this.product;
                try{
                    const response = await axios.post('/products/new', payload);
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
            },


            uploadFile(file) {
                if(this.upoad_image_results.length >= 5){
                    // this.toast.error("Maximum upload per-time reached")
                    console.log("max file upload reached")
                } else {
                    const formData = new FormData();
                    formData.append('images', file);

                    const uploadResult = {
                        status: 'uploading',
                        progress: 0,
                        image_preview: '',
                    };

                    const imageUrl = URL.createObjectURL(file);
                    uploadResult.image_preview = imageUrl;
                    this.upoad_image_results.push(uploadResult);

                    const index = this.upoad_image_results.length - 1; // Index of the current upload result

                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', `${this.$api_url}/products/image`, true);

                    // Handle progress event
                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const progress = Math.ceil((event.loaded  / event.total ) * 100);
                            console.log(`Progress: ${progress}%`); // Debug log
                            this.upoad_image_results[index].progress = progress;
                            this.$forceUpdate(); // Force Vue to re-render
                        } else {
                            console.log('Progress event not computable'); // Debug log
                        }

                        // disabled next buttons here...
                    };

                    // Handle response
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                        const response = JSON.parse(xhr.response);
                       /*  response.image.forEach(file => {
                        //    attach images to main form body here...
                            
                        }); */
                        this.upoad_image_results[index].filePath = response.result.url;

                        console.log("from upload: ", response);
                        
                        this.product.images.push(response.result.url);
                        this.upoad_image_results[index].status = 'uploaded';
                        this.$forceUpdate();
                        // re-enable next buttons here....


                        } else {
                            this.upoad_image_results[index].status = 'failed';
                            console.error('Error uploading file 1:', xhr.response);
                            this.file_upload_error = 'error uploading image'
                            this.$forceUpdate(); // Ensure reactivity
                        }
                    };

                    xhr.onerror = () => {
                        // re-enable next buttons here...


                        this.upoad_image_results[index].status = 'failed';
                        this.file_upload_error = 'error uploading image'
                        console.error('Error uploading file 2:', xhr.response);
                        this.$forceUpdate(); // Ensure reactivity
                    };
                    // Send the form data
                    xhr.send(formData);
                }
            },

            extractFilePath(url) {
                // Create a URL object
                const urlObj = new URL(url);

                // Extract the pathname from the URL
                const fullPath = urlObj.pathname;

                // Extract the portion of the path from the folder name to the image name
                const filePath = fullPath.substring(fullPath.indexOf('product-images/'));

                console.log("deleted: ", filePath)

                return filePath;
            },

            async deleteImage(filePath) {
    try {
        const extractedPath = this.extractFilePath(filePath).replace(/ /g, '%20');
        console.log("Attempting to delete: ", extractedPath);

        const response = await axios.delete(`/products/image/delete`, {
            data: { filePath: extractedPath }
        });
        console.log("deleting image: ", response);
    } catch (error) {
        console.log("error deleting image: ", error);
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