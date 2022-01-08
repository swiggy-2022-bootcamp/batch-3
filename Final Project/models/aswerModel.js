const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
    {
      body: {
        type: String,
        required: [true, 'A body of answer is required']
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
      owner: 
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: [true, 'Answer must belong to a user']
        },
        question:{
            type:mongoose.Schema.ObjectId,
            ref:'Question',
            required:[true,'Answer must have a question']
        }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  answerSchema.index({ owner: 1, question: 1 }, { unique: true });

  const Answer= mongoose.model('Answer',answerSchema);

  module.exports=Answer;