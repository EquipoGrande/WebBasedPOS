
// Boilerplate code to set up Express
const express = require('express');
const app = require('express')();
const router = express.Router();
const port = 3000;
const { application_name } = require('pg/lib/defaults');


// Landing page is login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Login.html');
});

//server.js

var productListController = require('./controllers/productlist')(express);
app.use('/productlist', productListController);

// serve all the static files. They will match the folder structure of this project
app.use(express.static('./'));

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))