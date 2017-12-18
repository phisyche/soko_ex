var express = require('express');
var router = express.Router();
var multer  = require('multer');
var mime = require('mime');
var roles = require(__dirname + '/../config/roles');

var ctrlProperties = require('../controllers/properties');
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

var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'menu', maxCount: 1 }, { name: 'gallery', maxCount: 10 }])
/* Properties pages */
router.get('/property', ctrlProperties.propertyInfo);
router.post('/new',roles.auth , cpUpload, ctrlProperties.postProperty);

//CATEGORIES FOR DIFFERENT OPTIONS
router.get('/for_sale', ctrlProperties.forsale);
router.get('/for_rent', ctrlProperties.forrent);
router.get('/land', ctrlProperties.land);
router.get('/commercial', ctrlProperties.commercial);
router.get('/projects', ctrlProperties.projects);
router.get('/dealers', ctrlProperties.dealers);
router.get('/hostels', ctrlProperties.hostels);

router.get('/:name', ctrlProperties.fetchProperty);



module.exports = router;
