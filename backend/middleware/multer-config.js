"use strict";

const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//storage contient la logique pour indiquer à multer où enregistrer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/posts');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    //on s'assure de l'unicité du nom de fichier
    callback(null, Date.now() + file.originalname);
  }
});

module.exports = multer({storage: storage}).single('image');