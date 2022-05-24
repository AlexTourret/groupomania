"use strict";

const jwt = require('jsonwebtoken');
const Comment = require('../models/comments');
const sequelize = require('../models/database');
const User = require('../models/users');
const Post = require('../models/posts');
const { Op } = require('sequelize');

exports.getPostComment = (req, res, next) => {
    Comment.findAll({
        where: { post_id: req.params.id },
        include: [{
            model : User
        }]
     })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}));
};

exports.createComment =(req,res,next)=> {
    Comment.create({
        date : req.body.date,
        message : req.body.message,
        user_id : req.body.user_id,
        post_id : req.body.post_id
    }).then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token.replaceAll("\"",""), process.env.TOKEN );
    const userId = decodedToken.userId
    const role = decodedToken.role
    Comment.findOne(
        { where: 
            { id: req.params.id } 
        }
    )
    .then(comment => { 
        if (userId === comment.user_id || role === 0 || role === 1){
            Comment.destroy({ where: { id: req.params.id }
            })
            .then(comment => res.status(200).json({ message: 'commentaire supprimé !' }))
            .catch(error => res.status(400).json({ error }))
        }else{
            res.status(401).json({message: 'requête non autorisé'})
        }
    })
    .catch(error => res.status(400).json({ error }));
  };

exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token.replaceAll("\"",""), process.env.TOKEN );
    const userId = decodedToken.userId

    Comment.findOne({ where: { id: req.params.id } }
    ) 
    .then(comment => {
        if (userId === comment.user_id){
            const modifyComment = {
                date : req.body.date,
                message : req.body.message
                                    
            }
            Comment.update(modifyComment,
                { 
                    where: { id: req.params.id } 
                })
            .then(comment => res.status(200).json({ message: 'commentaire modifié !' }))
            .catch(error => res.status(400).json({ error }));    
    }else{
        res.status(401).json({message: 'requête non autorisé'})    
    }
    })
    .catch(error => res.status(400).json({error}));
  };

  exports.moderateComment = (req, res, nest) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token.replaceAll("\"",""), process.env.TOKEN );
    const userId = decodedToken.userId;
    const role = decodedToken.role
    
    Comment.findOne({ where: { id: req.params.id }})
    .then(() => {
        if (role === 1) {
            const moderation = {
                moderate : req.body.moderate
            };

            Comment.update(moderation, { where: { id: req.params.id }})
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


exports.signalComment = (req, res, nest) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token.replaceAll("\"",""), process.env.TOKEN );
    const userId = decodedToken.userId;
    const role = decodedToken.role
    Comment.findOne({ where: { id: req.params.id }})
    .then(() => {
        if (role === 0) {
            const moderation = {
                moderate : false
            };
            
            Comment.update(moderation, { where: { id: req.params.id }})
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
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        include: [{
            model : User
        },{
            model : Post
        }],
        order: [["updatedAt", "ASC"]]
    })

    .then( comments => res.status(200).json(comments))
    .catch( error => res.status(400).json({error}))
};