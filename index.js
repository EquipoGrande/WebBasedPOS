
// Boilerplate code to set up Express
const express = require('express');
const app = require('express')();
const router = express.Router();
const port = 3000;
const { application_name } = require('pg/lib/defaults');
const path = require('path');


// Landing page is login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Login.html');
});

var productListController = require('./controllers/products')(express);
app.use('/api/products', productListController);

// serve all the static files. They will match the folder structure of this project
app.use('/', express.static(path.join(__dirname, 'html')));
app.use('/', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))