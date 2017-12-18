/* GET 'home' page */
var slug = require('slug');

var propertyModel = require(__dirname + '/../models/Property');

module.exports.homelist = function(req, res){
	propertyModel.paginate({
	    query : {
	    },
	    page : req.query.page || 1,
	    populate : 'user',
	    per_page : 5,
	    url : '/'
	},  function(err, data, pagination){
		if(err) throw err;
		console.log(data);
        res.render('property/property_list', { title: 'Home', propertys: data, pagination : pagination.render() });
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
		console.log(data);
		res.render("property/product",{ property: data, title: data.name});
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
	instance.features = req.body.features;
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

module.exports.editProperty = function(req, res){
res.render('property/product_edit', { title: 'Edit Property' });
};

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

module.exports.land = function(req, res){
	propertyModel.find({listType: 'land'}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'Land', propertys: data, });
    });

};

module.exports.commercial = function(req, res){
	propertyModel.find({listType: 'commercial'}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'Commercial', propertys: data, });
    });

};

module.exports.projects = function(req, res){
	propertyModel.find({listType: 'projects'}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'Projects', propertys: data, });
    });

};

module.exports.dealers = function(req, res){
	propertyModel.find({listType: 'dealers'}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'Dealers', propertys: data, });
    });

};

module.exports.hostels = function(req, res){
	propertyModel.find({listType: 'hostels'}, function(err, data){
		if(err) throw err;
        res.render('property/property_list', { title: 'Hostels', propertys: data, });
    });

};

module.exports.allProperty = function(req, res){
	propertyModel.find({}, function(err, data){
		if(err) throw err;
        res.render('admin/property/property_list', { title: 'All Property', propertys: data, });
    });

};
