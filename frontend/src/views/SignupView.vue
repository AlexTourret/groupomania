<template>
  <div class="signup">
    <Header />
    <!-- <div id="app" class="app"> -->
    <SignUpApp :usr="usr"
                :mdp="mdp"
                :nom="nom"/>
    <!-- </div> -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpApp from '@/components/Signup.vue'
import Header from "../components/HeaderPage";
import Footer from "../components/FooterPage";

export default {
  name: 'SignUpView',
  components: {
    SignUpApp,
    Header,
    Footer
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