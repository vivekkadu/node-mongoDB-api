var mongoose = require('mongoose');


var Todo = mongoose.model('Todo', {
        text: {
          type: String,
          required: true,  // mongooes validation
          minlength: 1,
          trim: true
        },
        completed: {
          type: Boolean, 
          default: false
        },
        completedAt: {
           type: Number,
           default: false
        }
    });
    

module.exports = { Todo };