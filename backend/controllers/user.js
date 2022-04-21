"use strict";

const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
var validator = require("email-validator");
const sequelize = require('../models/database');
const { Op } = require('sequelize');


schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);



require('dotenv').config()


exports.getAllUser = (req, res, next) => {
  User.findAll()
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  return res.status(200).json({message:'Email erronée, format correct abc@xyz.com'});
  user.findOne({ where: { id: req.params.id } })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({error}));
};

exports.createUser =(req,res,next)=> {
  if (!validator.validate(req.body.usr_email)){
    return res.status(401).json({message:'Email erronée, format correct abc@xyz.com'});
  }
  
  if (!schema.validate(req.body.usr_pwd)){
    return res.status(401).json({message:'Le mot de passe doit comporter au moins 8 caractéres, lettre majuscule et minuscule ainsi que minimum 2 chiffres et pas d espaces'});
  }
  bcrypt.hash(req.body.usr_pwd, 10)
  .then(hash => {
  User.create({
    usr_nom : req.body.usr_nom,
    usr_email : req.body.usr_email,
    usr_pwd : hash
  }).then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
  User.findOne({
    where :{
      'usr_email' : {
       [Op.eq]: req.body.usr_email
      }
    }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
    
      bcrypt.compare(req.body.usr_pwd, user.usr_pwd)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error : "Erreur générale" }));
     })
    .catch(error => res.status(500).json({ error }));
};







