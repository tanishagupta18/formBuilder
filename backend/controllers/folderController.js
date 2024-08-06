const catchAsync = require('../utils/catchAsync');
const Folder = require('./../models/folderModel');
const factory = require('./factoryController');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.getAllFolder = factory.getAll(Folder);
exports.createFolder = factory.createOne(Folder);
exports.deleteFolder = factory.deleteOne(Folder);
