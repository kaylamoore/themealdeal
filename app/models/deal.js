var mongoose 	= require('mongoose'),
	Schema		= mongoose.Schema,

// makes the deal schema

	DealSchema = new Schema({
		title:  {type: String, required: true}, 
		price:  {type: Number, required: true, Number},
		date:  type: Date, required: true},
		vendor: [vendorSchema],
		createdAt: Date
		});
	})


// saves the created at date before creation 
Schema.pre('save', function (next) {
	this.created_at = new Date();
	next();
});

module.exports = mongoose.model('Deal', DealSchema);