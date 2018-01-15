const mongoose = require('mongoose');
//var uri = 'mongodb://kev:1234@ds123725.mlab.com:23725/soko_ex';
var uri = 'mongodb://ken:1234@ds137550.mlab.com:37550/to-do';

//var uri = 'mongodb://127.0.0.1/property';
var db = mongoose.connect(uri, {useMongoClient: true });
mongoose.Promise =require('bluebird');

const Schema = mongoose.Schema;

const userSchema = new Schema({
		username: { type: String,required: true, index: { unique: true, sparse: true }},
		email: String,
		googleId: String,
		names: String,
		phone: String,
		password: String,
		role: String,
});

module.exports = mongoose.model('User', userSchema);
