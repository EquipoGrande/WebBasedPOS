
// Boilerplate code to set up Express
const express = require('express');
const app = express();
const port = 3000;

// Landing page is login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Login.html');
});

// serve all the static files. They will match the folder structure of this project
app.use(express.static('./'));

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))