const mongoose = require('mongoose');
const User=require('./userModel');

const questionSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'A title must have a name'],
        trim: true,
        maxlength: [20, 'A tour name must have less or equal then 40 characters'],
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

  const Question= mongoose.model('Question',questionSchema);

  module.exports=Question;