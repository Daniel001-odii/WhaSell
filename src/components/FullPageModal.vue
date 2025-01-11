<template>
    <div class=" min-h-screen flex w-full fixed z-50 bg-[rgba(0,0,0,0.8)] justify-center items-center top-0 left-0 p-8">
        <div class=" gap-3 flex flex-col bg-white  max-w-[600px] p-8 rounded-lg text-center items-center justify-center">
            <slot>
                <span>
                    <i class="text-gray-500 text-2xl bi bi-info-circle"></i>
                </span>
                <p><b class="text-2xl">Hey, your session has expired</b><br/> Do you want to logout or continue using the app?</p>
                <div class="flex flex-row-reverse gap-3">
                    <button @click="logout()" class="bg-app_green text-white w-fit rounded-md mt-4 px-6 py-2 font-bold hover:bg-opacity-90">continue</button>
                    <!-- <button @click="logout()" class="bg-gray-400 text-white w-fit rounded-md mt-4 px-6 py-2 font-bold hover:bg-opacity-90">Logout</button> -->
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


    export default {
        name: "FullPageModal",
        data(){
            return{
                close_modal: false,
            }
        },

        methods:{

            async logout() {
                try {
                    const response = await axios.post('/logout');
                    this.$router.push('/login');
                    this.$emit('close-modal');
                } catch (error) {
                    console.error(error);
                }
            },

            async getNewRefreshToken(){
                try{
                    const response = await axios.post('/token');
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'success',
                    });
                     
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    
                    console.log('refresh token: ', response);
                }catch(error){
                    this.$toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                    });
                    // console.log('error getting new token: ', error);
                }
            }
        }
    }
</script>

<style scoped>

</style>