<template>
    <div>
        <div class="border rounded-lg flex flex-col p-3">
            <div class="flex flex-row flex-wrap gap-3 p-5">
                <div class=" cursor-pointer bg-gray-600 hover:bg-gray-500 h-24 w-24 rounded-full min-w-24 flex justify-center items-center text-2xl">
                    <i class="bi bi-camera text-white"></i>
                </div>
                <div class="">
                    <p class="font-bold text-2xl">John Ehirimmadu E.</p>
                    <p>xenithheight@gmail.com</p>
                    <p>+2348156074667</p>
                    <button class="bg-app_green hover:bg-opacity-95 p-2 rounded-md w-fit px-6 text-white self-end mt-3">
                        <i class="bi bi-pen mr-3"></i>Edit
                    </button>
                </div>
            </div>
        </div>

        <!-- LOCATION AREA -->

        <div class="divider-tab">
            location
        </div>

        <div class="border rounded-lg flex md:flex-row gap-3 p-8 mt-1">
            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">state<span class="text-red-500 ml-1">*</span></span>
                <select class="border p-3 w-full rounded-md">
                    <option>Select State</option>
                </select>
            </div>

            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">L.G.A<span class="text-red-500 ml-1">*</span></span>
                <select class="border p-3 w-full rounded-md">
                    <option>Select State</option>
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
                <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none">
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
    export default {
        name: "PersonalDetailsView",
        components:{

        },
        data(){
            return{

            }
        },
        created(){
            
        }
    }
</script>

<style scoped>
   
</style>