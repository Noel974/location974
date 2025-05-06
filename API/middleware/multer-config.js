// Importation du package multer
const multer = require('multer');
const path = require("path")

// Séléction des format acceptés
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Configutation du chemin
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../assets/media"))
    },
    //Définition du nom de fichier
    filename: (req, file, callback) => {
        console.log('==> file', file)
        const name = file.originalname.split(' ').join('_').slice(0,-4);
        const extension = MIME_TYPES[file.mimetype];
        console.log(extension)
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');