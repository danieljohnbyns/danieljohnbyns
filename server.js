const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

// set port
const expressPort = process.env.PORT || 5500;
const socketPort = parseInt(expressPort) + 1100;



const { WebSocketServer } = require('ws').Server;
const wss = new WebSocketServer({ port: socketPort });



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
app.locals.socketPort = socketPort;
app.locals.port = socketPort;



// routes
app.get('/', (req, res) => {
    const port = socketPort;
    console.log(`User : ${port}`);
    res.render('index'), {
        port: port,
        trylang: ''
    };
});

app.get('/images', (req, res) => {
    res.render('index');
});



app.listen(expressPort, () => {
    console.log(`App running on port: ${expressPort}`);
});



console.log(`Web socket port is: ${socketPort}`);
wss.on('connection', (ws) => {
    console.log('hi');

    ws.onclose = () => {
        console.log('bye');
    };
});