var express = require('express');
var {ObjectID} = require('mongodb');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var { Todo } = require('./models/todos');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

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



//GET Request for Todo By Id

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
       return  res.status(404).send();
    }
     Todo.findById(id).then((todo) => {
         if(!todo) {
            return res.status(404).send();
         }
         res.send({todo});
     }, (err) => {
         res.status(400).send(err);
     });
});


//Delete Todos 

app.delete('/todos/:id', (req, res) => {

var id = req.params.id;

if(!ObjectID.isValid(id)){
    return res.status(404).send();
}

Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
        return res.status(404).send();
    }
    res.send(todo);
}, (err) => {
   res.status(400).send(err);
});

});



app.listen(port, () => {
    console.log('STARTED ON PORT', port);
})

module.exports = {app};