
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:String,
    password: String,
    email:String,
    type:String
    
});

module.exports =  mongoose.model('user', UserSchema)