var Vendor = require( '../models/vendor.js' )

function index ( req, res ) {
		//gets all the users
		Vendor.find( function( err, users ) {
			if( err ) res.send ( err )
			res.json( users )
		})
	}

function create ( req, res ) {
		//makes single user
		var vendor = new Vendor()
		vendor.name = req.body.name
		vendor.email = req.body.email
		vendor.password = req.body.password

		vendor.save( function( err ) {
			if( err ) {
				if( err.code == 11000 ) {
					res.json( {success: false, message: "email already exists"})
				} else {
					res.send( err )
				}
			}
			res.json( {success: true, message: "vendor created!"})
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
