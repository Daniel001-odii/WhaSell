<template>
    <div>
        <div class="border rounded-lg flex flex-col p-3 bg-white" v-if="user">
            <form @submit.prevent="updateUserProfile" class="flex flex-col justify-center items-center gap-3 p-5">
                <!-- <div class=" cursor-pointer bg-gray-600 hover:bg-gray-500 h-24 w-24 rounded-full min-w-24 flex justify-center items-center text-2xl">
                    <i class="bi bi-camera text-white"></i>
                </div> -->
                <!-- {{ user }} -->

                <form @submit.prevent="changeUserImage" class="relative">
                    <!-- <div v-if="user" class="min-w-28 w-28 h-28 relative rounded-full border border-gray-300 overflow-hidden"> -->
                        <!-- <img :src="user_image" alt="Product Photo" class="w-full h-full object-cover"> -->
                        <div class=" uppercase font-bold flex justify-center items-center rounded-full !size-28 bg-gray-200 text-gray-500"> {{ user.username[0] }} {{ user.username[1] }}</div>
                    <!-- </div> -->

                    <!-- <label v-else class=" w-28 h-28 rounded-full bg-green-100 text-app_green flex items-center justify-center cursor-pointer"> -->
                    <!-- <label class=" w-28 h-28 rounded-full bg-black text-app_green flex items-center justify-center cursor-pointer absolute top-0 opacity-0 hover:opacity-50">
                        <input type="file" name="user_image" class="hidden" @change="onFileChange">
                        <i class="bi bi-camera-fill text-white"></i>
                    </label> -->
                    <!-- <button v-if="shop_image_edit" type="submit">save image</button> -->
                </form>

            
                <div class="w-full flex flex-col gap-3">
                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold test-md">Full Name<span class="text-red-500 ml-1">*</span></span>
                        <input type="text" name="username" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="user.username">
                    </div>

                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold test-md">Email Address<span class="text-red-500 ml-1">*</span></span>
                        <input type="email" name="email" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="user.email">
                    </div>

                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold test-md">Phone Number<span class="text-red-500 ml-1">*</span></span>
                        <input type="phone" name="phone" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="user.phone">
                    </div>
                    <div class="flex items-end justify-end">
                        <button type="submit" class="bg-app_green p-3 rounded-md text-white">
                            <span v-if="loading_profile">loading...</span>
                            <span v-else> Save Edits</span>     
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <!-- LOCATION AREA -->
<!-- {{ NaijaStates.all() }} -->
        <div id="location" class="divider-tab bg-white">
            location 
        </div>

        <form @submit.prevent="updateUserLocation" class="border rounded-lg flex flex-col  gap-3 p-8 mt-1 bg-white">
            <div class="flex flex-row gap-3">
                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">state<span class="text-red-500 ml-1">*</span></span>
                    <select class="border bg-slate-100 p-3 w-full rounded-md" v-model="location.state" name="state">
                        <option disabled value="">Select State</option>
                        <option v-for="state in NaijaStates.all()" :value="state.state">{{ state.state }}</option>
                    </select>
                </div>

                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">L.G.A<span class="text-red-500 ml-1">*</span></span>
                    <select  class="border bg-slate-100 p-3 w-full rounded-md" v-model="location.LGA" name="LGA">
                        <option disabled value="">Select LGA</option>
                        <option v-if="location.state" v-for="LGA in NaijaStates.lgas(location.state).lgas" :value="LGA">{{ LGA }}</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">Address<span class="text-red-500 ml-1">*</span></span>
                <input type="address" name="address" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="location.address">
            </div>

            <div class="flex items-end justify-end mt-3">
                <button type="submit" class="bg-app_green p-3 rounded-md text-white">
                    <span v-if="loading_location">loading...</span>
                    <span v-else> Save Edits</span>
                </button>
            </div>
        </form>

        <!-- CONTACT AREA -->
        <div class="divider-tab bg-white">
            Contact
        </div>

        <!-- {{ socials.whatsapp }} -->
        <div class="flex flex-col bg-white p-8 rounded-lg mt-3 border">
            <div class="font-bold text-lg mt-3">Add Social Media Channel</div>
       
            <div class="flex flex-row flex-wrap gap-3 mt-3">
                <button @click="whatsapp_field = !whatsapp_field" class="social-btn" :class="socials.whatsapp ? 'bg-green-400 text-white':''">
                    <i class="bi bi-whatsapp"></i>
                    WhatsApp
                    <i v-if="!socials.whatsapp" class="bi bi-plus"></i>
                </button>
                <button @click="youtube_field = !youtube_field" class="social-btn" :class="socials.youtube ? 'bg-green-400 text-white':''">
                    <i class="bi bi-youtube"></i>
                    Youtube
                    <i v-if="!socials.youtube" class="bi bi-plus"></i>
                </button>
                <button @click="facebook_field = !facebook_field" class="social-btn" :class="socials.facebook ? 'bg-green-400 text-white':''">
                    <i class="bi bi-facebook"></i>
                    facebook
                    <i v-if="!socials.facebook" class="bi bi-plus"></i>
                </button>
                <button @click="instagram_field = !instagram_field" class="social-btn" :class="socials.instagram ? 'bg-green-400 text-white':''">
                    <i class="bi bi-instagram"></i>
                    instagram
                    <i v-if="!socials.instagram" class="bi bi-plus"></i>
                </button>
                <button @click="twitter_field = !twitter_field" class="social-btn" :class="socials.twitter ? 'bg-green-400 text-white':''">
                    <i class="bi bi-twitter"></i>
                    twitter
                    <i v-if="!socials.twitter" class="bi bi-plus"></i>
                </button>
            </div>

            <form @submit.prevent="updateUserSocials">
                <div v-if="whatsapp_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">WhatsApp Number</span>
                    <input type="phone" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="socials.whatsapp">
                </div>
                <div v-if="youtube_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">Youtube Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.youtube">
                </div>
                <div v-if="facebook_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">Facebook Profile Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.facebook">
                </div>
                <div v-if="instagram_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">instagram Profile Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.instagram">
                </div>
                <div v-if="twitter_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">twitter Profile Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.twitter">
                </div>

                <div class="flex items-end justify-end mt-3">
                    <button type="submit" class="bg-app_green p-3 rounded-md text-white">
                        <span v-if="loading_socials">loading...</span>
                        <span v-else> Save Edits</span>
                    </button>
                </div>
            </form>
        </div>

         <!-- REFER CODE AREA -->
         <div class="divider-tab bg-white">
            Refer and Earn
        </div>

        <!-- Refer and earn details -->
        <div class="flex flex-col bg-white p-8 rounded-lg mt-3 border">
            <div class="mt-3 text-blue-500">Invite a friend and earn 10 credits once your friend signs up with your referal link</div>
            <div class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                <span class="font-bold test-md">Referal Link</span>
                <div class=" flex flex-row gap-3 border p-3 rounded-lg">
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" :value="refferal_link" disabled>
                    <button class="bg-app_green p-3 rounded-md text-white" @click="copyRefferalCode">
                        <i class="bi bi-copy"></i>
                    </button>
                </div>
                
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
                user: {
                    username: '',
                    email: '',
                    phone: '',
                },
                location: {
                    state: '',
                    LGA: '',
                    address: '',
                },

                instagram_field: false,
                youtube_field: false,
                twitter_field: false,
                whatsapp_field: false,
                facebook_field: false,

                socials: {
                    whatsapp: '',
                    youtube: '',
                    facebook: '',
                    instagram: '',
                    twitter: '',
                },
                NaijaStates,
                selected_state: '',
                selected_LGA: '',

                loading_socials: false,
                loading_location: false,
                loading_profile: false,

                user_image: '',
                new_user_image: null,
            }
        },

        methods:{

            copyRefferalCode() {
                navigator.clipboard.writeText(this.refferal_link).then(() => {
                    this.$toast.open({
                        message: `Refferal link copied to clipboard`,
                        type: 'success',
                    });
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            },

            onFileChange(event) {
                const file = event.target.files[0];
                this.new_user_image = file;
                
                if (file) {
                    this.user_image = URL.createObjectURL(file);
                }
                // update the shop image automatically after image change...
                this.changeUserImage()
            },

            async changeUserImage(){
                const form = new FormData();
                const file = this.new_user_image;

                form.append('user_image', file);


                try{
                    const response = await axios.patch(`/user/profile-image`, form, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    console.log('upload p-image: ', response);
                    window.location.reload();
                }catch(error){
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                    console.log("error uploading profile image: ", error);
                }
            },


            async getUserDetails(){
                try{
                    this.authenticated = true;
                    const response = await axios.get('/user');
                    // this.user.username = response.data.user.username;
                    // this.user.email = response.data.user.email;
                    // this.user.phone = response.data.user.phone;
                    this.user = response.data.user;

                    this.user_image = response.data.user.profile.image_url;
                    
                    if(this.user.location){
                        this.location = this.user.location
                    }
                    if(this.user.profile.socials){
                        this.socials = this.user.profile.socials;
                    }
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

            async updateUserProfile(){
                try{
                    this.loading_profile = true;
                    const response = await axios.patch('/user/update', this.user);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                    this.loading_profile = false;
                }catch(error){
                    console.log("error updateing user: ", error);
                    this.loading_profile = false;
                }
            },

            async updateUserLocation(){
                try{
                    this.loading_location = true;
                    const response = await axios.patch('/user/update', { location: this.location });
                    console.log("updating user location: ", response);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                    this.loading_location = false;
                }catch(error){
                    console.log("error updating user: ", error);
                    this.loading_location = false;
                }
            },

            async updateUserSocials(){
                try{
                    this.loading_socials = true;
                    const response = await axios.patch('/user/update', { socials: this.socials });
                    console.log("updating user location: ", response);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                    this.loading_socials = false;
                }catch(error){
                    console.log("error updating user: ", error);
                    this.loading_socials = false;
                }
            }
        },

        computed:{
            refferal_link(){
                if(this.user){
                    return `${window.origin}/invite?refferal_code=${this.user.refferal_code}`;
                }
            }
        },
        
        created(){
            this.getUserDetails();
        }
    }
</script>

<style scoped>
   .btn{
     @apply border rounded-md px-6 py-2
   }

   .active_social{
    @apply bg-app_green text-white
   }

   .social-btn{
    @apply btn flex gap-3 items-center hover:bg-gray-100
   }
</style>