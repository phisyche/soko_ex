var express = require('express');
var router = express.Router();
var ctrlProperties = require('../controllers/properties');
var ctrlOthers = require('../controllers/others');
var ctrlAccounts = require('../controllers/accounts');

/* Properties pages */
router.get('/', ctrlProperties.homelist);
router.get('/property', ctrlProperties.propertyInfo);
router.get('/property/new', ctrlProperties.addProperty);

/* Accounts pages */
router.get('/account', ctrlAccounts.overview);
router.get('/account/mylisting', ctrlAccounts.mylisting);
router.get('/account/profile', ctrlAccounts.myprofile);
router.get('/account/inbox', ctrlAccounts.messages);
router.get('/account/login', ctrlAccounts.login);
router.get('/account/create', ctrlAccounts.register);

/* Other pages */
router.get('/about', ctrlOthers.about);
router.get('/blog', ctrlOthers.blog);

module.exports = router;
