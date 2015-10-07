var express 			= require( 'express' ),
	apiRouter 			= express.Router(),
	apiController		= require( '../controllers/apiController' );


apiRouter.route( '/deals' )
	.get(apiController.deals)

apiRouter.route( '/users' )
	.get(apiController.users)

apiRouter.route( '/vendors' )
	.get(apiController.vendors)

// apiRouter.route( '/vendors' )
// 	.get(apiController.vendors)

module.exports = apiRouter
