
//Require Mongoose
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017/stockapp');
//Define a schema
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    stripcode: Number,
    stripname: String,
    currentrate: Number,
    stockloss: Number,
    target: Number
});

var adminModel = mongoose.model('admin_form', adminSchema );
module.exports = {
     db : adminModel
}