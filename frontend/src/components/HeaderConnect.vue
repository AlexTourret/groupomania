<template>
    <header class="nav">
        <router-link to="/comments" ><img src="../assets/Icon-titre2.png" alt="Logo Groupomania" /></router-link> 
        
            <router-link to="/moderate/comments" aria-label="Administration des commentaires" v-if="role ===1">modération des commentaires<i class="fas fa-comments link"></i></router-link>
            <router-link to="/moderate/posts" v-if="role === 1" aria-label="Administration">Modération des posts<i class="fas fa-user-lock link"></i></router-link>
            <!-- <router-link to="/profile" aria-label="Profil"><i class="fas fa-user-circle link"></i></router-link> -->
            <a class="link disconnect" @click="disconnectUser()">Se deconnecter</a>
        
    </header>
</template>


<script>
export default {
name: 'HeaderConnect',
data () {
	return {
		role:''
	}
},
methods: {
	disconnectUser() {
		localStorage.clear();
		this.$router.push("/")
	},
	roleUser() {
		this.role = JSON.parse(localStorage.getItem("role"))
	}
},
mounted(){
    this.roleUser()
}
}   
</script>


<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  height: 90px;
}
.link {
  padding-left: 30px;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
}
.link:hover {
  color: #fd2d01;
}
.nav {
  padding: 20px 5vw;
  font-size: 1vw;
}
.nav a {
  font-weight: bold;
  color: #000000;
}
.nav a.router-link-exact-active {
  color: #fd2d01;
}
i {
    font-size: 3rem;
}
@media screen and (max-width:1024px) {
  header {
    flex-direction: column;
  }
  img {
    margin-bottom: 30px;
  }
  .link {
    padding: 0 30px;
    font-size: 20px;
  }
}
@media screen and (max-width:768px) {
  header {
    flex-direction: column;
  }
  img {
    margin-bottom: 4vw;
    height: 60px;
  }
  .link {
    padding: 0 20px;
    font-size: 15px;
  }
}
</style>

