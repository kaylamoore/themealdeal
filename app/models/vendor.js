var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema,
	bcrypt = require( 'bcrypt-nodejs' )
	//defines the schems
var vendorSchema = new Schema( {

	email: String,
	password: String

})


//hash the pword of a vendor before save
vendorSchema.pre( 'save', function( next ){
	var vendor = this;

	if( !vendor.isModified( 'password' ) ) return next()

	bcrypt.hash( vendor.password, null, null, function( err, hash ){
		if( err ) return next( err )
		//if no error set the vendor.password to the hash and save
		vendor.password = hash
		next()
	} )
} )

//give the vendor shema a method to compare incoming with stored hash version
vendorSchema.methods.comparePassword = function( password ){
	var vendor = this;
	return bcrypt.compareSync( password, vendor.password )
}

module.exports = mongoose.model( 'Vendor', vendorSchema )
