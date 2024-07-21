<template>
    <div class="min-h-screen flex flex-col justify-center items-center">
        <h1 class="font-bold text-gray-300 text-5xl">404</h1>
        <h1 class="font-bold text-3xl">Oops, the Resource was not found</h1>
        <p>Its our fault not yours, for now you can</p>
        <RouterLink to="/">
            <button class="btn bg-app_green text-white mt-3">Return Home</button>
        </RouterLink>
       
    </div>
</template>

<script>
    export default {
        name: "PageNotFoundView",
    }
</script>

<style scoped>

</style>