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


exports.findall = (req, res, next) => {
  User.findAll()
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({ error }));
};

exports.findOne = (req, res, next) => {
  User.findAll({
    where :{
      usr_no_pk : {
       [Op.eq]: req.params.id
      }
    }
  })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({ error }));
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
}







