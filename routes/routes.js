const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/users');
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

router.get('/viewUser',async (req, res) => {

    try{
        const users = await User.find();
        res.render('viewUser', { titulo: 'ViewUser', users: users });
    } catch (error) {
        res.status(500).send('Error retrieving users');
    }
    
});

router.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('editUser', { titulo: 'EditUser', users: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving user');
    }
});

router.post('/add', upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        photo: req.file.filename 
    });

    user.save().then(() => {
        res.redirect('/viewUser');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error saving user');
    });
});


router.post('/edit/:id', upload, async (req, res) => {
    const userID = req.params.id;
    let new_photo = '';

    if(req.file){
        new_photo = req.file.filename;

        try{
            fs.unlinkSync(path.join(carpetaUpload, req.body.old_image));
        }
        catch (error) {
            console.error('Error deleting old image:', error);
            
        }
    }else{
        new_photo = req.body.old_image;
    }

    try {
        const user = await User.findByIdAndUpdate(userID, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            photo: new_photo
        });

        res.redirect('/viewUser');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

module.exports = router;