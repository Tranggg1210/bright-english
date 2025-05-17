const mongoose = require('mongoose');

const userConversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  writingScore: {
    type: Number,
    default: 0,
  },
  writingLastLearnedAt: {
    type: Date,
    default: Date.now,
  },
  speakingScore: {
    type: Number,
    default: 0,
  },
  speakingLastLearnedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true, strict: true  });

module.exports = mongoose.model('UserConversation', userConversationSchema);
