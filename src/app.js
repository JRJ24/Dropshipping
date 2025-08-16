require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = require('../routes/routes'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 4000;

// Use environment variable for MongoDB connection string
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    saveUninitialized: true,
    resave: false, 
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//configuring view engine
app.set('view engine', 'ejs');

app.use('/', router); // Use the router for handling routes
//app.use('/ViewProduct', routerProduct);
//app.use('/upload', express.static('upload'));
const path = require('path');
app.use('/upload', express.static(path.join(__dirname, '../upload')));// de esta fomra la descripcion de las imagenes son un poco mas descriptivas en lugar de solo la fecha y hora exacta, ya que posee el nombre de la imagen 
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});