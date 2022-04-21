<template>
  <div class="signup">
    <!-- <div id="app" class="app"> -->
    <SignUpApp :usr="usr"
                :mdp="mdp"
                :nom="nom"/>
    <!-- </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpApp from '@/components/Signup.vue'

export default {
  name: 'SignUpView',
  components: {
    SignUpApp
  },
  data() {
		return {
      nom: "",
      usr: "",
      mdp: ""
      
    }
  } 
}
</script>