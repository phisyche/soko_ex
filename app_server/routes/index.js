var express = require('express');
var router = express.Router();
var ctrlProperties = require('../controllers/properties');
var ctrlIndex = require('../controllers/index');
var ctrlAccounts = require('../controllers/accounts');
var roles = require(__dirname + '/../config/roles');

/* Properties pages */
router.get('/', ctrlProperties.homelist);
router.get('/property', ctrlProperties.propertyInfo);
router.get('/property/new', roles.auth, ctrlProperties.addProperty);
router.get('/property/product_edit', ctrlProperties.editProperty);

/* Accounts pages */
router.get('/login', ctrlAccounts.login);
router.get('/register', ctrlAccounts.register);
router.post('/register', ctrlAccounts.registerPost);

/* Dashboard */
router.get('/dashboard', roles.auth, ctrlIndex.dashboard);
router.get('/dashboard/profile', roles.auth, ctrlIndex.profile);
router.get('/dashboard/mylistings', roles.auth, ctrlIndex.listing);
router.get('/dashboard/maps', roles.auth, ctrlIndex.favourites);
router.get('/dashboard/analytics', roles.auth, ctrlIndex.analytics);


/* Other pages */
router.get('/about', ctrlIndex.about);
router.get('/blog', ctrlIndex.blog);

module.exports = router;
