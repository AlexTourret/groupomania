"use strict";

const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
var validator = require("email-validator");

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);


require('dotenv').config()

exports.signup = (req, res, next) => {
  if (!validator.validate(req.body.email)){
    return res.status(401).json({message:'Email erronée, format correct abc@xyz.com'});
  }
  
  if (!schema.validate(req.body.password)){
    return res.status(401).json({message:'Le mot de passe doit comporter au moins 8 caractéres, lettre majuscule et minuscule ainsi que minimum 2 chiffres et pas d espaces'});
  }
  
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
  
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
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
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};