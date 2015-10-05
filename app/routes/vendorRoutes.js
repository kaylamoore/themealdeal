module.exports = function(app, passport) {

	//	VENDOR SIGN UP
	//	=======

	app.get('/vendors/signup', function(req, res) {
		res.render('vendor_signup.ejs');
	});

	//	process the signup form
	app.post('/vendors/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/'
		}));

	app.get('/vendors', function(req, res){
		res.render('index.ejs'); //loads the index.ejs file
	});
};
