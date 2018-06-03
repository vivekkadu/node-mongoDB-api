const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');

var id ='6b141d450f6a19782905403b11';

if(!ObjectID.isValid(id)) {
 return  console.log('Id is not valid');
}

Todo.find({
  _id : id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log("Id not Found");
    }
    console.log('Todo', todo);
}).catch((e) => console.log(e) );