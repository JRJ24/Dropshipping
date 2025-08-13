const User = require('../models/users');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('viewUser', { titulo: 'ViewUser', users: users });
    } catch (error) {
        res.status(500).send('Error retrieving users');
    }
}

const editUserGet = async (req, res) => {
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
}

const addUser = (req, res) => {
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
}

const editUserPost = async (req, res) => {
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
}

module.exports = {
    getUsers,
    editUserGet,
    addUser,
    editUserPost
};