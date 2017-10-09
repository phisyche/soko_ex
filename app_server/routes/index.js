var express = require('express');
var router = express.Router();
var ctrlProperties = require('../controllers/properties');
var ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlProperties.homelist);
router.get('/property', ctrlProperties.propertyInfo);
router.get('/property/new', ctrlProperties.addProperty);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
