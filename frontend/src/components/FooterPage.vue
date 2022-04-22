
<template>
  <footer>
    <div class="copyright">
      <p>{{copyright}} </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterPage',
  computed: {
    copyright() {
        const currentYear = new Date().getFullYear()
        return `Copyright Groupomania ${currentYear} Créateur du site Tourret Alex`
    }
  }
}
</script>
<style scoped>
ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    list-style: none;
    
}
li {
  width: 200px;
}
a {
  font-size: 1.2rem;
  color: #000000;
  text-decoration: none;
}
a:hover {
  color: #fd2d01;
}
img {
    height: 150px;
}
.copyright{
  font-size: 1rem;
}
@media screen and (max-width:768px) {
  a {
    font-size: 0.7rem;
  }
  ul {
    margin: 0
  }
  
  li {
    width: 150px;
  }
  img {
    height: 15vw;
  }
  .copyright{
  font-size: 0.8rem;
  }
}
</style>
