<!-- <template>
    <VOnboardingWrapper ref="wrapper" :steps="steps" />
    <div>
      <button id="foo">Welcome</button>
      <button id="foo2">Welcome 2</button>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
  import 'v-onboarding/dist/style.css'

  import { onMounted } from 'vue';

  export default defineComponent ({
    components: {
      VOnboardingWrapper
    },
    setup() {
      const wrapper = ref(null)
      const { start, goToStep, finish } = useVOnboarding(wrapper)
      const steps = [
        // { attachTo: { element: '#user_icon' }, content: { title: "this is the user menu" } },
        { attachTo: { element: '#foo2' }, content: { title: "The final step" } }
      ]

      onMounted(() => start())
  
      return {
        wrapper,
        steps
      }
    },
    
  })
  </script> -->
  <template>
    <div>
  
    </div>
  </template>
  
  <script>
    export default {
        
    }
  </script>
  
  <style scoped>
  
  </style>