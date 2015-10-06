//loads the packages
var LocalStrategy		= require('passport-local').Strategy,
	FacebookStrategy	= require('passport-facebook').Strategy,

	//loads the User model
	User				= require('../app/models/user'),
	configAuth			= require('./auth');
	
module.exports = function(passport){

var newUser	= new User();

newUser.local.email 	= 'newpassport@gmail.com';
newUser.local.password 	= newUser.generateHash('password');
newUser.local.isvendor = true;
newUser.local.businessname = adb;
newUser.local.longditude = 1234;
newUser.local.latitude = 1234;
newUser.save();

};