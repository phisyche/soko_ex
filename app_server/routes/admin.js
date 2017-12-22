var express = require('express');
var router = express.Router();
var roles = require(__dirname + '/../config/roles');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    var fileName = file.originalname + '-' + Date.now() + '.' + mime.extension(file.mimetype);
    var menuName = file.originalname + '-' + Date.now() + '.' + mime.extension(file.mimetype);
    cb(null, fileName);
  }
});

var ctrlProperties = require('../controllers/properties');
var Property = require(__dirname + '/../models/Property');
var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'menu', maxCount: 1 }, { name: 'gallery', maxCount: 10 }])

router.get('/index', roles.admin, ctrlProperties.allProperty);

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

router.post('/edit/:id', roles.auth, cpUpload, ctrlProperties.editProperty, function(req, res, next) {
	Property.findById(req.params.id)
	.then(function(property){
		console.log(property);
	    property.name = req.body.name
		property.slug = slug(req.body.name);
		property.description = req.body.description;
		property.city = req.body.city;
		property.map = {lat: req.body.lat, long: req.body.long, zoom: req.body.zoom };
		property.phone = req.body.phone;
		property.email = req.body.email;
		if (req.files['photo'] != null){
		  property.photo = req.files['photo'][0].filename;
		}
		property.category = req.body.category;
		property.gallery = req.files['gallery'];
		property.user_id = res.locals.user.username;
		property.save(function(err){
			if(err)
				res.render('property/product_edit',{title: "Edit "+property.name});
			res.render('property/product_edit',{title: "Edit "+property.name});
		});
	})
	.catch(function(err){
	     console.log(err);
	});
	//res.send("post data");
});


router.get('/delete/:id',roles.auth, function(req, res, next){
	Property.findOneAndRemove({
	  _id: req.params.id,
	  user_id : res.locals.user.username
	})
	.then(function(data){
	    res.redirect('/dashboard');
	})
	.catch(function(err){
	     console.log(err);
	});
});


module.exports = router;
