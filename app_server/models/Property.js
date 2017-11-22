const mongoose = require('mongoose');
var uri = 'mongodb://kev:1234@ds123725.mlab.com:23725/soko_ex';
//var uri = 'mongodb://127.0.0.1/property';
var superPagination = require('super-pagination').mongoose;

//var uri = 'mongodb://kev:1234@ds123725.mlab.com:23725/soko_ex';
var uri = 'mongodb://127.0.0.1/property';
var db = mongoose.connect(uri, {useMongoClient: true });
mongoose.Promise =require('bluebird');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
		name: { type: String,required: true, index: { unique: true, sparse: true }},
		description: String,
		city: String,
		map: String,
		slug: {
			type: String,
			unique: true
		},
		price: String,
		photo: String,
		listType: String,
		category: String,
		features: Array,
		gallery: Array,
		user_id: String
});

propertySchema.plugin(superPagination, {
    theme : 'bootstrap'
});

module.exports = mongoose.model('Property', propertySchema);
