const mongoose = require('mongoose');
const { Schema } = mongoose;
const { EXERCISE_TYPE_ENUM } = require('../constants/index');

const MatchItemSchema = new Schema({
  id: String,
  image: String,
  content: String,
  key: String,
  index: Number,
}, { _id: false });

const exerciseSchema = new Schema(
  {
    topicId: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    type: {
      type: String,
      enum: EXERCISE_TYPE_ENUM,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    questions: [
      {
        prompt: {
          type: String,
        },
        audio: {
          type: String, 
        },
        dataLeft: [MatchItemSchema],
        dataRight: [MatchItemSchema],
        answer: {
          type: Schema.Types.Mixed, 
          required: true,
        },
        content: [{
          type: Schema.Types.ObjectId,
          ref: 'Vocabulary',
        }],
      }
    ],
    logs: {
      type: Schema.Types.ObjectId,
      ref: 'Logs',  
    },
  },
  { timestamps: true }
);


const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
