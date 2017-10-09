/* GET home page */
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
