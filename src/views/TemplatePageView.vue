<template>
    <NavbarView/>
    <div class="mx-auto">
        <PageTitle>{{ this.$route.name }}</PageTitle>
        <RouterView></RouterView>
    </div>
</template>

<script>
import NavbarView from '../components/NavbarView'
import PageTitle from '../components/PageTitle'

    export default {
        name: "TemplatePageView",
        components: {
            NavbarView,
            PageTitle,
        }
    }
</script>

<style lang="scss" scoped>

</style>