"use strict";

const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/all', userCtrl.findall);
router.get('/:id', userCtrl.findOne);
router.post('/', userCtrl.createUser);


module.exports = router;