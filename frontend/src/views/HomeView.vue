<template>
  <div class="home">
    <Header />
    <h1>Bienvenue sur le réseau social de l'entreprise <strong>Groupomania</strong></h1>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/HeaderPage";
import Footer from "../components/FooterPage";

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>
