<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/Icon-titre.png">
    <OuvertureAppli :usr="usr"
                    :mdp="mdp"
                    :token="token" />
  </div>
</template>

<script>
// @ is an alias to /src
import OuvertureAppli from '@/components/OuvertureAppli.vue'

export default {
  name: 'HomeView',
  components: {
    OuvertureAppli
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
