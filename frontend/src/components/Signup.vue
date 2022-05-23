<template>
  <header>
  <li>
    <div class="container">
      <span class="itemlabel"><label for="nom">Nom </label></span>
      <span class="item"><input v-model="nom" id="nom_usr" name="nom_usr"/></span>
    </div>  
  <div class="container">  
    <span class="itemlabel"><label for="mailadress">Adresse e-mail </label></span>
    <span class="item"><input v-model="usr" id="login_usr" name="login_usr"/></span>
  </div>
  <div class="container">  
    <span class="itemlabel"><label for="password">Mot de passe </label></span>
    <span class="item"><input v-model="mdp" id="mdp_usr" name="mdp_usr" type="password"/>
    </span>
  </div>
    <ul><li><button @click="createUser">Sign up</button></li></ul>  
  </li>
  </header>
</template> 

<script>
import axios from 'axios';
export default {
  name: 'SignupApp',
  data() {
    return {
      usr: "",
      mdp: "",
      nom: "",
    }
  },
  methods :{
    createUser : function(){



      if (this.nom === "") {
          alert("Veuillez remplir votre nom");
      }
      
      if (this.email === "") {
          alert("Veuillez remplir votre adresse email");
      }

      if (this.password === "") {
          alert("Veuillez remplir votre mot de passe");
      }
      axios.post('http://localhost:3000/api/auth/',{"usr_nom":this.nom,"usr_email" : this.usr, "usr_pwd" : this.mdp})
      .then(() => {
        alert("Votre inscription est bien prise en compte");
        this.$router.push("/login")
      })
        
      
      //}
    },
  }
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
