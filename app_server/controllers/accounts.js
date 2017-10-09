/* GET 'my account' page */
module.exports.overview = function(req, res){
res.render('index', { title: 'My Account' });
};

/* GET 'listings' page */
module.exports.mylisting = function(req, res){
res.render('index', { title: 'My Listings' });
};

/* GET 'profile' page */
module.exports.myprofile = function(req, res){
res.render('index', { title: 'My Profile' });
};

/* GET 'Inbox' page */
module.exports.messages = function(req, res){
res.render('index', { title: 'Messages' });
};
