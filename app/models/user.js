var mongoose	= require( 'mongoose' ),
	bcrypt		= require( 'bcrypt-nodejs' );

	//defines the schems
	var userSchema = mongoose.Schema( {

		local		: {
			email	: String,
			password: String,
		},
		facebook	: {
			id		: String,
			token	: String,
			email	: String,
			name	: String
		}
	});

	//METHODS
	//=======
	//generates a hash
	userSchema.methods.generateHash = function( password ){
		return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
	};

	//checks if the password is valid
	userSchema.methods.validPassword = function( password ){
		return bcrypt.compareSync( password, this.local.password );

	};

	//creates the model for users and exposes it to the app

	module.exports = mongoose.model( 'User', userSchema );
