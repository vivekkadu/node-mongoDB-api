//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';


MongoClient.connect(url, (err, db) => {

    if(err){
        return console.log('Unable to Connct MongoDb');
    }
    console.log('Connected Sucessfully');


// db.collection('Todos').deleteMany({ 
//     text: 'Take Lanch'
// }).then((result) => {
//    console.log(result);
// }, (err) => {
//   console.log(err);
// });

// db.collection('Todos').deleteOne({ 
//     text: 'Take Lunch'
// }).then((result) => {
//    console.log(result);
// }, (err) => {
//   console.log(err);
// });

db.collection('Todos').findOneAndDelete({ 
    completed: true
}).then((result) => {
   console.log(result);
}, (err) => {
  console.log(err);
});
 
    db.close();
});