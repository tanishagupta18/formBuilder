const catchAsync = require('../utils/catchAsync');
const Responses = require('../models/responsesModel');
const factory = require('./factoryController');


exports.createResponse = factory.createOne(Responses);
exports.deleteResponse = factory.updateOne(Responses);
exports.updateResponse = factory.updateOne(Responses);
exports.getResponse= factory.getOne(Responses);
