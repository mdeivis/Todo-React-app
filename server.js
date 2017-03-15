global.__rootDir = `${__dirname}`;
global.__baseDir = `${__dirname}/api`;

var port = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(`${__rootDir}/public`));

app.use((req, res) => {
    res.sendFile(path.resolve(`${__rootDir}/public/index.html`));
});

module.exports = app;

// Listen
app.listen(port);
console.log('Server is running successful on ' + port + ' port');