const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

// set port
const port = process.env.PORT || 5500;

// uses
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('app running');
});

app.set('view engine', 'ejs');



