module.exports = function(app, passport) {

		//	SIGN UP
		//	=======

	app.get('/vendors/signup', function(req, res) {
		res.render('vendor_signup.ejs');
	});

		// process the signup form
	app.post('/vendors/signup', passport.authenticate('vendor-signup', {
		successRedirect : '/',
		failureRedirect : '/vendors/signup'
		}));
};




