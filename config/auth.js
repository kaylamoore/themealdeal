module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'process.env.FACEBOOK_API_KEY',
		'clientSecret'	: 'process.env.FACEBOOK_API_SECRET',
		'callbackURL'	: 'http://localhost:8080/auth/facebook/callback'
	

	}
};