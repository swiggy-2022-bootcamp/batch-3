const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.create=catchAsync(async(req,res,next)=>{
    res.status(201).json({
        data:"done"
    })
})