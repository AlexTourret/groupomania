<template>
  <div class="container">
    <nav><img alt="Vue logo" src="../assets/Icon-titre2.png"></nav>
  <nav>
    <nav>
      <a><router-link to="/login">Connexion</router-link></a>
      <a><router-link to="/signup">S'inscrire</router-link></a>
    </nav>
  </nav>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'HeaderPage'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  justify-content: left;
  margin: 1em;
  align-items: center; 
}
nav {
  float: left;
  padding: 30px;
  display: inline-block;
  justify-content: left;  
  a {
    font-weight: bold;
    color: #2c3e50;
    display: inline-block;               /* Transformation en block */
    min-width: 120px;             /* Largeur minimale des liens */   
    margin: 0.5rem;               /* Marges externes (1 valeurs = 4 directions) */
    padding: 0.4rem 0;            /* Marges internes (2 valeurs = haut/bas et gauche/droite)*/
    text-align: center;           /* Centrage du texte */   
    //background-color: #ff8080;    /* Couleur d'arrière-plan */
    color: #000000;                  /* Couleur du texte */
    text-decoration: none;        /* Suppression du soulignement */
    border: 1px solid #fff;       /* Ajout d'une bordure */
    border-radius: 4px;  
    
    
    &.router-link-exact-active {
      color: #ff8080;
    }
  }
}
#bloc_page
{
    width: 900px;
    margin: auto;
}
@media all 
{
    #bloc_page
    {
        width: auto;
    }
}
</style>
