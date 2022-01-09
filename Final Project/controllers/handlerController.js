const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Answer = require('../models/aswerModel')
const Question = require('../models/questionModel')
const User = require('../models/userModel')


// These are some helper functions
const updateUserVotes=catchAsync(async (model,filteredBody,owner)=>{
  // Update user votes
 const user = await User.findByIdAndUpdate(owner.id,filteredBody,{
  new: true,
  runValidators: true
});
 if(!user){
   return new AppError('Issue in updating owner points',501)
 }
 // Based on votes update role
 let votes=user.upVote-user.downVote
 let role
 if(votes>=5){
   // enum: ['user', 'bronze', 'silver', 'gold'],
  role={
    role:'bronze'
  }
 }else if(votes>=10){
  role={
    role:'silver'
  }
 }else{
  role={
    role:'gold'
  }
 }
 
 const newUser = await User.findByIdAndUpdate(owner.id,role,{
  new: true,
  runValidators: true
});
 if(!newUser){
   return new AppError('Issue in updating owner role',501)
 }

});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Router functions
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
    //Check if logged in user is the ower or not
    const verify = await Model.findById(req.params.id);
    if(verify.owner.id!=req.body.owner){
      return next(new AppError('No Access to this document', 404));
    }
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


  exports.getAll=(Model, popOptions)=>catchAsync(async (req, res, next) => {
    let query = Model.find();
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      doc
    });
  });

  exports.vote=catchAsync(async(req,res,next)=>{
    let model=req.body.model
    let type=req.body.type
    let filteredBody
    let doc
    if(type==='upVote'){
      filteredBody = {
        $inc:{'upVote':1}
      }
    }else if(type==='downVote'){
      filteredBody = {
        $inc:{'downVote':1}
      }
    }else{
      return next(new AppError('Invalid Vote', 404));
    }
    if(model==='question'){
       doc = await Question.findByIdAndUpdate(req.body.id,filteredBody,{
        new: true,
        runValidators: true
      })
     
    }else if(model==='answer'){
      doc = await Answer.findByIdAndUpdate(req.body.id,filteredBody,{
        new: true,
        runValidators: true
      })
    }else{
      return next(new AppError('Invalid Vote', 404));
    }
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    // Update role of user based on votes
    updateUserVotes(model,filteredBody,doc.owner);
    // Return result
    res.status(200).json({
      status: 'success',
      doc
    });
  })