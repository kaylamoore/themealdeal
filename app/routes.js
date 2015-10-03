module.exports = function(app, passport) {

	// 	HOME PAGE log in
	//	================
	app.get('/', function(req, res){
		res.render('index.ejs'); //loads the index.ejs file
	});

	//	LOGIN
	//	=====
	app.get('/login', function(req, res){
		res.render('login.ejs');
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login'
	}));

	//	SIGN UP
	//	=======

	app.get('/signup', function(req, res) {
		res.render('signup.ejs');
	});

	//	process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', 
		failureRedirect: '/signup'
		}));

	//	FACEBOOK ROUTES
	//	===============
	//	route for authetication and login
	app.get('auth/facebook', passport.authenticate('facebook', {scope : 'email' }));

	// call back after FB has authenticated
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	//	PROFILE
	//	=======

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user : req.user // will get the user out of the session
		})
	})

	//	LOGOUT
	//	======
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	})

};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	//if authenticated move on
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}