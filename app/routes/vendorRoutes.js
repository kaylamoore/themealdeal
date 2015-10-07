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


// vendorRouter.post( '/login', function( req, res ) {
// 	//find the vendor in DB
// 	Vendor.findOne( {
// 		email: req.body.email
// 	}).select( 'name email password' ).exec( function( err, vendor ) {
// 		if( err ) throw err
// 		if( !vendor ) {
// 			res.json( {success: false, message: "auth failed, vendor not found"})
// 		} else if( vendor ) {
// 			//check pword
// 			var validPassword = vendor.comparePassword( req.body.password )
// 			if( !validPassword ) {
// 				res.json( {success: false, message: "auth failed, re-evaluate your life"})
// 			} else {
// 				//pword is good
// 				var token = jwt.sign( {
// 					name: vendor.name,
// 					email: vendor.email
// 				}, mySpecialSecret, {
// 					expiresInMinutes: 1440
// 				})
// 				//gives the JWT to authenticated used
// 				res.json( { success: true, message: "enjoy the token", token: token})
// 			}
// 		}
// 	})
// })

// vendorRouter.use( function( req, res, next ) {

// 	var token = req.body.token || req.param( 'token' ) || req.headers['x-access-token']

// 	//if we find the token we use special secret to decode

// 	if( token ) {
// 		jwt.verify( token, mySpecialSecret, function( err, decoded ) {
// 			if( err ) {
// 				return res.status( 403 ).send( {success: false, message: "forbidden, token can't be decoded"})
// 			} else {
// 				req.decoded = decoded
// 			}
// 		})

// 	} else {
// 		return res.status( 403 ).send( {success: false, message: "no token. You're not even trying"})
// 	}


// // runs evertime the API is hit
// // check if the user is logged in
// console.log( "checking if user is logged in" )
// next()

// })


