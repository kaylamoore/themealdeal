var Deal 	= require( '../models/deal.js' )
var User 	= require( '../models/user.js' )


function deals ( req, res ) {
//gets all deals
	Deal.find( function( err, deals ) {
	if( err ) res.send ( err )
		// res.json( deals )
		res.json ( deals );

	})
}


function users ( req, res ) {
//gets all users
	User.find( function( err, users ) {
	if( err ) res.send ( err )
		// res.json( users )
		res.json ( users );

	})
}

function vendors ( req, res ) {
//gets all vendors
	User.find({ "local.isvendor": true }, ( function ( err, vendors ) {
		if( err ) res.send ( err )
		res.json ( vendors )
		}))		
}



module.exports = {
	deals	: deals,
	users	: users,
	vendors	: vendors
}
