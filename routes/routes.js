const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/users');
const { GetProduct, GetProductById, SaveProduct,UpdateProduct,
DeleteProduct, ShowDeleteProduct } = require("../Controllers/productController");
const { getUsers, editUserGet, addUser, editUserPost } = require('../Controllers/usersController');

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

router.get('/user/add', (req, res) => {
    res.render('addUser', { titulo: 'AddUser' });
});

router.get('/products/add', (req, res) => {
    res.render('addProduct', { titulo: 'AddProducts' });
});

// =========================
// User Routes
// =========================
router.get('/user/viewUser', getUsers);
router.get('/user/edit/:id', editUserGet);
router.post('/user/edit/:id', upload, editUserPost);
router.post('/user/add', upload, addUser);

// =========================
// Product Routes
// =========================
router.get('/products/ViewProduct', GetProduct);
router.get('/products/edit/:id', GetProductById);
router.post('/products/edit/:id', upload, UpdateProduct);
router.get('/products/delete/:id', ShowDeleteProduct);
router.post('/products/delete/:id', DeleteProduct);
router.post('/products/add/', upload, SaveProduct);

module.exports = router;