<template>
  <div class="hello">
    <ul><label for="mailadress">Adresse e-mail {{ usr }}</label></ul>
    <ul><li><input v-model="usr" id="login_usr" name="login_usr"  /></li></ul>
    <ul><label for="password">Mot de passe {{ mdp }}</label></ul>
    <ul><li><input v-model="mdp" id="mdp_usr" name="mdp_usr" type="password"/></li></ul>
    <ul><li><button>Login</button></li></ul>  
  </div>
</template> 

<script>
export default {
  name: 'OuvertureAppli',
  data() {
    return {
      usr: "",
      mdp: ""
    }
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 20px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ff8080;
}
button {
  background-color: #ff8080;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>