<template>
    <div>
        <button @click="$router.go(-1)" class="flex flex-row gap-1 font-medium text-xl p-3">
            <i class="bi bi-arrow-left-short"></i>
            <slot>Page title</slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: "PageTitle",
    }
</script>

<style scoped>

</style>