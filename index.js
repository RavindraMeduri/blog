const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const publicRouter = require('./routes/public.route');
const postRouter = require('./routes/posts.route');

const app = express();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret : 'secret@1234',
    resave : false,
    saveUninitialized : false,
    store : new FileStore({
        retries : 0
    })   
    
}));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/', publicRouter);

app.use('/posts', postRouter);

app.listen(3000);