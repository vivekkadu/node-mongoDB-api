var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = 'mongodb://<vivek>:<vivek97>@ds147450.mlab.com:47450/vivektodos';


mongoose.connect(url);

module.exports = {mongoose}
