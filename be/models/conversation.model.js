const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    topicId: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    listConver: [
      {
        speaker: {
          type: String,
          enum: ['speakerA', 'speakerB'],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        audio: {
          type: String,
          trim: true,
        },
      },
    ],

    listInfor: {
      speakerA: {
        avatar: { type: String, trim: true },
        name: { type: String, trim: true },
      },
      speakerB: {
        avatar: { type: String, trim: true },
        name: { type: String, trim: true },
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, strict: true  },
);

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
