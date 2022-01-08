const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.createOne = (Model,...filteroptions) =>
  catchAsync(async (req, res, next) => {
    const filteredBody = filterObj(req.body, ...filteroptions)
    const doc = await Model.create(filteredBody);
    res.status(201).json({
      status: 'success',
      doc
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });


exports.updateOne = (Model,...filteroptions)=>
  catchAsync(async (req, res, next) => {
    // Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, ...filteroptions)
    const doc = await Model.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });