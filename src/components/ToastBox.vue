<template>
    <div v-if="true" class="box bg-[#0B7B69]">
        <div>
           <i class="bi bi-balloon text-green-300 text-xl"></i>
        </div>
        <div>
            Login successful!
        </div>
    </div>

    <div v-if="false" class="box bg-[#8C1823]">
        <div>
           <i class="bi bi-question-diamond-fill text-red-300 text-xl"></i>
        </div>
        <div>
            Wrong password, check the password you entered!
        </div>
    </div>

    <div v-if="false" class="box bg-orange-500">
        <div>
           <i class="bi bi-question-diamond-fill text-orange-200 text-xl"></i>
        </div>
        <div>
            warning! check the password you entered!
        </div>
    </div>

    <div v-if="false" class="box bg-gray-500">
        <div>
           <i class="bi bi-question-diamond-fill text-gray-200 text-xl"></i>
        </div>
        <div>
            normal notification
        </div>
    </div>

</template>

<script>
    export default {
        name: "ToastBox",
        data(){
            return{

            }
        },
        props:{
            error: String,
            success: String,
            warning: String,
            neutral: String,
        }
    }
</script>

<style scoped>
.box{
    @apply flex flex-row items-center gap-4 text-white w-fit p-3 px-5 absolute rounded-md top-5 right-5 font-bold
}
</style>