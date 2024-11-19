<template>
    <div class="flex justify-center items-center w-full h-[50vh]">
        <span class="loader"></span>
    </div>
</template>

<script>
    export default {
        name: "FullPageLoader"
        
    }
</script>

<style scoped>
.loader {
    width: 30px;
    height: 30px;
    border: 5px solid #f6f6f6;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }  
.loader{
    @apply border-b-app_green
}  
      
</style>