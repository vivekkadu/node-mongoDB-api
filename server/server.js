var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var { Todo } = require('./models/todos');
var { User } = require('./models/user');

var app = express();

app.post('/todos', (req, res) => {

});

app.listen(3000, () => {
    console.log('STARTED ON PORT 3000');
})