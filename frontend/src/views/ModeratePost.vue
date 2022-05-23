<template>
    <div>
        <HeaderConnect />
        <article >
            <div class="filter">
                <label for="moderate" v-if="moderate === false">Cochez pour afficher les posts non modérés</label>
                <label for="moderate" v-if="moderate === true">Décochez pour afficher tous les posts</label><br>
                <input v-model="moderate" type="checkbox" id="moderate" class="moderate" name="moderate">
            </div>
            <table>
                <tr>
                    <th>Nom</th>
                    <th>Titre du post</th>
                    <th>Message du post</th>
                    <th>Image du post</th>
                    <th>Modération</th>
                </tr>
                <tr v-bind:key="index" v-for="(post, index) in filterList">
                        <td><input type="text" v-model="post.user.usr_nom" required aria-label="Nom de l'auteur du post" disabled></td>
                        <td><input type="text" v-model="post.title" required aria-label="Titre du post" disabled></td>
                        <td><textarea type="text" v-model="post.message" required aria-label="Message du post" disabled></textarea></td>
                        <td><img v-if="post.image" :src="post.image" alt="Image du post"></td>
                        <td>
                            <button @click="moderatePost(index)" aria-label="Modérer ce post" v-if="post.moderate === false"><i class="fas fa-check"></i></button>
                            <button @click="deletePost(index)" aria-label="Supprimer ce post"><i class="fas fa-times"></i></button>
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
    name: 'ModeratePosts',
    components: {
        HeaderConnect,
        Footer
    },
    data () {
        return {
            posts: [],
            moderate: true
        }
    },
    computed : {
        filterList() {
            return this.posts.filter((post) =>{
                if (post.moderate === true) {
                    return post.moderate != this.moderate;
                } else {
                    return post
                }
            })
        }
    },
    methods : {
        getPosts() {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('Token')}`,
                }};
            axios.get('http://localhost:3000/api/posts/all', config)
            .then(response => (this.posts = response.data))        
            .catch(error => console.log(error))
            },
        moderatePost(index) {
            if (confirm("Voulez-vous vraiment valider ce post") === true) {
                
                const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                }};
                let data = {
                    moderate: true
                }
                
                axios.put('http://localhost:3000/api/posts/moderate/'+this.filterList[index].id, data, config)
                .then((response) => response.json)
                .then(data => (this.filterList[index] = data))
                .then(() => {
                    this.$router.go()
                })
                .catch(alert)
            }
        },
        deletePost(index) {
            if (confirm("Voulez-vous vraiment supprimer le post") === true) {
                console.log(this.posts[index]);
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                    }};
                    
                axios.delete('http://localhost:3000/api/posts/'+this.posts[index].id, config)    
                .then(response => response.json)
                .then(() => { 
                    this.$router.go()  })
                .catch(alert)
            }
        }
    },
    mounted(){
        this.getPosts()
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
input,
textarea {
        font-size: 1vw;
}
textarea {
    resize: none;
}
img {
    width: 80px;
    height: 80px;
    /* border-radius: 10px; */
}
tr {
    padding-bottom: 80px;
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
    background: #ff8080;
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
        padding: 0;
    }
    .button {
        margin-bottom: 50px;
        font-size: 0.8rem;
    }
}
</style>