var express = require('express'),
	dealsController = require('../controllers/dealsController'),
	User = require('../models/user');

dealRouter.get('/deals') // displays and adds to all deals
	.get(dealsController.index)
	.post(dealsController)