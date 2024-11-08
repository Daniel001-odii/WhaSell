<template>
  <div class="">
    <Toast
    :messageicon="balloonIcon"
    />
    <!-- <router-view/> -->
    <RouterView></RouterView>
  </div>
</template>

<script>
// import { RouterView } from 'vue-router';


export default {
  name: 'App',
  // components: {RouterView},
  data(){
    return{
      balloonIcon: "<i class='bi bi-balloon'></i>"
    }
  }
}
</script>

<style>

</style>
