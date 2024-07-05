<template>
  <Toast
  :messageicon="balloonIcon"
  />
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      balloonIcon: "<i class='bi bi-balloon'></i>"
    }
  }
}
</script>

<style>

</style>
