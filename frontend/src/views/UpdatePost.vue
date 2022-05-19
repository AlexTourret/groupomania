<template>
    <div class="sujet">
    <Header />
    <div class="sujet">
    <div><label>Titre</label></div>
    <div><input v-model="post.title" name="titre" /></div> 
    <div v-if="post.image">
        <img :src="post.image" alt="Image du post" class="file">
    </div>
    <div>
        <label v-if="!post.image" for="file" class="label-file" aria-label="Choisir une photo pour ce post">Choisir une image</label>
        <button v-else @click="deletefile()" class="label-file" aria-label="Supprimer cette photo du post"> Supprimer cette image</button>
        <input type="file" accept=".jpeg, .jpg, .png, .webp, .gif" v-on:change="uploadFile" id="file" class="input-file" aria-label="Image du post">
    </div>
    <div><label>Message</label></div>
    <div><input v-model="post.message" name="message" /></div> 
        <button  @click="updatePost()" class="button">Mise à jour de la discussion</button>
    </div>
    <Footer />                
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Header from "../components/HeaderPage";
import Footer from "../components/FooterPage";

export default {
    name: 'updatePost',
    components: {
        Header,
        Footer
    },
    data () {
    return {
        id_post: this.$route.params.id,
        post:[{ title : '',
                image: '',
                message : '',
                userId : ''
            }],
        id:'',
        search:'',
        preview :''
    }
    },
    methods :{
        getUnPost() {

        const config = {
         headers: {
             "Content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('Token')}`,
         }};
        axios.get('http://localhost:3000/api/posts/'+this.id_post, config)
        .then(response => (this.post = response.data))        
        .catch(error => console.log(error))

      },

      updatePost(){
        const fileField = document.querySelector('input[type="file"]');
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('Token')}`,
            }};
        if (this.post.title === "")
            alert("Veuillez remplir le titre");
        if (this.post.content === "")
            alert("Veuillez remplir votre message");
        if (this.post.image === null && this.post.title != "" && this.post.content != "") {
            
            this.post.userId = localStorage.getItem('userID');
            axios.put('http://localhost:3000/api/posts/'+this.id_post, {"titre" : this.post.title, 
                                                        "message": this.post.message,
                                                        "user_id":this.post.userId}, config)
                    
            .then(() => 
            this.$router.push("/unPost/"+this.id_post)
            )
            .catch(error => console.log(error))
            
        } else if (this.post.title != "" && this.post.content != "") {
            var fileName = document.getElementById("file").value
            var idxDot = fileName.lastIndexOf(".") + 1;
            var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            
            if (extFile === "jpg" || extFile === "jpeg" || extFile === "png" || extFile === "webp" || extFile === "gif"|| extFile ===""){
                this.post.userId = localStorage.getItem('userID');
                let data = new FormData()
                data.append('image', fileField.files[0])
                data.append('titre', this.post.title)
                data.append('message', this.post.message)
                data.append('user_id', this.post.userId)
                
                
                axios.put('http://localhost:3000/api/posts/'+this.id_post, data, config)
                        
                .then(() => 
                this.$router.push("/unPost/"+this.id_post)
                )
                .catch(error => console.log(error))
                
            } else {
                alert("Uniquement les fichiers jpg, jpeg, png, webp et gif sont acceptés!");
            }
            
            }
        },
        uploadFile(e) {
            if (e.target.files) {
                let reader = new FileReader()
                reader.onload = (event) => {
                    this.preview = event.target.result
                    this.post.image = event.target.result
                }
                reader.readAsDataURL(e.target.files[0])
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
        deletefile() {
            this.image = '';
        }
    },
    mounted(){
        this.getUnPost()
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