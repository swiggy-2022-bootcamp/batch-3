const Question = require('../models/questionModel')
const handler =require('./handlerController')

exports.setUserId=(req,res,next)=>{
    if (!req.body.user) req.body.owner = req.user.id;
    req.body.createDate=new Date(Date.now())
  next();
}
exports.getAll=handler.getAll(Question,'answers')
exports.getQuestion=handler.getOne(Question,'answers')
exports.update=handler.updateOne(Question,'title','body','tags','createDate');
exports.create=handler.createOne(Question,'title','body','tags','owner','createDate');
