module.exports = function( app, passport ) {

	// LAYOUT PAGE
	// =================
	app.get( '/', function( req, res ) {
		res.render( "index" ); //loads the index.ejs file
	});

	//	PROFILE
	//	=======
	app.get( '/profile', isLoggedIn, function( req, res ) {
		res.render( 'profile', {
			user : req.user // will get the user out of the session
		})
	})

	//	TWEETS
	//	=======
	app.get( '/tweets', function( req, res ) {
		res.render( 'tweets', {
		})
	})


	//	LOGOUT
	//	======
	app.get( '/logout', function( req, res ) {
		req.logout();
		res.redirect( '/' );
	})

	// 	AUTHENTICATE FIRST LOGIN
	//	========================

	// 	local --------

	//	LOGIN
	//	=====
	app.get( '/login', function( req, res ) {
		res.render( 'login' );
	});

	app.post( '/login', passport.authenticate( 'local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login'
	}) );

	//	SIGN UP
	//	=======
	app.get( '/signup', function( req, res ) {
		res.render( 'signup' );
	});

	//	process the signup form
	app.post( '/signup', passport.authenticate( 'local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup'
		}) );


	//	facebook -------
	//	route for authetication and login
	app.get( '/auth/facebook', passport.authenticate( 'facebook', {scope : 'email' }) );

	// call back after FB has authenticated
	app.get( '/auth/facebook/callback',
		passport.authenticate( 'facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}) );

	//	AUTHORIZE SOMEONE WHO IS ALREADY LOGGED IN AND CONNECT ACCOUNTS
	//	========================

		//	locally -----
		app.get( '/connect/local', function( req, res ) {
			res.render( 'connect-local.ejs', {message: req.flash( 'loginMessage' )}) ;
		});
		app.post( '/connect/local', passport.authenticate( 'local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}) );

		// facebook -----

		//sends to facebook for auth
		app.get( '/connect/facebook', passport.authorize( 'facebook', { scope : 'email'}) );

		//handle the call back after fb has authorized
		app.get( 'connect/facebook/callback',
			passport.authorize( 'facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}) );


	// 	UNLINKING ACCOUNTS
	//	==================

	//	local -----
	app.get( '/unlink/local', function( req, res ) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save( function( err ) {
            res.redirect( '/profile' );
        });
    });

    //facebook
    app.get( '/unlink/facebook', function( req, res ) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save( function( err ) {
            res.redirect( '/profile' );
        });
    });

};

//route middleware to make sure a user is logged in
function isLoggedIn( req, res, next ) {
	//if authenticated move on
	if ( req.isAuthenticated() )
		return next();

	res.redirect( '/' );
}
