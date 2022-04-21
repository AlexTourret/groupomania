"use strict";

const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/all', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.post('/', userCtrl.createUser); 
router.post('/login', userCtrl.login);


module.exports = router;