function index ( req, res ) {
	//gets a single deal
	Deal.find( {} ), function( err, deal ) {
		if( err ) res.send( err )
		res.json( deal )
	}
}