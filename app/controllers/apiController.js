var Deal 	= require( '../models/deal.js' )


function index ( req, res ) {
//gets all deals
	Deal.find( function( err, deals ) {
	if( err ) res.send ( err )
		// res.json( deals )
		res.json (deals);

	})
}

module.exports = {
	index	: index,
}