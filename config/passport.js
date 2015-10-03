//loads the packages
var LocalStrategy		= require('passport-local').Strategy,
	User				= require('..app/models/user');
	module.exports = function(passport) {

		//passport session sign in -- needed for persistent login

		passport.serializeUser(function(user, done){
			done(null, user.id);
		});

		// used to deserailize the user
		passport.deserializeUser(function(id, done){
			User.findById(id, function(err, user){
				done(err, user);
			});
		});

		//LOCAL SIGNUP

		passport.user('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // passes through the request back to the callback
		},
		function(req, email, password, done) {

			//this is asynchronous so User.findOne won't fire unless data sent back
			process.nextTick(function(){

			User.findOne({ 'local.email' : email }, function(err, user){
				if (err)
					return done (err);

				//check to see if there is a user
				if (user) {
					return done(null, false, ('signupMessage', 'That email is alraedy taken'))
				} else {
					var newUser

					newUser.local.email
					newUser.local.password

					newUser.save(function(err) {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});


			});
		})):
	};