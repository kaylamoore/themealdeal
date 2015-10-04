var User = require('../models/user.js')

function index(req, res){
	User.find(function(err, users){
		if(err) res.send (err)
			res.json(users)
	})
}
