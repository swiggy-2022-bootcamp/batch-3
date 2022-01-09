const mongoose = require('mongoose');
const User=require('./userModel');

const questionSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'A title must not be empty'],
        trim: true,
        maxlength: [20, 'A title must have less or equal then 40 characters'],
      },
      body: {
        type: String,
        required: [true, 'A body of question is required']
      },
      upVote:{
          type: Number,
          default: 0
      },
      downVote:{
        type: Number,
        default: 0
      },
      createDate: Date,
      tags:[String],
      owner: 
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: [true, 'Question must belong to a user']
        }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  questionSchema.virtual('answers',{
    ref:'Answer',
    foreignField:'question',
    localField:'_id'
  })

  questionSchema.pre(/^find/,function(next){
    this.populate({
      path:'owner',
      select:'name photo'
    })
    next()
  })



  const Question= mongoose.model('Question',questionSchema);

  module.exports=Question;