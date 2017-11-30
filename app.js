var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
//mongoose.Promise = global.Promise;

var index = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var property = require('./app_server/routes/property');
var admin = require('./app_server/routes/admin');
var User = require('./app_server/models/userModel');

const mongoose = require('mongoose');

var app = express();
var RedisStore       = require( 'connect-redis' )( session )
var GoogleStrategy   = require( 'passport-google-oauth2' ).Strategy;
var server           = require( 'http' ).createServer( app )


var GOOGLE_CLIENT_ID      = "335068842746-vt75khn9ducmclmp3667cf70clre8ue1.apps.googleusercontent.com"
var GOOGLE_CLIENT_SECRET  = "MJp5Y4WGlkXs3GdxM0ZL6y9Z";


passport.use(new GoogleStrategy({
    clientID: "335068842746-vt75khn9ducmclmp3667cf70clre8ue1.apps.googleusercontent.com",
    clientSecret: "MJp5Y4WGlkXs3GdxM0ZL6y9Z",
    //NOTE :
    //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
    //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/
    //then edit your /etc/hosts local file to point on your private IP.
    //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
    //if you use it.
    callbackURL: "https://pure-tundra-87237.herokuapp.com/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get( '/auth/google/callback',
    	passport.authenticate( 'google', {
    		successRedirect: '/',
    		failureRedirect: '/login'
}));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session({
  secret: 'keyboardcat',
  resave: true,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user){
    done(null, user);
  });
});


passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ 'username': username }).then(function(user){
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }).catch(function(err){
      console.log(err);
    });
  }
));


app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  if(req.body.candidates != null){
    res.locals.cid = req.body.candidates;
  }
  if(req.user != null){
    next();
  }else{
     next();
  }
});


app.use('/', index);
app.use('/users', users);
app.use('/property', property);
app.use('/admin', admin);


app.get('/logout', function(req, res){
  req.logout();
  req.flash("success_msg","now logged out");
  res.redirect('/');
});

app.get('/test',function(req, res){
	User.find({ 'username': '0710345130' }).then(function(user){
      if (!user) {
      	console.log("Incorrect username");
      }else{
      	console.log(user);
      }
  }).catch(function(err){
  		console.log(err);
  });
});


app.post('/login', passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
  , function(req, res){
    res.locals.msg = "this is awesome";
    app.locals.user = req.user || null;
    res.redirect("candidate");

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
