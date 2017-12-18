var express = require('express');
var router = express.Router();
var roles = require(__dirname + '/../config/roles');

var ctrlProperties = require('../controllers/properties');
var Property = require(__dirname + '/../models/Property');

router.get('/index', roles.admin, ctrlProperties.allProperty);

router.post('/edit/:id', roles.auth, function(req, res, next) {
	Property.findById(req.params.id)
	.then(function(prop){
		console.log(b);
	    prop.name = req.body.name
		prop.slug = slug(req.body.name);
		prop.description = req.body.description;
		prop.city = req.body.city;
		prop.map = {lat: req.body.lat, long: req.body.long, zoom: req.body.zoom };
		prop.phone = req.body.phone;
		prop.email = req.body.email;
		if (req.files['photo'] != null){
		  prop.photo = req.files['photo'][0].filename;
		}
		prop.category = req.body.category;
		prop.gallery = req.files['gallery'];
		prop.user_id = res.locals.user.username;
		prop.save(function(err){
			if(err)
				res.render('admin/edit',{title: "Edit "+prop.name, property: prop});
			res.render('admin/edit',{title: "Edit "+prop.name, property: prop});
		});
	})
	.catch(function(err){
	     console.log(err);
	});
	//res.send("post data");
});


router.get('/edit/:id',roles.auth, function(req, res, next){
	Property.findOne({
	  _id: req.params.id
	})
	.then(function(data){
	    console.log(data);
	    res.render('admin/edit',{title: "Edit "+data.name, property: data});
	})
	.catch(function(err){
	     console.log(err);
	});
});



module.exports = router;
