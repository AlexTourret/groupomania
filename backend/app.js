"use strict";
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const path = require("path");
const rateLimit = require('express-rate-limit')

require('dotenv').config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//prend toutes les requêtes qui ont un Content-type application/json et met à dispo leur body dans l'objet req
app.use(express.json());

// Permet de faire d'accéder à l'api depuis n'importe quelle origine ('*')
// ajouter les headers mentionnés aux requêtes envoyées vers notre API
// envoyer des requêtes avec les méthodes mentionnées
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(limiter);
app.use('/api/auth',userRoutes);

module.exports = app;