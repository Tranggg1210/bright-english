const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_ROLE_ENUM, SALT_WORK_FACTOR } = require('../constants');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String, 
      select: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      trim: true,
      default: 'https://th.bing.com/th/id/OIP.z3fa8PjEnvzg4bhW61tEOwAAAA?rs=1&pid=ImgDetMain',
    },
    role: {
      type: String,
      enum: USER_ROLE_ENUM,
      default: USER_ROLE_ENUM.USER,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  }
  next();
});

userSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
