//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';


MongoClient.connect(url, (err, db) => {

    if(err){
        return console.log('Unable to Connct MongoDb');
    }
    console.log('Connected Sucessfully');

//    db.collection('Todos').find({ 
//       // completed: false
//       _id: new ObjectID('5b10ccc27ab7781c181c5097') 
//     }).toArray().then((docs) => {
//     console.log('Todos:');
//     console.log(JSON.stringify(docs, undefined, 2));
//    },(err) => {
//      console.log('Unable to fetch Todos', err);
//    })
   
 //methods after find is called cursor in MongoDb API
   
//    db.collection('Todos').find().count().then((count) => {
//   console.log('Todos Count:', count);
//  },(err) => {
//    console.log('Unable to fetch Todos', err);
//  })

 db.collection('Users').find({
     name: 'Vivek'
 }).toArray().then((docs) => {
    console.log('Users:', docs);
   },(err) => {
     console.log('Unable to fetch User', err);
   })
 

 
    db.close();
});