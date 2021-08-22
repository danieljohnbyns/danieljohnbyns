const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

// set port
const expressPort = process.env.PORT || 5500;

// uses
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(expressPort, () => {
    console.log(`App running on port: ${expressPort}`);

    const socketPort = expressPort + 1100;
    const WebSocketServer = require('ws').Server;
    const wss = new WebSocketServer({port: socketPort});

    console.log(`Web socket port is: ${socketPort}`);

    wss.on('connection', (ws) => {
        console.log('hi');


        ws.onclose = () => {
            console.log('bye');
        };
    });
});

app.set('view engine', 'ejs');



