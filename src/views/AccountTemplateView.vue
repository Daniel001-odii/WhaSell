<template>
    <NavbarView/>
    <div class="container mx-auto">
        <PageTitle>Account</PageTitle>
        <div  class="flex flex-row gap-5">
            <div class="p-3 md:flex flex-col gap-3 border rounded-xl w-64 min-w-64 h-fit hidden">
                <RouterLink to="#" class="nav-items">Personal details</RouterLink>
                <RouterLink to="#" class="nav-items">My Shop</RouterLink>
                <RouterLink to="#" class="nav-items">Analytics & Insights</RouterLink>
                <RouterLink to="#" class="nav-items">Upgrade</RouterLink>
                <RouterLink to="#" class="nav-items">Manage Notifications</RouterLink>
                <RouterLink to="#" class="nav-items">Delete My Account</RouterLink>
                <div class="mt-20 p-3">
                    <RouterLink to="#" class="nav-items">Log out</RouterLink>
                </div>
            </div>
            <div class="w-full min-h-screen flex flex-col gap-5">
                <div class="font-bold p-3 border rounded-lg">
                    {{ this.$route.name }}
                </div>
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import NavbarView from '../components/NavbarView'
import PageTitle from '../components/PageTitle'

    export default {
        name: "AccountTemplateView",
        components: {
            NavbarView,
            PageTitle,
        }
    }
</script>

<style scoped>
    .nav-items{
        @apply p-3 rounded-md hover:bg-slate-100
    }
</style>