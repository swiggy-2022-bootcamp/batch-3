const Answer = require('../models/aswerModel')
const handler =require('./handlerController')
const catchAsync = require('./../utils/catchAsync');

exports.setUserId=(req,res,next)=>{
    if (!req.body.user) req.body.owner = req.user.id;
    if(!req.body.questionid) req.body.question=req.params.id
    req.body.createDate=new Date(Date.now())
  next();
}
exports.create=handler.createOne(Answer,'body','owner','question','createDate');
exports.update=catchAsync(async (req, res, next) => {
    filterBody={
        body:req.body.body
    }
    const doc = await Answer.findByIdAndUpdate(req.body.id, filterBody, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No Answer Found by this user', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
});