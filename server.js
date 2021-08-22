const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();



// uses
app.use(express.urlencoded({extended: false}));
app.use(getWebSocketPort);
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));



// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));



// middlewares
function getWebSocketPort(req, res, next) {
    req.webSocketPort = 'socketPort';
    next();
};



// routes
app.get('/', (req, res) => {
    const port = socketPort;
    console.log(`User : ${port}`);
    res.render('index');
});

app.get('/images', (req, res) => {
    res.render('index');
});



app.listen(expressPort, () => {
    console.log(`App running on port: ${expressPort}`);
});


