<template>
  <transition name="fade-slide">
 <div v-if="show" class="flex justify-center min-h-screen items-center fixed bg-[rgba(0,0,0,0.8)] w-full left-0 top-0">
    <div class="bg-white rounded-lg max-[600px] p-12 flex flex-col justify-center items-center text-center">
        <slot></slot>
    </div>
 </div>
</transition>
</template>

<script>
    export default {
        name: "ModalComponent",
        props:{
            show: Boolean,
        }
    }
</script>

<style scoped>
/* Fade and Slide-In Animation */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>