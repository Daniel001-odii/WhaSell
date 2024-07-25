<template>
    <div class="flex flex-row flex-wrap gap-5 justify-center items-center">
        <RouterLink v-for="(category, index) in categories" :key="index" :to="`/categories/${category.name}/all`">
            <div class="bg-gray-100 h-52 w-52 rounded-xl flex flex-col items-center justify-end pb-10 ">
                <p class="font-bold">{{ category.name }}</p>
            </div>
        </RouterLink>
    </div>
</template>

<script>
import axios from 'axios'


    export default {
        name: "CategoriesView",
        data(){
            return{
                categories: '',
            }
        },

        methods: {
            async getAllCategories(){
                try{
                    const response = await axios.get('/categories');
                    this.categories = response.data.categories;
                }catch(error){
                    console.log("error getting categgories..: ", error);
                }
            },
        },

        created(){
            this.getAllCategories();
        }
    }
</script>

<style scoped>

</style>