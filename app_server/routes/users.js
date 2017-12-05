var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user/:id/edit', function(req, res){
	res.render('layout/profile', {User: req.userId});
});

router.post('/user/:id', function(req, res){
	User.update({_id: req.params.id},
	      function(err, docs){
			 	if(err) res.json(err);
				else    res.redirect('/user/'+req.params.id);
			 });
});

router.param('id', function(req, res, next, id){
  User.findByIdAndUpdate({_id: req.params.user_id}, {$set:req.body}, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(User);
});
});

module.exports = router;
