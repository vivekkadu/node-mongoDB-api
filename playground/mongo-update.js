//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';


MongoClient.connect(url, (err, db) => {

    if(err){
        return console.log('Unable to Connct MongoDb');
    }
    console.log('Connected Sucessfully');


    // set is mongoDB Update Opertor

//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5b1103f19b402f7fcecf34da')
//    },{
//        $set: {
//            completed: true
//        }
//    }, {
//        returnOriginal: false
//    }).then((result) => {
//        console.log(result);
//    });
    

   db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b10ce08f8122a07c80ce7d3')
},{
    $inc: {
        age: +1
    },
    $set: {
        Name: 'Vivek'
    }
}, {
    returnOriginal: false
}).then((result) => {
    console.log(result);
});
 
    db.close();
});