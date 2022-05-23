<template>
    <div>
        <HeaderConnect />
            <section>
                <div class="header">
                    <div>
                        <h1>{{ post.title }}</h1>
                    </div>
                    <div>
                        <p>{{ post.message }}</p>
                    </div>
                    <div>
                        <div class="info">
                            <p>
                                Posté par 
                                <b>{{ post.user.usr_nom }} </b>
                                le <b>{{ dateFormat(post.createdAt) }}</b>
                                à <b>{{ hourFormat(post.createdAt) }}</b><br>
                            </p>
                            <p v-if="post.createdAt != post.updatedAt">
                                Modifié 
                                le <b>{{ dateFormat(post.updatedAt) }}</b>
                                à <b>{{ hourFormat(post.updatedAt) }}</b>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <p class="modif">
                    <button @click="modifyPost()" v-if="post.user_id === id" class="button" aria-label="Modifier ce post"><i class="fas fa-edit"></i> Modifier ce post</button>
                    <button @click="deletePost()" v-if="post.user_id === id || role === 1" class="button espacement" aria-label="Supprimer ce post"><i class="far fa-trash-alt"></i> Supprimer ce post</button>
                    </p>
                    <hr v-if="post.user_id === id || role === 1">
                    <img v-if="post.image" :src="post.image" alt="Image du post">
                    <p>{{ post.content }}</p>
                </div>

                <button v-if="comments.length != 0 && displaycomments === false " v-on:click="showcomment" class="comment-button" aria-label="Voir commentaire">Voir {{ comments.length }} commentaire<span v-if="comments.length >= 2">s</span></button>
                <article v-if="displaycomments">
                    <div v-bind:key="index" v-for="(comment, index) in comments" class="comment">
                        <div>
                            <p class="info">
                                Posté par 
                                <b>{{ comment.user.usr_nom }} </b>
                                le <b>{{ dateFormat(comment.updatedAt) }}</b>
                                à <b>{{ hourFormat(comment.updatedAt) }}</b>
                            </p>
                            <!-- <p> -->
                                <table>
                                <td>
                                    <button v-if="comment.user_id === id || role === 1" @click="deleteComment(index)" aria-label="Supprimer ce commentaire"> <i class="fas fa-times"></i></button>
                                    <button @click="signalComments(index)" aria-label="Signaler ce commentaire"><i class="fas fa-bell"></i> </button>
                                </td>
                                </table>
                                <!-- <button v-if="comment.user_id === id || role === 1" @click="deleteComment(index)" class="button-comment"  aria-label="Supprimer ce commentaire"><img src="../assets/supprimer.png" />
                                </button> -->
                            <!-- </p> -->
                        </div>                        
                        <hr>
                        <p class="comment-message">{{ comment.message }}</p>
                    </div>
                    <button v-on:click="hidecomment" class="comment-button" aria-label="Cacher commentaire">Cacher le<span v-if="comments.length >= 2">s</span> commentaire<span v-if="comments.length >= 2">s</span></button>
                </article>

                <button v-if="displayCreateComment === false" v-on:click="showcreatecomment" class="button" aria-label="Ecrire un commentaire">Ecrire un commentaire</button>
                <article v-if="displayCreateComment" class="createcomment">
                    <textarea v-model="commentaire" placeholder="Commentaire" cols="60" rows="5" aria-label="Message du commentaire"></textarea>
                    <button @click="createComment()" class="buttonenvoyer" aria-label="Envoyer le commentaire">Envoyer le commentaire</button>
                    <button v-on:click="hidecreatecomment" class="buttonannuler" aria-label="Annuler le commentaire">Annuler le commentaire</button>
                </article>

            </section>
            <router-link to="/comments" class="button link" aria-label="Retour au fil de discussion">Retour au fil de discussion</router-link>
        <Footer />
    </div>
</template>

<script>
import HeaderConnect from "../components/HeaderConnect";
import Footer from "../components/FooterPage";
import axios from 'axios';

export default {
    name: 'UnPost',
    components: {
        HeaderConnect,
        Footer
    },
    data () {
        return {
            id_post: this.$route.params.id,
            post: {
                message:'',
                createdAt:'',
                updatedAt:'',
                id:'',
                image:'',
                title:'',
                user: {},
                user_id:''
            },
            comments: [],
            displaycomments: false,
            displayCreateComment: false,
            commentaire:'',
            id:'',
            role: ''
        }
    },
    methods : {
        showcomment: function () {
            return this.displaycomments = true;
        },
        hidecomment: function () {
            return this.displaycomments = false;
        },
        showcreatecomment: function () {
            return this.displayCreateComment = true;
        },
        hidecreatecomment: function () {
            return this.displayCreateComment = false;
        },
        User() {
            this.id = JSON.parse(localStorage.getItem("userID"))
            this.role = JSON.parse(localStorage.getItem("role"))
        },
        
        getPost() {
            const config = {
             headers: {
                 "Content-type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("Token")}`,
            }};
            axios.get('http://localhost:3000/api/posts/'+ this.id_post, config)
            .then(response => (this.post = response.data))        
            .catch(error => console.log(error))
            .catch(alert)
        },
        
        getComments() {
            const config = {
             headers: {
                 "Content-type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("Token")}`,
            }};
            axios.get('http://localhost:3000/api/comments/'+ this.id_post, config)
            .then(response => (this.comments = response.data))        
            .catch(error => console.log(error))
            .catch(alert)
        },
        signalComments(index) {
            if (confirm("Voulez-vous vraiment signaler ce commentaire") === true) {
                const config = {
                headers: {
                     "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                }};
                let data = {
                    moderate: false
                }
                
                axios.put('http://localhost:3000/api/comments/signal/'+this.comments[index].id, data, config)
                .then((response) => response.json)
                .then(data => (this.comments[index] = data))
                .then(() => {
                    this.$router.go()
                })
                .catch(alert)
            }
        },
        dateFormat (createdDate) {
            const date = new Date(createdDate)
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
            return date.toLocaleDateString('fr-FR', options);
        },
        hourFormat (createdHour) {
            const hour = new Date(createdHour)
            const options = { hour: 'numeric', minute:'numeric', second:'numeric'};
            return hour.toLocaleTimeString('fr-FR', options);
        },
        deletePost () {
            if (confirm("Voulez-vous vraiment supprimer le post") === true) {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                    }};
                axios.delete('http://localhost:3000/api/posts/'+ this.id_post, config)    
                .then(response => response.json)
                .then(() => { 
                    this.$router.push("/comments") })
                .catch(alert)
            }
        },
        modifyPost () {
            this.$router.push(`/updatePost/${this.post.id}`)
        },
        createComment () {
            if( this.commentaire === ""){
                alert('Veuillez remplir votre commentaire')
            } else {
                const Id = JSON.parse(localStorage.getItem("userID"));
                
                let data = {
                    message: this.commentaire,
                    post_id: this.id_post,
                    user_id: Id
                }
                const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                }};
                axios.post('http://localhost:3000/api/comments', data, config)
                .then((response) => {
                    return response.json;
                })
                .then(() => {
                    this.$router.go()
                })
                .catch(error => console.log(error))
            }
        },
        deleteComment (index) {
            if (confirm("Voulez-vous vraiment supprimer ce commentaire") === true) {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                    }};
                axios.delete('http://localhost:3000/api/comments/'+ this.comments[index].id, config)  
                .then(response => response.json)
                .then(() => { 
                    alert("La suppression du commentaire est bien prise en compte")
                    this.$router.go() })
                .catch(alert)
            }
        }
    },
    mounted(){
         this.User()
         this.getPost ()
         this.getComments ()
    }
}
</script>

<style scoped>
section {
    display: flex; 
    flex-direction: column;
    align-items: center;
}
h1 {
    font-size: 1.5rem;
    margin: 30px 0 10px 0;
}
textarea {
    font-size: 1.2rem;
}
.header,
.content {
    width: 50%;
    background: #ffd7d7;
    border: 2px solid #ff8080;
}
.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.info {
    font-size: 0.8rem;
}
.modif {
    margin: 0;
}
.content {
    margin-bottom: 30px;
}
.createcomment {
    display: flex;
    flex-direction: column;
}
table {
    width: 100%;
    font-size: 1vw;
    background: #ffd7d7;
    border: 2px solid #ffd7d7;
    /* border-radius: 20px; */
    margin: 0 0 30px 0;
}
.button {
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
button {
    margin: 0 5px 0 0;
    padding: 5px 5px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    background: #ffd7d7;
    font-size: 1vw;
    cursor: pointer;
    text-decoration: none;
    color: #000000;
}
.buttonenvoyer,
.buttonannuler {
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
.buttonannuler{
    margin-bottom: 40px;
}
.button-comment {
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
.espacement {
    margin: 5px 0 0 10px;
}
.link {
    text-decoration: none;
    color: #000000;
}
.comment-button {
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
.comment {
    border: 2px solid #000000;
    /* border-radius: 20px; */
    margin-bottom: 20px;
}
.comment-info,
.comment-message {
    padding: 0 30px 0 30px;
}
img {
    width: 70%;
    border-radius: 30px;
}
.content img {
    margin-top: 10px;
}
.photo-profil {
    width: 50px;
    height: 50px;
    border: 2px solid #fd2d01;
    border-radius: 30px;
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