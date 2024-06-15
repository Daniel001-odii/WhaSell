<template>
    <div>
        <div class="border rounded-lg flex flex-col gap-3 p-8 mt-1">
            <div class="flex md:flex-row gap-3 w-full">
                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">Shop or business name<span class="text-red-500 ml-1">*</span></span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" placeholder="Fortune and sons telecoms">
                </div>

                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">Location<span class="text-red-500 ml-1">*</span></span>
                    <select class="border bg-slate-100 p-3 w-full rounded-md">
                        <option>Select State</option>
                    </select>
                </div>
            </div>


            <div class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                <span class="font-bold test-md">Product categories<span class="text-red-500 ml-1">*</span></span>
                <select class="border bg-slate-100 p-3 w-full rounded-md">
                    <option>Select category</option>
                </select>
            </div>
            <button class="bg-app_green hover:bg-opacity-95 p-2 rounded-md w-fit px-6 text-white self-end mt-3">
                Save
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShopView",
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