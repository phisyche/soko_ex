const mongoose = require('mongoose');
var uri = 'mongodb://kev:1234@ds123725.mlab.com:23725/soko_ex';
//var uri = 'mongodb://127.0.0.1/property';
var db = mongoose.connect(uri, {useMongoClient: true });
mongoose.Promise =require('bluebird');

const Schema = mongoose.Schema;

const userSchema = new Schema({
		username: { type: String,required: true, index: { unique: true, sparse: true }},
		email: String,
		names: String,
		phone: String,
		password: String,
		role: String
});

module.exports = mongoose.model('User', userSchema);
