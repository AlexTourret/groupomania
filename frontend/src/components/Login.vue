<template>
  <header class="hello">
    <ul><label for="mailadress">Adresse e-mail</label></ul>
    <ul><li><input v-model="usr" id="login_usr" name="login_usr" /></li></ul>
    <ul><label for="password">Mot de passe</label></ul>
    <ul><li><input v-model="mdp" id="mdp_usr" name="mdp_usr" type="password" /></li></ul>
    <ul><li><button @click="getUser">Login</button></li></ul>  
    <ul><li><label for="log">{{ token }}</label></li></ul>
  </header>
</template> 

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      usr: "",
      mdp: "",
      token: null,
    }
  },
  methods :{
    getUser(){
      
      // console.log(json);
      // this.usr = "alexandretourret@ciblemut.net";
      // this.mdp = "Lucas_0503";
      //const json = JSON.stringify({"usr_email" : this.usr, "usr_pwd" : this.mdp})
      axios.post('http://localhost:3000/api/auth/login?id='+this.usr,{"usr_email" : this.usr, "usr_pwd" : this.mdp})
      .then(response => {
        // en cas de réussite de la requête
        const token   = JSON.stringify(response.data.token);
        const userId  = JSON.stringify(response.data.userId);
        const role  = JSON.stringify(response.data.role);
        localStorage.setItem("Token", token);
        localStorage.setItem("userID", userId);
        localStorage.setItem("role", role);
        this.$router.push("/comments");
      })
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
@media screen and (max-width:1024px) {
    
    .header,
    .content {
        width: 90%;
    }
}
@media screen and (max-width:768px) {
    
    .header,
    .content {
        width: 98%;
    }
    .modif{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .espacement{
        margin: 0;
    }
    .button {
        width: 50%;
    }
    .createcomment {
        width: 100%;
    }
}
</style>