var validator = require('validator');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
              validator.isEmail(value)
            },
            message: "{VALUE} is not valid email"
        }
    },
    password: {
        type: String,
        required:true,
        minlength: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token: {
            type:String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject , ['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
     var User = this;
     var decoded;
     try{
       decoded = jwt.verify(token, 'abc123');
     }catch(e) {
    //    return new Promise((resolve, reject) => {
    //        reject();
    //    });
      return Promise.reject();
     }

     return User.findOne({
         '_id': decoded._id,
         'tokens.access': 'auth',
         'tokens.token': token
     });
}


//this will run before an activity on Schema in  this case it is save

UserSchema.pre('save' , function (next) {
  var user = this;
  //isModified return true if password field is modified
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt )=> {
        bcrypt.hash(user.password, salt , (err, hash) => {
          user.password = hash;
          next();
        });
    })
  }else{
    next();
  }
});

var User = mongoose.model('Users', UserSchema);



module.exports = { User }
