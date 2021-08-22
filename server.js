const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

// port
const expressPort = process.env.PORT || 5500;



// uses
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));



// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));



// middlewares



// routes
app.get('/', (req, res) => {
    console.log('user index');
    res.render('index');
});

app.get('/images', (req, res) => {
    res.render('index');
});



app.listen(expressPort, () => {
    console.log(`App running on port: ${expressPort}`);
});


