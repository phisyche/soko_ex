/* GET 'home' page */
var slug = require('slug');

var propertyModel = require(__dirname + '/../models/Property');

module.exports.homelist = function(req, res){
	propertyModel.find({}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'Home', propertys: data, });
    });
	
};

/* GET 'Property info' page */
module.exports.propertyInfo = function(req, res){
res.render('property_info', { title: 'Properties in Kenya' });
};

/* GET 'Add review' page */
module.exports.addProperty = function(req, res){
res.render('property/new', { title: 'Add Property' });
};

module.exports.fetchProperty = function(req,res, next){
	propertyModel.findOne({slug: req.params.name}, function(err, data){
		if(err) throw err;
		res.render("property/show",{ property: data, title: data.name});
	})
};

module.exports.postProperty = function(req, res){
	var instance = new propertyModel();
	instance.name = req.body.name
	instance.slug = slug(req.body.name);
	instance.photo = req.files['photo'][0].filename;
	instance.map = req.body.map;
	instance.city = req.body.city;
	instance.price = req.body.price;
	instance.description = req.body.description;
	instance.listType = req.body.listtype;
	instance.category = req.body.category;
	instance.gallery = req.files['gallery'];
	instance.user_id = res.locals.user.username;
	instance.save(function(err){
		if(err)
			res.render('property/new');
		res.redirect('/property/new');
	});
}

module.exports.forsale = function(req, res){
	propertyModel.find({listType: 'sale'}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'For Sale', propertys: data, });
    });
	
};

module.exports.forrent = function(req, res){
	propertyModel.find({listType: 'rent'}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'For Rent', propertys: data, });
    });
	
};
