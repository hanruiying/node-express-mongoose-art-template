var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    like: {
        type: String
    }
})
var User = mongoose.model('User', userSchema)
module.exports = User;