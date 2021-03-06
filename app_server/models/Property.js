const mongoose = require('mongoose');
var superPagination = require('super-pagination').mongoose;

//var uri = 'mongodb://x_t:syche6847@ds239117.mlab.com:39117/soko_estate';
//var uri = 'mongodb://127.0.0.1/property';
var uri = 'mongodb://ken:1234@ds137550.mlab.com:37550/to-do';
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
		user_id: String,
		date: Date
});

propertySchema.plugin(superPagination, {
    theme : 'bootstrap'
});

module.exports = mongoose.model('Property', propertySchema);
