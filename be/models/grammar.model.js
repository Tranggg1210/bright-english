const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const grammarSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String, 
      required: true,
    },
    source: {
      type: String,
    },
  },
  { timestamps: true, strict: true },
);

const Grammar = mongoose.model('Grammar', grammarSchema);

module.exports = Grammar;
