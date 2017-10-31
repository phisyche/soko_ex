/* GET 'home' page */
var slug = require('slug');


var propertyModel = require(__dirname + '/../models/Property');

module.exports.homelist = function(req, res){
res.render('property_list', { title: 'Home' });
};

/* GET 'Property info' page */
module.exports.propertyInfo = function(req, res){
res.render('property_info', { title: 'Properties in Kenya' });
};

/* GET 'Add review' page */
module.exports.addProperty = function(req, res){
res.render('property/new', { title: 'Add Property' });
};

module.exports.postProperty = function(req, res){
	var instance = new propertyModel();
	instance.name = req.body.name
	instance.slug = slug(req.body.name);
	instance.photo = req.files['photo'][0].filename;
	instance.map = req.body.map;
	instance.city = req.body.city;
	instance.description = req.body.description;
	instance.listType = req.body.listtype;
	instance.category = req.body.category;
	instance.gallery = req.files['gallery'];
	instance.save(function(err){
		console.log(err)
	});
	res.redirect('/property/new');
}
