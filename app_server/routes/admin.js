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



module.exports = router;
