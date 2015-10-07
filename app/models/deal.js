var mongoose 	= require( 'mongoose' ),
	userSchema	= require ( './user.js' )
	Schema		= mongoose.Schema,

// makes the deal schema

	DealSchema = new Schema( {
		title:  {type: String, required: true},
		price:  {type: Number, required: true},
		// date:  	{type: Date, required: true},
		vendor: String,
		longitude: Number,
		latitude: Number,
		created_at: Date
	})


// saves the created at date before creation
DealSchema.pre( 'save', function ( next ) {
	this.created_at = new Date();
	next();
});

module.exports = mongoose.model( 'Deal', DealSchema )
