require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = require('../routers/routers')

const app = express();
const PORT = process.env.PORT || 3000;

//db connection
mongoose.connect(process.env.DB_URI)
const db = mongoose.connection;
db.on('error',(erorr) => console.log(error))
db.once('open', () => console.log('Se establecion la coneccion con la db'));


//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'ProjectoFinal',
    saveUninitialized: true,
    resave: false
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})


const path = require('path');
app.use('/upload', express.static(path.join(__dirname, '../upload')));
//configurar motor de plantillas

app.set('view engine', 'ejs');

app.use('', router)
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
})