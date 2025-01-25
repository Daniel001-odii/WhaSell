<template>
    <NavbarView/>
    <div class="mx-auto container">
        <PageTitle id="user_icon">{{ this.$route.name }}</PageTitle>
        <RouterView></RouterView>
        <!-- <router-view/> -->
    </div>
</template>

<script>
import NavbarView from '../components/NavbarView'
import PageTitle from '../components/PageTitle'

import { defineComponent, ref } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'
import { onMounted } from 'vue';

    export default defineComponent ({
    name: "TemplatePageView",
    components: {
        NavbarView,
        PageTitle,
    },
    
  })
</script>

<style lang="scss" scoped>

</style>