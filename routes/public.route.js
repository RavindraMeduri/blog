const router = require('express').Router();
const UserModel = require('../models/user.model');

router.get('/', (req, res) => {

    res.render('pages/home', {
        username : req.session.username
    });
});

router.get('/about', (req, res) => {
    res.render('pages/about', {
        username : req.session.username
    });
});

router.get('/signin', (req, res) => {
    res.render('pages/signin', {
        username : req.session.username
    });
});

router.get('/signup', (req, res) => {
    res.render('pages/signup', {
        username : req.session.username
    });
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    // TODO: Validate the username and passsword
    var user = await UserModel.findByUsername(username.toLowerCase());
    if(user.username === username && user.password === password) {
        req.session.username = username;
        return res.redirect('/');
    }

   //TODO: username and password are incorrect
});

router.post('/signup', async (req, res) => {

    const { username, name, mobile, password } = req.body;

    //TODO: Validate the data
    if (!username) {
        return;
    }

    // Validate the username if it exists or not
    var isPresent = await UserModel.checkUsername(username);
    if(isPresent) {
        //TODO: I need to notify the user that user is already present
        return;
    }

    // Register the user
    await UserModel.create({...req.body, username : username.toLowerCase()});

    //Start the session for the user
    req.session.username = username;

    //redirect to homepage
    res.redirect('/');
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    return res.redirect('/signin');
});

module.exports = router;