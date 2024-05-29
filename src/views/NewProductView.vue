<template>
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
                        <input class="form-input" type="textarea" name="product-name" placeholder="Samsung S23 Ultra" v-model="product.name">
                    </div>

                    <div class="flex flex-col">
                        <span class="label">Product Category *</span>
                        <select class="form-input">
                            <option>Electronics</option>
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
                    <button @click="tab += 1" class="bg-app_green rounded-lg p-3 text-white font-semibold hover:bg-opacity-90">Next</button>
                </div>
                <div v-if="tab == 2" type="button" class="border rounded-2xl flex flex-col p-8 gap-4">
                    <div class="flex flex-col">
                        <span class="label">Condition *</span>
                        <select class="form-input">
                            <option>Brand new</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <span class="label">Price *</span>
                        <input class="form-input" type="number" name="product-price" placeholder="NGN 999, 000.00" v-model="product.price">
                    </div>

                    <div class="flex flex-col">
                        <span class="label">Will you charge for delivery?</span>
                        <select class="form-input">
                            <option>No</option>
                        </select>
                    </div>

                    <div class="flex flex-col">
                        <span class="label">Are you open to negotiation?</span>
                        <select class="form-input">
                            <option>No</option>
                        </select>
                    </div>

                    <button class="bg-app_green rounded-lg p-3 text-white font-semibold hover:bg-opacity-90">Post</button>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'

    export default {
        name: "NewProductView",
        components: {
            Stepper,
            StepperPanel
        },  
        data(){
            return{
                tab: 1,
                product: {
                    name: '',
                    description: '',
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