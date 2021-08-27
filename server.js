const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

// port
const expressPort = process.env.PORT || 5500;



// Static files
app.use(express.static('public'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/videos', express.static(__dirname + 'public/videos'));
app.use('/fonts', express.static(__dirname + 'public/fonts'));
app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));
app.use(express.urlencoded({extended: false}));



// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));



// middlewares



// routes
app.get('/', (req, res) => {
    console.log('user');
    res.render('index', {text: 'ejs'});
});
app.get('/index', (req, res) => {
    console.log('user index');
    res.render('index', {text: 'ejs'});
});
app.get('/home', (req, res) => {
    console.log('user home');
    res.render('index', {text: 'ejs'});
});

app.get('/about', (req, res) => {
    console.log('user about');
    res.render('about');
});

app.get('/newIndex', (req, res) => {
    console.log('user newIndex');
    res.render('newIndex');
});



app.listen(expressPort, () => {
    console.log(`App running on port: ${expressPort}`);
});


