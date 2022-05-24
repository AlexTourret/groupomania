"use strict";

const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/users');
const sequelize = require('../models/database');
const { Op } = require('sequelize');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: [{
            model : User
        }]}
    )
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
  };

exports.getOnePost = (req, res, nest) => {
    Post.findOne({ 
        where: { id: req.params.id } ,
        include: [{
            model : User
        }]})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

exports.createPost =(req,res,next)=> {
    
    if (req.file) {
        Post.create({
            title : req.body.titre,
            message : req.body.message,
            image: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
            user_id : req.body.user_id
    }).then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
    }else{
        Post.create({
            title : req.body.titre,
            message : req.body.message,
            user_id : req.body.user_id
        }).then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error })); 
    }
};
  
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token.replaceAll("\"",""), process.env.TOKEN );
    const userId = decodedToken.userId
    const role = decodedToken.role
    Post.findOne(
        { where: 
            { id: req.params.id } 
        }
    )
    .then(post => { 
        if (userId === post.user_id || role === 0 || role === 1){
            if (post.image != null) {
                const filename = post.image.split('/images/posts/')[1];
                fs.unlink(`images/posts/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id }
                    })
                    .then(user => res.status(200).json({ message: 'post supprimé !' }))
                    .catch(error => res.status(400).json({ error }))
                })
            }else{
                Post.destroy({ where: { id: req.params.id }
                })
                .then(user => res.status(200).json({ message: 'post supprimé !' }))
                .catch(error => res.status(400).json({ error }))    
            }
        }else{
            res.status(401).json({message: 'requête non autorisé'})
        }
    })
    .catch(error => res.status(400).json({ error }));
  };

exports.modifyPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token.replaceAll("\"",""), process.env.TOKEN );
    const userId = decodedToken.userId
    //console.log(req.file);
    if (req.file) {
        Post.findOne({ where: { id: req.params.id } 
        }) 
        .then(post => {
            if (userId === post.user_id){
                if (post.image) {
                    const filename = post.image.split('/images/posts/')[1];
                    fs.unlink(`images/posts/${filename}`, () => {
                        const modifyPost = {
                            title : req.body.titre,
                            message : req.body.message,
                            user_id : req.body.user_id,
                            image: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`    
                        }
                    
                        Post.update(modifyPost,
                        { 
                            where: { id: req.params.id } 
                        })
                        .then(user => res.status(200).json({ message: 'post modifié !' }))
                        .catch(error => res.status(400).json({ error }));    
                    })}else{
                        const modifyPost = {
                            title : req.body.titre,
                            message : req.body.message,
                            user_id : req.body.user_id,
                            image: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`    
                        }
                    
                        Post.update(modifyPost,
                        { 
                            where: { id: req.params.id } 
                        })
                        .then(user => res.status(200).json({ message: 'post modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                    }
            }else{
                res.status(401).json({message: 'requête non autorisé'})    
            }
        })
        .catch(error => res.status(400).json({error}));
    }else{
        Post.findOne({ where: { id: req.params.id } 
        }) 
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
    }
  }; 
exports.moderatePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token.replaceAll("\"",""), process.env.TOKEN );
    const userId = decodedToken.userId;
    const role = decodedToken.role
    console.log(userId);
    console.log(role);
    Post.findOne({ where: { id: req.params.id }})
    .then(() => {
        if (role === 1) {
            const moderation = {
                moderate : req.body.moderate
            };

            Post.update(moderation, { where: { id: req.params.id }})
            .then(() => { res.status(201).json({ message: 'Moderation effectuée !' })})
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(401).json({
                message: 'Requête non autorisée !' 
            });
        }
    })
    .catch(error => res.status(500).json({ error }));
}   