var express = require('express');
var router = express.Router();
var roles = require(__dirname + '/../config/roles');

var ctrlProperties = require('../controllers/properties');

router.get('/index', roles.admin, ctrlProperties.allProperty);


module.exports = router;
