/* GET 'my account' page */
module.exports.overview = function(req, res){
res.render('account', { title: 'My Account' });
};

/* GET 'settings' page */
module.exports.settings = function(req, res){
res.render('account', { title: 'Settings' });
};

/* GET 'favourites' page */
module.exports.favourites = function(req, res){
res.render('account', { title: 'Favourites' });
};

/* GET 'listings' page */
module.exports.mylisting = function(req, res){
res.render('account', { title: 'My Listings' });
};

/* GET 'profile' page */
module.exports.myprofile = function(req, res){
res.render('account', { title: 'My Profile' });
};

/* GET 'Inbox' page */
module.exports.messages = function(req, res){
res.render('account', { title: 'Messages' });
};

/* GET 'Inbox' page */
module.exports.login = function(req, res){
res.render('index', { title: 'Sign In' });
};

/* GET 'Inbox' page */
module.exports.register = function(req, res){
res.render('index', { title: 'Create an Account' });
};
