const catchAsync = require('../utils/catchAsync');
const Form = require('../models/formModel');
const factory = require('./factoryController');
const AppError = require('../utils/appError');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.incrementCount = catchAsync(async (req, res, next) => {
  const form = await Form.findById(req.params.id);
  // console.log('form');
  if (!form) {
    // console.error('User not found');
    res.status(404).json({
      status: 'success',
    });
  }
  const updateIncrement = await Form.findByIdAndUpdate(
    req.params.id, 
    { $inc: { responseCount: 1 } }, // The update operation
    { new: true } // Options: return the updated document
  ).select('content theme');;
  if (!updateIncrement)
    return next(
      new AppError('Form does not exists', 404)
    );
    res.status(200).json({
      status: 'success',
      // results: docs.length,
      data: {
        doc: updateIncrement,
      },
    });
});

exports.getAllForm = factory.getAll(Form);
exports.createForm = factory.createOne(Form);
exports.updateForm = factory.updateOne(Form);
exports.deleteForm = factory.deleteOne(Form);
exports.getForm = factory.getOne(Form,'responses');
