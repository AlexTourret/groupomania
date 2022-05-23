<template>
    <div>
        <HeaderConnect />
            <article >
                <div class="filter">
                    <label for="moderate" v-if="moderate === false">Cochez pour afficher les commentaires non modérés</label>
                    <label for="moderate" v-if="moderate === true">Décochez pour afficher tous les commentaires</label><br>
                    <input v-model="moderate" type="checkbox" id="moderate" class="moderate" name="moderate">
                </div>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Titre du post</th>
                        <th>Commentaire</th>
                        <th>Modération</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(comment, index) in filterList">
                        <td><input type="text" v-model="comment.user.usr_nom" required aria-label="Nom de l'auteur du commentaire" disabled></td>
                        <td><input type="text" v-model="comment.post.title" required aria-label="Titre du post" disabled></td>
                        <td><textarea type="text" v-model="comment.message" rows="3" cols="50" required aria-label="Commentaire" disabled></textarea></td>
                        <td>
                            <button @click="moderateComments(index)" aria-label="Modérer ce commentaire" v-if="comment.moderate === false"><i class="fas fa-check"></i></button>
                            <button @click="deleteComments(index)" aria-label="Supprimer ce commentaire"><i class="fas fa-times"></i></button>
                        </td>
                    </tr>
                </table>
                <router-link to="/comments" class="button" aria-label="Retour au fil d'actualité">Retour aux posts</router-link>
            </article>
        <Footer />
    </div>
</template>

<script>
import HeaderConnect from "../components/HeaderConnect";
import Footer from "../components/FooterPage";

import axios from 'axios';

export default {
    name: 'ModerateComments',
    components: {
        HeaderConnect,
        Footer
    },
    data () {
        return {
            comments: [],
            moderate: true
        }
    },
    computed : {
        filterList() {
            return this.comments.filter((comment) =>{
                if (comment.moderate === true) {
                    return comment.moderate != this.moderate;
                } else {
                    return comment
                }
            })
        }
    },
    methods : {
        getComments() {
            const config = {
             headers: {
                 "Content-type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("Token")}`,
            }};
            axios.get('http://localhost:3000/api/comments/', config)
            .then(response => (this.comments = response.data))        
            .catch(error => console.log(error))
            .catch(alert)
        },
        moderateComments(index) {
            if (confirm("Voulez-vous vraiment valider ce commentaire") === true) {
                const config = {
                headers: {
                     "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                }};
                let data = {
                    moderate: true
                }
                
                axios.put('http://localhost:3000/api/comments/moderate/'+this.filterList[index].id, data, config)
                .then((response) => response.json)
                .then(data => (this.filterList[index] = data))
                .then(() => {
                    this.$router.go()
                })
                .catch(alert)
            }
        },
        deleteComments(index) {
            if (confirm("Voulez-vous vraiment supprimer ce commentaire") === true) {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                    }};
                axios.delete('http://localhost:3000/api/comments/'+ this.comments[index].id, config)  
                .then(response => response.json)
                .then(data => (this.filterList[index] = data))
                .then(() => { 
                    alert("La suppression du commentaire est bien prise en compte")
                    this.$router.go() })
                .catch(alert)
            }
        }
        
    },
    mounted(){
        this.getComments()
    }
}
</script>

<style scoped>
table {
    width: 100%;
    font-size: 1vw;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    /* border-radius: 20px; */
    margin: 0 0 30px 0;
}
.button{
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
input,
textarea {
    font-size: 1vw;
}
textarea {
    resize: none;
}
.filter {
    margin: 30px 0 30px 0;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    /* border-radius: 20px; */
    font-size: 1.3rem;
}
input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    /* border-radius: 6px; */
    margin: 5px 0;
    height: 20px;
    width: 20px;
    background: #ffd7d7;
    border: 2px solid #ff8080;
    
}
input[type="checkbox"]:checked {
    background: #ff8080 ;
}
@media screen and (max-width:1024px) {
    table,
    .filter {
        width: 98%;
        margin-left: 5px;
    }
    input {
    font-size: 1.5vw;
    }
}
@media screen and (max-width:768px) {
    input,
    textarea {
        width: 85vw;
        height: 5vw;
        font-size: 0.9rem;
    }
    button {
        width: 100%;
        margin: 0 0 5px 0;
        padding: 5px 10px;
    }
    i {
        font-size: 1rem;
    }
    th {
        display: none;
    }
    tr {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .button {
        margin-bottom: 50px;
        font-size: 0.8rem;
    }
}
</style>