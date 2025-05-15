const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyTrackingTimeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    timeLearn: {
      type: Number,
      required: true,
      default: 0
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('StudyTrackingTime', studyTrackingTimeSchema);
