var mongoose	= require('mongoose'),
	bcrypt		= require('bcrypt-nodejs');

	//defines the schems
	var vendorSchema = mongoose.Schema({

		local		: {
			email	: String,
			password: String,
		},
		
	});

	//METHODS
	//=======
	//generates a hash
	vendorSchema.methods.generateHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	//checks if the password is valid
	vendorSchema.methods.validPassword = function(password){
		return bcrypt.compareSync(password, this.local.password);

	};

	//creates the model for users and exposes it to the app

	module.exports = mongoose.model('Vendor', vendorSchema);