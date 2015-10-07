var Deal 	= require( '../models/deal.js' )
var User 	= require( '../models/user.js' )


function deals ( req, res ) {
//gets all deals
	Deal.find( function( err, deals ) {
	if( err ) res.send ( err )
		// res.json( deals )
		res.json (deals);

	})
}


function users ( req, res ) {
//gets all deals
	User.find( function( err, deals ) {
	if( err ) res.send ( err )
		// res.json( deals )
		res.json (deals);

	})
}

// function vendors ( req, res ) {
// //gets all deals
// 	User.find( function( err, deals ) {
// 	if( err ) res.send ( err )
// 		// res.json( deals )
// 		res.json (user.isvendor);

// 	})
// }

module.exports = {
	deals	: deals,
	users	: users,
	// vendors	: vendors 
}