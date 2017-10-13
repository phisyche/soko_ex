/* GET 'home' page */
module.exports.homelist = function(req, res){
res.render('property_list', { title: 'Home' });
};

/* GET 'Property info' page */
module.exports.propertyInfo = function(req, res){
res.render('property_info', { title: 'Properties in Kenya' });
};

/* GET 'Add review' page */
module.exports.addProperty = function(req, res){
res.render('index', { title: 'Add Property' });
};
