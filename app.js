const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require("body-parser");

const app = express();
const dbUrl = 'mongodb+srv://Maksym-Yankivskyy:01051974ma@cluster0.if9wi.mongodb.net/portfolio-api?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const skillRoutes = require("./routes/skills");


app.use("/api", skillRoutes);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

mongoose.connect(dbUrl)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));