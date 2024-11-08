<template>
    <NavbarView/>
    <div class="container mx-auto min-h-screen bg-">
        <!-- <PageTitle>Settings</PageTitle> -->
         <RouterLink to="/market">
            <button class="flex flex-row gap-1 font-medium text-xl p-3">
                <i class="bi bi-arrow-left-short"></i>
                Settings
            </button>
        </RouterLink>
        <div  class="flex md:flex-row gap-5 p-5 relative flex-col">
            <!-- sticky top-5 -->
            <div class="p-3 flex flex-col gap-3 border rounded-xl w-full md:w-64 min-w-64 h-fit bg-white">
                <RouterLink to="/account" class="nav-items"  :class="{'active-nav': isUserPage }" @click="page_visible = !page_visible">Personal details</RouterLink>
                <RouterLink to="/account/shop" class="nav-items" :class="{'active-nav': isShopPage }"  @click="page_visible = !page_visible">My Shop</RouterLink>
                <RouterLink to="/account/analytics" class="nav-items" :class="{'active-nav': isAnalyticsPage }" @click="page_visible = !page_visible">Analytics & Insights</RouterLink>
                <RouterLink to="/account/upgrade" class="nav-items" :class="{'active-nav': isUpgradePage }" @click="page_visible = !page_visible">Subscriptions</RouterLink>
                <RouterLink to="/account/notifications" class="nav-items" :class="{'active-nav': isNotifyPage }" @click="page_visible = !page_visible">Manage Notifications</RouterLink>
            </div>


            <!-- class="w-full min-h-screen flex-col gap-1 p-5 md:flex absolute left-0 md:relative -top-[10px]" :class="page_visible ? 'flex':'hidden'" -->
            <div class="flex flex-col gap-3 w-full overflow-y-auto h-screen pb-12">
                <div class="font-bold p-3 border rounded-lg text-green-700 bg-white">
                    <!-- <button @click="page_visible = !page_visible">
                        <i class="pi pi-angle-left pr-3 mt-[2px]"></i>
                    </button> -->
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
        },

        mounted(){
            if(this.$route.params.is_open){
                this.page_visible = true;
            }
        },

        computed: {
            isUserPage(){
                return this.$route.name == 'Account';
            },
            isShopPage(){
                return this.$route.path.startsWith('/account/shop')
            },
            isAnalyticsPage(){
                return this.$route.path.startsWith('/account/analytics')
            },
            isUpgradePage(){
                return this.$route.path.startsWith('/account/upgrade')
            },
            isNotifyPage(){
                return this.$route.path.startsWith('/account/notifications')
            }
        }
    }
</script>

<style scoped>
    .nav-items{
        @apply p-3 rounded-md hover:bg-slate-100
    }

    .active-nav{
        @apply bg-app_green text-white hover:bg-app_green
        /* @apply text-app_green font-bold */
    }
</style>