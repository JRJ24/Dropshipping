const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/users');
const { GetProduct, GetProductById, SaveProduct,UpdateProduct,
DeleteProduct, ShowDeleteProduct, GetStoreProducts } = require("../Controllers/productController");
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

router.get('/',async (req, res) => {
    try
    {
    const users = await User.find({});
    res.render('indexAdmin',{titulo: 'Inicio', users: users});
    }catch (error) {
        console.log(error);
        req.json({
            message: error.message
        });
        res.redirect('/');
    }
})

router.get('/admin', (req, res) => {
    res.render('indexAdmin', { titulo: 'Begin' });
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
//
//  OnlineStore routers
//
router.get('/products/OnlineStore', GetStoreProducts);

module.exports = router;