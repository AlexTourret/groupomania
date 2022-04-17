<template>
  <li>
    <div class="container">
      <span class="itemlabel"><label for="nom">Nom </label></span>
      <span class="item"><input id="nom_usr" name="nom_usr"/></span>
    </div>  
  <div class="container">  
    <span class="itemlabel"><label for="mailadress">Adresse e-mail </label></span>
    <span class="item"><input id="login_usr" name="login_usr"/></span>
  </div>
  <div class="container">  
    <span class="itemlabel"><label for="password">Mot de passe </label></span>
    <span class="item"><input id="mdp_usr" name="mdp_usr" type="password"/>
    </span>
  </div>
    <ul><li><button>Sign up</button></li></ul>  
  </li>
</template> 

<script>
export default {
  name: 'SignupApp'
}
</script>

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
input {
  border: 2px solid #ff8080;
  border-radius: 12px;
  padding: 5px;
  width: 300px;
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
.container {
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin: 1em;
  align-items: center; 
}
.itemlabel {
  width: 200px;
  align-items: center; 
}
.item {
  width: 200px;
  align-items: center; 
}

</style>
