var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(url);

// var Todo = mongoose.model('Todo', {
//     text: {
//       type: String,
//       required: true,  // mongooes validation
//       minlength: 1,
//       trim: true
//     },
//     completed: {
//       type: Boolean, 
//       default: false
//     },
//     completedAt: {
//        type: Number,
//        default: false
//     }
// });

// var ATodo = Todo({
//     text: 'Take Aaata'
// });

// ATodo.save().then((doc) => {
//   console.log('Data Inserted', doc)
// },(err) => {
//     console.log('Unable to Add', err);
// });


var User = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var NewUser = User({
    email:'vivekkadu97@gmail.com'
});

NewUser.save().then((doc) => {
    console.log(doc);
}, (err) => {
    console.log(err);
})