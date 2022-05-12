<template>
  <div class="sujet">
    <Header />
    <div class="sujet">
    <h1>Fil des discussions</h1>
    
    <div><label>Titre</label></div>
    <div><input v-model="posts.titre" name="titre" /></div> 
    <div><label>Message</label></div>
    <div><input v-model="posts.message" name="message" /></div> 
    <button  @click="createPost()" class="button">Créer une nouvelle discussion</button>
    </div>
    <article>
    <div v-if="posts.length == 0">
      <p>Désolé il n'y a aucune publication...</p>
    </div>
    
    <div v-else :key="post.id" v-for="post in posts" class="comment">
      <router-link :to="`/unPost/${post.id}`" >
      <div>
          <h2>{{ post.title }}</h2>
          <p class="info">
              Posté par 
              <b>{{ post.user.usr_nom }} </b>
              le <b>{{ dateFormat(post.created_date) }}</b>
              à <b>{{ hourFormat(post.created_date) }}</b>
          </p>
      </div>
      </router-link>
    </div>
    </article>
    <Footer />                
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

import Header from "../components/HeaderPage";
import Footer from "../components/FooterPage";




export default {
    name: 'listeEchange',
    components: {
        Header,
        Footer
    },
    data () {
    return {
        posts: [],
        search:''
    }
    },
    methods :{
        getPost() {
        const config = {
         headers: {
             "Content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('Token')}`,
         }};
        axios.get('http://localhost:3000/api/posts/all', config)
        .then(response => (this.posts = response.data))        
        .catch(error => console.log(error))

      },

      createPost(){
        const config = {
         headers: {
             "Content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('Token')}`,
         }};
        this.posts.userId = localStorage.getItem('userID');
        axios.post('http://localhost:3000/api/posts', {"titre" : this.posts.titre, 
                                                      "message": this.posts.message,
                                                      "user_id":this.posts.userId}, config)
                
        .then(() => 
          this.$router.go("/")
        )
        .catch(error => console.log(error))
         
        },
        dateFormat(createdDate) {
            const date = new Date(createdDate)
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
            return date.toLocaleDateString('fr-FR', options);
        },
        hourFormat(createdHour) {
            const hour = new Date(createdHour)
            const options = { hour: 'numeric', minute:'numeric', second:'numeric'};
            return hour.toLocaleTimeString('fr-FR', options);
        }
    },
    mounted(){
        this.getPost()
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
  color: #000000;
}
info {
    font-size: 0.8vw;
}
h2 {
    font-size: 1.3vw;
    margin: 30px 0 10px 0;
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
button2 {
  background-color: #ff8080;
  border: none;
  color: white;
  padding: 7px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 8px;
  margin: 2px 1px;
  cursor: pointer;
}
post {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #000000;
    width: 300px;
}
.comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ff8080;
    border-radius: 20px;
    margin-bottom: 20px;
    
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