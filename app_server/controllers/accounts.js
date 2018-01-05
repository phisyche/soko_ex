/* GET 'my account' page */
var bcrypt = require('bcryptjs');
var slug = require('slug');
var User = require('../models/userModel');

/* GET 'Inbox' page */
module.exports.login = function(req, res){
	res.render('user/login', { title: 'Sign In' });
};

/* GET 'Inbox' page */
module.exports.register = function(req, res){
	res.render('user/register', { title: 'Create an Account' });
};

module.exports.registerPost = function(req, res){
  var names = req.body.names;
  var phone = req.body.phone;
	var email = req.body.email;
  var password = req.body.password;
  var role = 0;
  var credits =1000;

  //Validations
  req.checkBody('names','names can not be empty').notEmpty();
  req.checkBody('phone','phone can not be empty').notEmpty();
  req.checkBody('phone','phone should be a number').isInt();
  req.checkBody('password','password can not be empty').notEmpty();
  req.checkBody('cpassword','password did not match').equals(req.body.password);



  /*var errors = req.getValidationResult();
  if(errors){
  	console.log(errors);
    res.render('user/register',{errors: errors});
  }else{*/
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    console.log(req.body.password+' . '+ req.body.names+' . '+ hash);
    User.create({
        id: slug(names),
    	  username: phone,
				email: email,
    	  names: names,
        password: hash,
        phone: phone,
        role: role,
    	}, function (err, small) {
	  if (err) {
	  	res.json(err);
	  	return handleError(err);
	  }else{
	  	res.redirect('/login');
	  }
	  // saved!
	});
  //}
};

module.exports.updateUser = function (req, res) {
	console.log(req.body);

	User.findByIdAndUpdate({_id: req.params.user_id}, {$set:req.body}, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(user);
});

};
