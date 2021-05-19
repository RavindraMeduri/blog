const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret : 'secret@1234',
    resave : false,
    saveUninitialized : false  
}));

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.listen(3000);