"use strict";

const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:id',auth, commentCtrl.getPostComment);
router.post('/', auth, multer, commentCtrl.createComment); 
router.delete('/:id', auth, multer, commentCtrl.deleteComment); 
router.put('/:id', auth, multer, commentCtrl.modifyComment); 

module.exports = router;