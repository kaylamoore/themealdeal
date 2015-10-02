module.exports = function(app, passport) {

	// 	HOME PAGE log in
	//	================
	app.get('/', function(req, res){
		res.render('index.ejs'); //loads the index.ejs file
	});

	//	LOGIN
	//	=====
	app.get('login', function(req, res){
		res.render('login.ejs', { message: ('loginMessage')};
	});

	//app.post('/login' +++++ all the passport stuff goes here)

	//	SIGN UP
	//	=======

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: (signupMessage)};
	});

	//	process the signup form
	//	app.post('./signup', +++++ all the passport stuff here)

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