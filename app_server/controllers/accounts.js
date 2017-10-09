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

/* GET 'Inbox' page */
module.exports.login = function(req, res){
res.render('index', { title: 'Sign In' });
};

/* GET 'Inbox' page */
module.exports.register = function(req, res){
res.render('index', { title: 'Create an Account' });
};
