
// Boilerplate code to set up Express
const express = require('express');
const app = require('express')();
app.use(express.json());
const router = express.Router();
const port = 3000;
const { application_name } = require('pg/lib/defaults');
const path = require('path');

app.use(express.json());

// Landing page is login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/Login.html');
});

var productListController = require('./controllers/products')(express);
app.use('/api/products', productListController);

var inventoryListController = require('./controllers/inventory')(express);
app.use('/api/inventory', inventoryListController);

var saleController = require('./controllers/sales')(express);
app.use('/api/sales', saleController);

var userController = require('./controllers/users')(express);
app.use('/api/users', userController);

// serve all the static files. They will match the folder structure of this project
app.use('/', express.static(path.join(__dirname, 'html')));             // serve html files on root path
app.use('/css', express.static(path.join(__dirname, 'css')));           // serve css files on css path
app.use('/js', express.static(path.join(__dirname, 'js')));             // serve js files on /js path
app.use('/assets', express.static(path.join(__dirname, 'assets')));     // serve asset files on /assets path

app.listen(port, () => console.log(`Assumpta i Tomas POS app listening on port ${port}!`))