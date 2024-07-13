<template>
    <div>
        <div class="border rounded-lg flex flex-col p-3" v-if="user">
            <div class="flex flex-row flex-wrap gap-3 p-5">
                <div class=" cursor-pointer bg-gray-600 hover:bg-gray-500 h-24 w-24 rounded-full min-w-24 flex justify-center items-center text-2xl">
                    <i class="bi bi-camera text-white"></i>
                </div>
                <!-- {{ user }} -->
                <div class="">
                    <p class="font-bold text-2xl">{{ user.username }}</p>
                    <p>{{ user.email }}</p>
                    <p>{{ user.phone }}</p>
                    <button class="bg-app_green hover:bg-opacity-95 p-2 rounded-md w-fit px-6 text-white self-end mt-3">
                        <i class="bi bi-pen mr-3"></i>Edit
                    </button>
                </div>
            </div>
        </div>

        <!-- LOCATION AREA -->
<!-- {{ NaijaStates.all() }} -->
        <div class="divider-tab">
            location
        </div>

        <div class="border rounded-lg flex md:flex-row gap-3 p-8 mt-1">
            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">state<span class="text-red-500 ml-1">*</span></span>
                <select class="border bg-slate-100 p-3 w-full rounded-md" v-model="selected_state">
                    <option disabled value="">Select State</option>
                    <option v-for="state in NaijaStates.all()" :value="state.state">{{ state.state }}</option>
                </select>
            </div>

            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">L.G.A<span class="text-red-500 ml-1">*</span></span>
                <select  class="border bg-slate-100 p-3 w-full rounded-md" v-model="selected_LGA">
                    <option disabled value="">Select LGA</option>
                    <option v-if="selected_state" v-for="LGA in NaijaStates.lgas(selected_state).lgas" :value="LGA">{{ LGA }}</option>
                </select>
            </div>
        </div>

        <!-- CONTACT AREA -->
        <div class="divider-tab">
            Contact
        </div>

        <div class="border rounded-lg flex md:flex-row gap-3 p-8 mt-1">
            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">WhatsApp number<span class="text-red-500 ml-1">*</span></span>
                <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="user.phone">
            </div>
        </div>


         <!-- SOCIALS AREA -->
         <div class="divider-tab">
            Socials
        </div>

        <div class="border rounded-lg flex md:flex-row gap-3 p-8 mt-1">
            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">Facebook Profile Link</span>
                <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none">
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import NaijaStates from 'naija-state-local-government';

    export default {
        name: "PersonalDetailsView",
        components:{

        },
        data(){
            return{
                user: '',
                NaijaStates,
                selected_state: '',
                selected_LGA: '',
            }
        },

        methods:{
            async getUserDetails(){
                try{
                    this.authenticated = true;
                    const response = await axios.get('/user');
                    this.user = response.data.user;
                    // console.log("user :", response);
                }catch(error){
                    this.authenticated = false;
                    if(error.response.status == 401){
                        this.unauthorized = true;
                        // alert('session expired please login!');
                    };

                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                }
            },
        },
        
        created(){
            this.getUserDetails();
        }
    }
</script>

<style scoped>
   
</style>