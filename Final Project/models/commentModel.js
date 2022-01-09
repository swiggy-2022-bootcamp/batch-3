const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
      body: {
        type: String,
        required: [true, 'A body of answer is required']
      },
      createDate: Date,
      owner: 
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: [true, 'Answer must belong to a user']
        },
        answer:{
            type:mongoose.Schema.ObjectId,
            ref:'Answer',
            required:[true,'Answer must have a question']
        }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  commentSchema.index({ owner: 1, answer: 1 }, { unique: true });

  const Comment= mongoose.model('Comment',commentSchema);

  module.exports=Comment;