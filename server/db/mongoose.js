var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://vivek:vivek97@ds147450.mlab.com:47450/vivektodos');

module.exports = {mongoose}
