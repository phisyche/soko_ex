var slug = require('slug');
var propertyModel = require(__dirname + '/../models/Property');

module.exports.index = function(req, res){
res.render('index', { title: 'SokoEstate' });
};

/* GET 'about' page */
module.exports.about = function(req, res){
res.render('index', { title: 'About' });
};

/* GET home page */
module.exports.blog = function(req, res){
res.render('index', { title: 'Property Forum' });
};

module.exports.analytics = function(req, res){
res.render('layouts/analytics', { title: 'Analytics' });
};

/* GET home page */
module.exports.dashboard = function(req, res){
	if(res.locals.user.role == '1')
		res.render('dashboard/dashboard1', { title: 'Admin Dashboard' });
	res.render('dashboard/dashboard1', { title: 'User Dashboard' });
};

module.exports.listing = function(req, res){
	propertyModel.find({user_id: res.locals.user.username}, function(err, data){
		if(err) throw err;
			res.render('layouts/my_listing', {title: 'My Listings', propertys: data, });
	})
};

module.exports.profile = function(req, res){
res.render('layouts/profile', { title: 'My Profile' });
};

module.exports.favourites = function(req, res){
res.render('layouts/favourites', { title: 'My Favourites' });
};
