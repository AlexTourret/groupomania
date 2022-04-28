"use strict";

const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const sequelize = require('../models/database');
const { Op } = require('sequelize');

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
  };

exports.getOnePost = (req, res, nest) => {
    Post.findOne({ where: { id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

exports.createPost =(req,res,next)=> {
    Post.create({
        title : req.body.titre,
        message : req.body.message,
        user_id : req.body.user_id
    }).then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
};
  
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId
   
    Post.findOne(
        { where: 
            { id: req.params.id } 
        }
    )
    .then(post => { 
        if (userId === post.user_id){
            Post.destroy({ where: { id: req.params.id }
            })
            .then(user => res.status(200).json({ message: 'post supprimé !' }))
            .catch(error => res.status(400).json({ error }))
        }else{
            res.status(401).json({message: 'requête non autorisé'})
        }
    })
    .catch(error => res.status(400).json({ error }));
  };

exports.modifyPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId

    
    Post.findOne({ where: { id: req.params.id } }
       ) 
    .then(post => {
        if (userId === post.user_id){
            const modifyPost = {
                title : req.body.titre,
                message : req.body.message,
                user_id : req.body.user_id    
            }
            Post.update(modifyPost,
                { 
                    where: { id: req.params.id } 
                })
            .then(user => res.status(200).json({ message: 'post modifié !' }))
            .catch(error => res.status(400).json({ error }));    
    }else{
        res.status(401).json({message: 'requête non autorisé'})    
    }
    })
    .catch(error => res.status(400).json({error}));
  };  