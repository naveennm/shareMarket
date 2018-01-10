var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var tweetlog = new Schema({
  name: String,
  someID: String
});


module.exports = mongoose.model('tweetlog', tweetlog);