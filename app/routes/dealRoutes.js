var express = require('express'),
	dealsController = require('../controllers/dealsController'),
	User = require('../models/user'),
	dealRouter = express.Router();

dealRouter.route('/') // displays and adds to all deals
	.get(dealsController.index)
	.post(dealsController.create)

dealRouter.route('/:deal_id')
	.get(dealsController.show) //gets individual deal
	.put(dealsController.update) //updates individual deal
	.delete(dealsController.destroy) //deletes an individual deal


	module.exports = dealRouter