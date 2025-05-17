const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userVocabularySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  vocabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
    required: true,
  },
  isLearn: {
    type: Boolean,
    default: false,
  },
  timeLearn: {
    type: Date,
    default: null
  },
}, {
  timestamps: true,
  strict: true 
});

userVocabularySchema.index({ userId: 1, vocabId: 1 }, { unique: true });

const UserVocabulary = mongoose.model('UserVocabulary', userVocabularySchema);

module.exports = UserVocabulary;
