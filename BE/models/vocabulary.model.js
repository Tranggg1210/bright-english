const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vocabularySchema = new Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Topic',
      required: true,
    },
    word: {
      type: String,
      required: true, 
      trim: true,
    },
    translate: {
      type: String,
      required: true, 
      trim: true,
    },
    transcription: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);

module.exports = Vocabulary;
