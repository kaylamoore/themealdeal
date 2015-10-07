var express 			= require( 'express' ),
	vendorsController 	= require( '../controllers/vendorsController' ),
	jwt 				= require( 'jsonwebtoken' ),
	Vendor 				= require( '../models/vendor' ),
	User 				= require( '../models/user'),
	mySpecialSecret 	= "secret",
	bodyParser 			= require( 'body-parser' );
	vendorRouter 		= express.Router(); // get an instance of express router

vendorRouter.route( '/' )
	.get( vendorsController.index )
	.post( vendorsController.create )


vendorRouter.route( '/:vendor_id' )
	.get( vendorsController.show )
	.put( vendorsController.update )
	.delete( vendorsController.destroy )


module.exports = vendorRouter



