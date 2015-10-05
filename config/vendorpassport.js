// var VendorStrategy		= require('passport-local').Strategy,
// 	FacebookStrategy	= require('passport-facebook').Strategy,

// 	//loads the Vendor model
// 	Vendor 				= require('../app/models/vendor'),

// 	configAuth			= require('./auth');
	
// module.exports = function(passport) {		

// 		//VENDOR SIGNUP

// 		passport.use('local-signup', new VendorStrategy({
// 			usernameField: 'email',
// 			passwordField: 'password',
// 			passReqToCallback: true // passes through the request back to the callback


// 		},
// 		function(req, email, password, done) {

// 			//this is asynchronous so User.findOne won't fire unless data sent back
// 			process.nextTick(function(){

// 			Vendor.findOne({ 'local.email' : email }, function(err, vendor){
// 				if (err)
// 					return done (err);

// 				//check to see if there is a vendor
// 				if (vendor) {
// 					return done(null, false, ( {message: 'That email is alraedy taken'} ))
// 				} else {
				
// 					var newVendor				= new Vendor();

// 					newVendor.local.email 		= email;
// 					newVendor.local.password 	= newVendor.generateHash(password);
					
// 					newVendor.save(function(err) {
// 						if (err)
// 							throw err;
// 						return done(null, newVendor);
// 					});
// 				}
// 			});


// 			});
// 		}));

// 		//	VENDOR LOGIN

// 		passport.use('local-login', new VendorStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField: 'email',
// 		passwordField: 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     	},

// 	    function(req, email, password, location, done) { // callback with email and password from our form

//         // find a user whose email is the same as the forms email
//         // we are checking to see if the user trying to login already exists
//         Vendor.findOne({ 'local.email' :  email }, function(err, vendor) {
//             // if there are any errors, return the error before anything else
//             if (err)
//                 return done(err);

//             // if no user is found, return the message
//             if (!vendor)
//                 return done
//             // if the user is found but the password is wrong
//             if (!vendor.validPassword(password))
//                 return done
//             // all is well, return successful user
//             return done(null, vendor);
//         });

//     	}));
// };