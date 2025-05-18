const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAnswerSchema = new Schema({
  content: {
    type: Schema.Types.Mixed, 
    required: true,
  },
  isCorrect: {
    type: Boolean, 
    required: true,
  },
}, { _id: false });

const logSchema = new Schema(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    questions: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: 'Question', 
          required: true,
        },
        userAnswers: [userAnswerSchema], 
      },
    ],
    status: {
      type: Boolean,
      default: null, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    }
  },
  { timestamps: true, strict: true  }
);

const Log = mongoose.model('Log', logSchema);
module.exports = Log;
