var express = require('express');
var router = express.Router();
var ctrlProperties = require('../controllers/properties');
var ctrlIndex = require('../controllers/index');
var ctrlAccounts = require('../controllers/accounts');
var roles = require(__dirname + '/../config/roles');

/* Properties pages */
router.get('/', ctrlProperties.homelist);
router.get('/property', ctrlProperties.propertyInfo);
router.get('/property/new', ctrlProperties.addProperty);

/* Accounts pages */
router.get('/account', ctrlAccounts.overview);
router.get('/account/mylisting', ctrlAccounts.mylisting);
router.get('/account/profile', ctrlAccounts.myprofile);
router.get('/account/messages', ctrlAccounts.messages);
router.get('/account/settings', ctrlAccounts.settings);
router.get('/account/favourites', ctrlAccounts.favourites);
router.get('/login', ctrlAccounts.login);
router.get('/register', ctrlAccounts.register);
router.post('/register', ctrlAccounts.registerPost);

/* Dashboard */
router.get('/dashboard', roles.auth ,ctrlIndex.dashboard);

/* Other pages */
router.get('/about', ctrlIndex.about);
router.get('/blog', ctrlIndex.blog);

module.exports = router;
