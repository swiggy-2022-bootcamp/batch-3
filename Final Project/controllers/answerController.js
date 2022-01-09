const Answer = require('../models/aswerModel')
const Comment = require('../models/commentModel')
const handler =require('./handlerController')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Set user in request before going to Model
exports.setUserId=(req,res,next)=>{
    if (!req.body.user) req.body.owner = req.user.id;
    if(!req.body.questionid) req.body.question=req.params.id
    req.body.createDate=new Date(Date.now())
  next();
}
// Create new answer
exports.create=handler.createOne(Answer,'body','owner','question','createDate');
// Get Answer
exports.get=handler.getOne(Answer,'comments')
//Update answer
exports.update=catchAsync(async (req, res, next) => {
    filterBody={
        body:req.body.body
    }
    const verify = await Answer.findById(req.body.id);
    if(verify.owner!=req.user.id){
      return next(new AppError('No Access to this document', 404));
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

// Create comment on a answer
exports.comment=handler.createOne(Comment,'body','owner','answer','createDate')