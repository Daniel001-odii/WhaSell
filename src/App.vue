<template>
  <div class="bg-gray-50">
    <Toast
    :messageicon="balloonIcon"
    />
    <router-view/>
  </div>
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
