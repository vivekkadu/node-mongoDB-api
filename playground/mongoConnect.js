//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');


// var obj = new ObjectID;

// console.log(obj);

const url = 'mongodb://localhost:27017/TodoApp';


MongoClient.connect(url, (err, db) => {

    if(err){
        return console.log('Unable to Connct MongoDb');
    }
    console.log('Connected Sucessfully');

//collection in NOSQL is same as Table in SQL DB

//    db.collection('Todos').insertOne({
//      text: 'Some Text',
//      completed: false
//    }, (err, result) => {
//      if(err){
//          return console.log('Unable to Insert into Todos', err);
//      }
//       console.log(JSON.stringify(result.ops, undefined, 2));

//    });


// db.collection('Users').insertOne({
//          name: 'Vivek',
//          age: 20,
//          location: 'Nagpur'
//        }, (err, result) => {
//          if(err){
//              return console.log('Unable to Insert into Users', err);
//          }
//           console.log(result.ops[0]._id.getTimestamp());
    
//        });
   
    db.close();
});