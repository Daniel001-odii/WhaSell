<template>
    <NavbarView/>
    <div class="container mx-auto min-h-screen">
        <PageTitle>Account</PageTitle>
        <div  class="flex flex-row gap-5">
            <div class="p-3 md:flex flex-col gap-3 border rounded-xl w-64 min-w-64 h-fit hidden sticky top-10">
                <RouterLink to="/account" class="nav-items">Personal details</RouterLink>
                <RouterLink to="/account/shop" class="nav-items">My Shop</RouterLink>
                <RouterLink to="/account/analytics" class="nav-items">Analytics & Insights</RouterLink>
                <RouterLink to="/account/upgrade" class="nav-items">Upgrade</RouterLink>
                <RouterLink to="/account/notifications" class="nav-items">Manage Notifications</RouterLink>
                <RouterLink to="/account/delete" class="nav-items">Delete My Account</RouterLink>
                <div class="mt-20 p-3 w-full">
                    <RouterLink to="#" class=" p-3 rounded-md hover:bg-green-800 hover:text-white w-full">Log out</RouterLink>
                </div>
            </div>



            <div class="w-full min-h-screen flex flex-col gap-1 p-5">
                <div class="font-bold p-3 border rounded-lg text-green-700">
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