var express = require('express');
var router = express.Router();
var ctrlProperties = require('../controllers/properties');
var ctrlOthers = require('../controllers/others');
var ctrlAccounts = require('../controllers/accounts');



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

/* Other pages */
router.get('/about', ctrlOthers.about);
router.get('/blog', ctrlOthers.blog);

module.exports = router;
