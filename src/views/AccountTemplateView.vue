<template>
    <NavbarView/>
    <div class="container mx-auto min-h-screen">
        <PageTitle>Settings</PageTitle>
        <div  class="flex flex-row gap-5 p-5 relative">
            <div class="p-3 flex flex-col gap-3 border rounded-xl w-full md:w-64 min-w-64 h-fit sticky top-10">
                <RouterLink to="/account" class="nav-items" @click="page_visible = !page_visible">Personal details</RouterLink>
                <RouterLink to="/account/shop" class="nav-items"  @click="page_visible = !page_visible">My Shop</RouterLink>
                <RouterLink to="/account/analytics" class="nav-items" @click="page_visible = !page_visible">Analytics & Insights</RouterLink>
                <RouterLink to="/account/upgrade" class="nav-items" @click="page_visible = !page_visible">Upgrade</RouterLink>
                <RouterLink to="/account/notifications" class="nav-items" @click="page_visible = !page_visible">Manage Notifications</RouterLink>
                <RouterLink to="/account/delete" class="nav-items" @click="page_visible = !page_visible">Delete My Account</RouterLink>
                <div class="mt-20 p-3 w-full">
                    <RouterLink to="#" class=" p-3 rounded-md hover:bg-green-800 hover:text-white w-full">Log out</RouterLink>
                </div>
            </div>

            <div class="bg-white w-full min-h-screen flex-col gap-1 p-5 md:flex absolute left-0 md:relative -top-[10px]" :class="page_visible ? 'flex':'hidden'">
                <div class="font-bold p-3 border rounded-lg text-green-700">
                    <button @click="page_visible = !page_visible">
                        <i class="pi pi-angle-left pr-3 mt-[2px]"></i>
                    </button>
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
        },

        data(){
            return{
                page_visible: false,
            }
        }
    }
</script>

<style scoped>
    .nav-items{
        @apply p-3 rounded-md hover:bg-slate-100
    }
</style>