var validator = require('validator');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var _ = require('lodash');


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
       return new Promise((resolve, reject) => {
           reject();
       });
     }

     return User.findOne({
         '_id': decoded._id,
         'tokens.access': 'auth',
         'tokens.token': token
     });
}
var User = mongoose.model('Users', UserSchema);



module.exports = { User }
