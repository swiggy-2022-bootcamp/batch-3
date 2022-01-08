const Question = require('../models/questionModel')
const handler =require('./handlerController')

exports.create=handler.createOne(Question);
