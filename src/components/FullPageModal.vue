<template>
    <div class=" min-h-screen w-full fixed z-50 bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
        <div class=" gap-3 flex flex-col bg-white w-[400px] p-5 rounded-lg text-center items-center justify-center">
            <span>
                <i class="text-gray-500 text-2xl bi bi-info-circle"></i>
            </span>
            <p><b class="text-2xl">Your session expired</b><br/> login to continue using the app</p>
            <button @click="redirectToLogin()" class="bg-app_green text-white w-fit rounded-md mt-4 px-6 py-2 font-bold">Login</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FullPageModal",
        data(){
            return{

            }
        },

        methods:{
            redirectToLogin(){
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>