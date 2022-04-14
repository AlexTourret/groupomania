<template>
  <div class="about">
    <!-- <div id="app" class="app"> -->
    <AboutApp />
    <!-- </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import AboutApp from '@/components/About.vue'

export default {
  name: 'AboutView',
  components: {
    AboutApp
  }
}
</script>