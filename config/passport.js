//loads the packages
var LocalStrategy		= require( 'passport-local' ).Strategy,
	FacebookStrategy	= require( 'passport-facebook' ).Strategy,

	//loads the User model
	User				= require( '../app/models/user' ),
	Vendor 				= require( '../app/models/vendor' ),

	configAuth			= require( './auth' );

module.exports = function( passport ){

		//passport session sign in -- needed for persistent login

		passport.serializeUser( function( user, done ){
			done( null, user.id );
		} );

		// used to deserailize the user
		passport.deserializeUser( function( id, done ){
			User.findById( id, function( err, user ){
				done( err, user );
			} );
		} );

		//USER LOCAL SIGNUP

		passport.use( 'local-signup', new LocalStrategy( {
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // passes through the request back to the callback
		},
		function( req, email, password, done ) {

			//this is asynchronous so User.findOne won't fire unless data sent back
			process.nextTick( function(){

				User.findOne( { 'local.email' : email }, function( err, user ){
					if ( err )
						return done ( err );

					//check to see if there is a user
					if ( user ) {
						return done( null, false, ( {message: 'That email is alraedy taken'} ) )
					} else {

						var newUser				= new User();

						newUser.local.email 	= email;
						newUser.local.password 	= newUser.generateHash( password );

						newUser.save( function( err ) {
							if ( err )
								throw err;
							return done( null, newUser );
						} );
					}
				} );
			} );
		} ) );

		//	USER LOCAL LOGIN

		passport.use( 'local-login', new LocalStrategy( {
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    	},

	    function( req, email, password, done ) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
	        User.findOne( { 'local.email' :  email }, function( err, user ) {
	            // if there are any errors, return the error before anything else
	            if ( err )
	                return done( err );

	            // if no user is found, return the message
	            if ( !user )
	                return done( null, false, req.flash( 'loginMessage', 'No user found.' ) ); // req.flash is the way to set flashdata using connect-flash

	            // if the user is found but the password is wrong
	            if ( !user.validPassword( password ) )
	                return done( null, false, req.flash( 'loginMessage', 'Oops! Wrong password.' ) ); // create the loginMessage and save it to session as flashdata

	            // all is well, return successful user
	            return done( null, user );
	        } );

    	} ) );

	//	FACEBOOK
	//	========

	passport.use( new FacebookStrategy( {

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true, // allows us to pass in the req from our route ( lets us check if a user is logged in or not )
        enableProof     : true,
        profileFields   : ["name", "emails"]

    },
    function( req, token, refreshToken, profile, done ) {

        // asynchronous
        process.nextTick( function() {

            // check if the user is already logged in
            if ( !req.user ) {

                User.findOne( { 'facebook.id' : profile.id }, function( err, user ) {
                    if ( err )
                        return done( err );

                    if ( user ) {

                        // if there is a user id already but no token ( user was linked at one point and then removed )
                        if ( !user.facebook.token ) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;

                            user.save( function( err ) {
                                if ( err ) {
                                    throw err;
                                }
                                return done( null, user );
                            } );
                        }

                        return done( null, user ); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;

                        newUser.save( function( err ) {
                            if ( err ) {
                                throw err;
                            }
                            return done( null, newUser );
                        } );
                    }
                } );

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save( function( err ) {
                    if ( err ) {
                        throw err;
                    }
                    return done( null, user );
                } );

            }
        } );

    } ) );


//   var newUser	= new User();

// newUser.local.email 	= 'deals2@gmail.com';
// newUser.local.password 	= newUser.generateHash('password');
// newUser.local.isvendor = true; 
// newUser.local.businessname = 'adb';
// newUser.local.longitude = "34.0219";
// newUser.local.latitude = "-118.4814";
// newUser.save();

};
