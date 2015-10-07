// server.js set up which incldues the required files

var express 		= require( "express" ),
	app				= express(),
	http			= require( 'http' ).Server( app ),
	io				= require( 'socket.io' )( http ),
	expressLayouts  = require( 'express-ejs-layouts' ),
	port 			= process.env.PORT || 8080,
	mongoose		= require( 'mongoose' ),
	passport		= require( 'passport' ),
	morgan			= require( 'morgan' ),
	cookieParser	= require( 'cookie-parser' ),
	session			= require( 'express-session' ),
	configDB 		= require( './config/database.js' ),
	bodyParser 		= require( 'body-parser' ),
	flash			= require( 'connect-flash' ),
	dealRouter 		= require( './app/routes/dealRoutes' ),
	vendorRouter	= require( './app/routes/vendorRoutes' ),
	userRouter		= require( './app/routes/userRoutes' ),
	apiRouter		= require( './app/routes/apiRoutes'),
	helpers			= require( 'express-helpers' ),
	path 			= require( 'path' ),
	Twit			= require( 'twit' );




//	CONFIG
//	======

mongoose.connect( configDB.url ) // connects to the database

require( "./config/passport" )( passport ) //passes in passport for configuration

require( 'express-helpers' )( app );
// set up express application
//app.use( morgan( "dev" ) )
app.use( cookieParser() ) //reads cookies which are needed for authentication
app.use( bodyParser.urlencoded( { extended: true}) ) // gets info from the html form
app.use( bodyParser.json() )
app.use( flash() )
helpers( app )


app.set( "view engine", "ejs" ) //sets up ejs for templating
app.use( expressLayouts )
app.use( express.static( path.join( __dirname, 'public' ) ) )
app.engine( "ejs", require( "ejs" ).renderFile )
app.set('views', path.join( __dirname, 'views'));


// passport requirements
app.use( session( {
	secret: "supersupersecret",
	resave: true,
	saveUninitialized: true
}) )

app.use( passport.initialize() );
app.use( passport.session() ); //persistent login session
app.use( function ( req, res, next ){
	console.log( "User: ", req.user )
	global.user = req.user;
	next()
});

// 	ROUTES
//	======



userRouter( app, passport ); //loads the routes and passes  in passport
// app.use( '/users', userRouter ) when you get a request starting with users use the userRouter
app.use( '/deals', dealRouter ); //when you get a request starting with deal use dealRouter
app.use( '/vendors', vendorRouter );
app.use( '/api', apiRouter )



// TWITTER FEED

var twitter = new Twit( {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream;
var searchTerm;

io.on( 'connection', function( socket ) {
	console.log( "Connection Made" );
  socket.on( 'updateTerm', function ( searchTerm ) {
    socket.emit( 'updatedTerm', searchTerm );

    // Start stream
    if ( stream ) {
      stream.stop();
    }



    stream = twitter.stream( 'statuses/filter', { track: searchTerm, language: 'en' });

    stream.on( 'tweet', function ( tweet ) {
      var data = {};
      data.name = tweet.user.name;
      data.screen_name = tweet.user.screen_name;
      data.text = tweet.text;
      data.user_profile_image = tweet.user.profile_image_url;
      socket.emit( 'tweets', data );
    });
  });
});







//	LAUNCH
//	======
//app.listen( port )
http.listen( port )
console.log( "The magic is happening on port " + port )
