<template>
  <div class="home">
    <Header />
    <Login :usr="usr"
                    :mdp="mdp"
                    :token="token" />
    <Footer />                
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Header from "../components/HeaderPage";
import Footer from "../components/FooterPage";

export default {
  name: 'LoginPage',
  components: {
    Login,
    Header,
    Footer
  },
  data() {
		return {
      usr: "",
      mdp: "",
      token: ""
    }
  } 
}
</script>