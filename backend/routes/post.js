"use strict";

const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/all',auth, postCtrl.getAllPosts);
router.get('/:id',auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost); 
router.delete('/:id', auth, multer, postCtrl.deletePost); 
router.put('/:id', auth, multer, postCtrl.modifyPost); 

module.exports = router;