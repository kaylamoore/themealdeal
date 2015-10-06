var Vendor = require( '../models/vendor.js' )

function index ( req, res ) {
		//gets all the vendors
		Vendor.find( function( err, vendors ) {
			if( err ) res.send ( err )
			res.json (vendors)
			// res.render( 'vendor_signup', {vendors: vendors} );
		})
	}

function create ( req, res ) {
		//makes single vendor
		console.log(req.body)

		var vendor = new Vendor()
	
		vendor.email = req.body.email
		vendor.password = req.body.password

		console.log(vendor)


		vendor.save( function( err ) {
			if( err ) {
				
					res.send( err )
				}
			
			res.redirect('/deals')
		})

}

function show ( req, res ) {
		//gets a single vendor
		Vendor.findById( req.params.vendor_id, function( err, vendor ) {
			if( err ) res.send( err )
			res.json( vendor )
		})

	}

function update ( req, res ) {
		//update a vendor
	vendor.findById( req.params.vendor_id, function( err, vendor ) {
		if( err ) res.send

		if( req.body.name ) vendor.name = req.body.name
		if( req.body.email ) vendor.email = req.body.email
		if( req.body.password ) vendor.password = req.body.password

		vendor.save( function( err ) {
			if( err ) res.send( err )
			res.json( {success: true, message: "You have been updated!"})
		})

	})
}

function destroy ( req, res ) {
		//deletes a vendor
	Vendor.remove( {
		_id: req.params.vendor_id
	}, function( err, user ) {
		if( err ) res.send( err )
		res.json( {success: true, message: "You have been terminated!"})
	})
}

module.exports = {
	index: index,
	create: create,
	show: show,
	update: update,
	destroy: destroy
}
