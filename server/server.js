var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var { Todo } = require('./models/todos');
var { User } = require('./models/user');

var app = express();


app.use(bodyParser.json()); // basically tells the system that you want json to be used

//POST Request

app.post('/todos', (req, res) => {
 //console.log(req.body);

 var todo = new Todo({
     text: req.body.text
 });

 todo.save().then((doc) => {
  res.send(doc);
 }, (e) => {
   res.status(400).send(e);
 })
});


//GET Request

app.get('/todos' , (req, res) => {
    Todo.find().then((todos) => {
      res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});



app.listen(3000, () => {
    console.log('STARTED ON PORT 3000');
})

module.exports = {app};