const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/users');
const { GetProduct, GetProductById, SaveProduct,UpdateProduct,
DeleteProduct } = require("../Controllers/productController");
const { getUsers, editUserGet, addUser, editUserPost } = require('../Controllers/usersController');
// const Product = require("../models/products");

const fs = require('fs');

const carpetaUpload = path.join(__dirname, '../upload');
// Import your controllers here

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, carpetaUpload);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage }).single('photo');

router.get('/', (req, res) => {
    res.render('index', { titulo: 'Inicio' });
});

router.get('/add', (req, res) => {
    res.render('addUser', { titulo: 'AddUser' });
});

router.get('/viewUser', getUsers);

router.get('/edit/:id', editUserGet);

router.post('/add', upload, addUser);

router.post('/edit/:id', upload, editUserPost);




// Products routes

router.get('/viewProduct', GetProduct);
// router.get('/:id', GetProductById)
// router.post('/', SaveProduct);
// router.put('/:id', UpdateProduct);
// router.delete('/:id', DeleteProduct);


module.exports = router;