require('./config/config');
const _ = require('lodash');
var express = require('express');
var {ObjectID} = require('mongodb');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var { Todo } = require('./models/todos');
var { User } = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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
    res.send({todo});
}, (err) => {
   res.status(400).send(err);
});

});



//PATCH to Upadate property from todo

app.patch('/todos/:id', (req, res) => {

    var id = req.params.id;
    //var body store property from todo which can be available to update by user

    var body = _.pick(req.body ,['text', 'completed']);

        if(!ObjectID.isValid(id)){
                return res.status(404).send();
            }
    //Set the completedAt if user set Completed as true
    //if statement run when body.completed is boolean and body.completd is true
   
        if(_.isBoolean(body.completed) && body.completed){ 
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt= null;
        }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
       if(!todo) {
           return res.status(404).send();
       }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});


  //User Model Routes: 

   //User POST request

   app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });
  
      

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user); 
});

app.listen(port, () => {
    console.log('STARTED ON PORT', port);
})

module.exports = {app};