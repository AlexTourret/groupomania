<template>
  <div class="sujet">
    <HeaderConnect />
    <div class="sujet">
    <h1>Fil des discussions</h1>
    
    <div><label>Titre</label></div>
    <div><input v-model="titre" name="titre" /></div> 
    <div v-if="image">
        <img :src="image" alt="Image du post" class="file">
    </div>
    <div>
        <label v-if="!image" for="file" class="label-file" aria-label="Choisir une photo pour ce post">Choisir une image</label>
        <button v-else @click="deletefile()" class="label-file" aria-label="Supprimer cette photo du post"> Supprimer cette image</button>
        <input type="file" accept=".jpeg, .jpg, .png, .webp, .gif" v-on:change="uploadFile" id="file" class="input-file" aria-label="Image du post">
    </div>
    <div><label>Message</label></div>
    <div><input v-model="message" name="message" /></div> 
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
      </div>    
      </router-link>    
      <div>
          <p class="info">
              Posté par 
              <b>{{ post.user.usr_nom }} </b>
              le <b>{{ dateFormat(post.createdAt) }}</b>
              à <b>{{ hourFormat(post.createdAt) }}</b>
          </p>
      </div>
      
    </div>
    </article>
    <Footer />                
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

import HeaderConnect from "../components/HeaderConnect";
import Footer from "../components/FooterPage";




export default {
    name: 'listeEchange',
    components: {
        HeaderConnect,
        Footer
    },
    data () {
    return {
        titre:'',
        message:'',
        image:'',
        userId:'',
        preview:null,
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
        const fileField = document.querySelector('input[type="file"]');
        const config = {
              headers: {
                  "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('Token')}`,
              }};
        
        if (this.titre === '')
                alert("Veuillez remplir le titre")
            if (this.message === '')
                alert("Veuillez remplir le contenu du message")
            if (this.image === '' && this.titre != '' && this.message != '') {
              this.userId = localStorage.getItem('userID');
              axios.post('http://localhost:3000/api/posts', {"titre" : this.titre, 
                                                            "message": this.message,
                                                            "user_id":this.userId}, config)
                      
              .then(() => 
                this.$router.go("/")
              )
              .catch(error => console.log(error))
            } else if (this.titre != '' && this.message != '') {
                var fileName = document.getElementById("file").value
                var idxDot = fileName.lastIndexOf(".") + 1;
                var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                console.log(fileField.files[0]);
                if (extFile === "jpg" || extFile === "jpeg" || extFile === "png" || extFile === "webp" ||extFile === "gif"){
                    this.userId = localStorage.getItem('userID');
                    let data = new FormData()
                    data.append('image', fileField.files[0])
                    data.append('titre', this.titre)
                    data.append('message', this.message)
                    data.append('user_id', this.userId)
                    
                    axios.post('http://localhost:3000/api/posts', data, config)
                    .then((response) => response.json)
                    .then(() => {
                        this.$router.go("/");
                    })
                    .catch(alert)
                } else {
                    alert("Uniquement les fichiers jpg, jpeg, png, webp et gif sont acceptés!");
                }
            }
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
        },
        uploadFile(e) {
            if (e.target.files) {
                let reader = new FileReader()
                reader.onload = (event) => {
                    this.preview = event.target.result
                    this.image = event.target.result
                }
                reader.readAsDataURL(e.target.files[0])
            }
        },
        deletefile() {
            this.image = '';
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