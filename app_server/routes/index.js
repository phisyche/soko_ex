var express = require('express');
var router = express.Router();
var ctrlProperties = require('../controllers/properties');
var ctrlIndex = require('../controllers/index');
var ctrlAccounts = require('../controllers/accounts');
var roles = require(__dirname + '/../config/roles');

/* Properties pages */
router.get('/', ctrlProperties.homelist);
router.get('/property', ctrlProperties.propertyInfo);
router.get('/property/new',   ctrlProperties.addProperty);

/* Accounts pages */
router.get('/login', ctrlAccounts.login);
router.get('/register', ctrlAccounts.register);
router.post('/register', ctrlAccounts.registerPost);

/* Dashboard */
router.get('/dashboard',   ctrlIndex.dashboard);
router.get('/dashboard/profile',   ctrlIndex.profile);
router.get('/dashboard/mylistings',   ctrlIndex.listing);
router.get('/dashboard/favourites',   ctrlIndex.favourites);

/* Other pages */
router.get('/about', ctrlIndex.about);
router.get('/blog', ctrlIndex.blog);

module.exports = router;
