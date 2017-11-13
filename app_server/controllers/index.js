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

/* GET home page */
module.exports.dashboard = function(req, res){
	if(res.locals.user.role == '1')
		res.render('admin/index', { title: 'Admin Dashboard' });
	res.render('admin/index', { title: 'User Dashboard' });
};

module.exports.mylisting = function(req, res){
res.render('layouts/dashboard_layout', { title: 'My Listings' });
};

module.exports.profile = function(req, res){
res.render('layouts/dashboard_layout', { title: 'My Profile' });
};

module.exports.favourites = function(req, res){
res.render('layouts/dashboard_layout', { title: 'My Favourites' });
};
