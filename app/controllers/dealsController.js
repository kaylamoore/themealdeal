var Deal 	= require( '../models/deal.js' )

function index ( req, res ) {
//gets all deals
	Deal.find( function( err, deals ) {
	if( err ) res.send ( err )
		// res.json( deals )
		res.render( 'deals', {deals: deals});

	})
}

function create ( req, res ) {
	//makes a single deal

	console.log( global.user )
	var deal 	= new Deal()

	deal.title	= req.body.title
	deal.price	= req.body.price
	deal.vendor = global.user.local.businessname
	deal.longitude = global.user.local.longitude
	deal.latitude = global.user.local.latitude

	deal.save( function( err ) {
		if ( err ) res.send( err )
		//res.json( {success: true, message: "Deal created"})
		res.redirect( '/' );

	})
}

function show ( req, res ) {
	//gets a single deal
	Deal.findById( req.params.deal_id, function( err, deal ) {
		if( err ) res.send( err )
		res.json( deal )
	})
}

function update ( req, res ) {
	//update a deal
	Deal.findById( req.params.deal_id, function( err, user ) {
		if( err ) res.send

		if( req.body.title ) deal.title 	= req.body.title
		if( req.body.price ) deal.price 	= req.body.price
		if( req.body.date ) deal.date		= req.body.date

		deal.save( function( err ) {
			if( err ) res.send( err )
			res.json( {success: true, message: "Deal has been udpated"})
		})
	})
}

function destroy ( req, res ) {
	//deletes a deal
	Deal.remove( {
		_id: req.params.deal_id
	}, function( err, deal ) {
		if( err ) res.send( err )
		res.json( {success: true, message: "Your deal was gobbled up!"})
	})
}

module.exports = {
	index	: index,
	create 	: create,
	show	: show,
	update	: update,
	destroy : destroy
}
