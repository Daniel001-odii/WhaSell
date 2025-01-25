<template>
    <NavbarView/>
    <div class="container mx-auto min-h-screen">
        <!-- <PageTitle>Settings</PageTitle> -->
         <RouterLink to="/market">
            <button class="flex flex-row gap-1 font-medium text-xl p-3">
                <i class="bi bi-arrow-left-short"></i>
                Settings
            </button>
        </RouterLink>
        <div  class="flex md:flex-row gap-5 relative flex-col">
            <!-- sticky top-5 -->
            <div class="p-3  md:sticky top-5  flex flex-col gap-3 border rounded-xl w-full md:w-64 min-w-64 h-fit bg-white">
                <RouterLink to="/account" class="nav-items"  :class="{'active-nav': isUserPage }" @click="page_visible = !page_visible" id="account_details">Personal details</RouterLink>
                <RouterLink to="/account/shop" class="nav-items" :class="{'active-nav': isShopPage }"  @click="page_visible = !page_visible" id="my_shop">My Shop</RouterLink>
                <RouterLink to="/account/analytics" class="nav-items" :class="{'active-nav': isAnalyticsPage }" @click="page_visible = !page_visible" id="analytics">Analytics & Insights</RouterLink>
                <RouterLink to="/account/subscriptions" class="nav-items" :class="{'active-nav': isUpgradePage }" @click="page_visible = !page_visible" id="subscriptions">Subscriptions</RouterLink>
                <!-- <RouterLink to="/account/notifications" class="nav-items" :class="{'active-nav': isNotifyPage }" @click="page_visible = !page_visible">Manage Notifications</RouterLink> -->
                <!-- <RouterLink to="#" class="nav-items" :class="{'active-nav': isNotifyPage }" @click="page_visible = !page_visible">Manage Notifications</RouterLink> -->
            </div>


            <!-- class="w-full min-h-screen flex-col gap-1 p-5 md:flex absolute left-0 md:relative -top-[10px]" :class="page_visible ? 'flex':'hidden'" -->
            <!-- <div class="flex flex-col gap-3 w-full overflow-y-auto h-screen pb-12"> -->
                <div class="flex flex-col gap-3 w-full pb-12">
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


      <!-- ONBOARDING STOPS -->
      <VOnboardingWrapper ref="wrapper" :steps="steps" @finish="completeOnboarding()">
      <template #default="{ previous, next, step, exit, isFirst, isLast, index }">
        <VOnboardingStep>
          <div class="bg-white shadow sm:rounded-lg p-5">
            <div class="px-4 py-5 sm:p-6">
              <div class="sm:flex sm:items-center sm:justify-between">
                <div v-if="step.content">
                  <h3 v-if="step.content.title" class="text-lg font-medium leading-6 text-gray-900">{{ step.content.title }}</h3>
                  <div v-if="step.content.description" class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>{{ step.content.description }}</p>
                  </div>
                </div>
                <div class="mt-5 space-x-4 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center relative">
                  <span class="absolute right-0 bottom-full mb-2 mr-2 text-gray-600 font-medium text-xs">{{ `${index + 1}/${steps.length}` }}</span>
                  <template v-if="!isFirst">
                    <button @click="previous" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm">Previous</button>
                  </template>
                  <button @click="next" type="button" class="inline-flex items-center rounded-md border border-transparent bg-app_green px-4 py-2 font-medium text-white shadow-sm hover:bg-ap_green focus:outline-none focus:ring-2 focus:ring-app_green focus:ring-offset-2 sm:text-sm">{{ isLast ? 'Finish' : 'Next' }}</button>
                </div>
              </div>
            </div>
          </div>
        </VOnboardingStep>
      </template>
    </VOnboardingWrapper>
</template>

<script>
import { RouterLink } from 'vue-router';
import NavbarView from '../components/NavbarView'
import PageTitle from '../components/PageTitle'
import axios from 'axios';

import { defineComponent, ref } from 'vue'
import { VOnboardingWrapper, VOnboardingStep, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'
import { onMounted } from 'vue';



    export default {
        name: "AccountTemplateView",
        components: {
            NavbarView,
            PageTitle,
            VOnboardingWrapper,
            VOnboardingStep,
        },

        setup() {
            const wrapper = ref(null)
            const { start, goToStep, finish } = useVOnboarding(wrapper)
            const steps = [
                { 
                    attachTo: { element: '#account_details' }, 
                    content: { 
                    title: "Account Settings",
                    description: "Update your profile information, manage security settings, and customize your preferences effortlessly."
                    } 
                },
                { 
                    attachTo: { element: '#my_shop' }, 
                    content: { 
                    title: "Manage Your Shop",
                    description: "Access your shop details, monitor performance, and keep track of analytics to grow your business."
                    } 
                },
                { 
                    attachTo: { element: '#analytics' }, 
                    content: { 
                    title: "Insights & Analytics",
                    description: "Get a detailed overview of your shop's performance, customer engagement, and key metrics."
                    } 
                },
                { 
                    attachTo: { element: '#subscriptions' }, 
                    content: { 
                    title: "Manage Subscriptions",
                    description: "View and update your subscription plans, payment options, and billing history with ease."
                    } 
                }
            ];


            onMounted(() => {
                if(!localStorage.getItem('onboarding2_complete')){   
                    start()
                }
            })
        
                return {
                    wrapper,
                    steps
                }
        },

        data(){
            return{
                page_visible: false,
            }
        },

        methods: {
            
            completeOnboarding(){
                console.log("onboarding 1 complete");
                localStorage.setItem('onboarding1_complete', true);
            },
            async getUserDetails(){
                try{
                
                    const response = await axios.get('/user');
                    this.user = response.data.user;
                    this.user.credits = response.data.credits;
                    console.log("user :", response);
                }catch(error){
                    if(error.response.status == 401){
                        this.$router.push('/login')
                    };
                }
            },
        },

        mounted(){
            this.getUserDetails();
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
                return this.$route.path.startsWith('/account/subscriptions')
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

   /*  .active-nav{
        @apply bg-app_green text-white hover:bg-app_green
    } */

    .active-nav{
        @apply hover:text-app_green text-app_green font-bold border-r-[5px] border-app_green rounded-none
    }
</style>