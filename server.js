const express = require('express');
const app = express();

// set port
const port = process.env.PORT || 5500;

app.use(express.static(__dirname + '/public'));

// routes

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('app running');
});

app.set('view engine', 'ejs');



