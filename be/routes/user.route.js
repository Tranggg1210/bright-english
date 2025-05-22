const express = require('express');
const validate = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const { auth, author } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');
const {USER_ROLE_ENUM} = require('../constants');

const userRoute = express.Router();

userRoute
  .route('/')
  .post(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    upload.single('avatar'),
    validate(userValidation.createUser),
    userController.createUser,
  )
  .get(auth, author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]), validate(userValidation.getUsers), userController.getUsers);
userRoute
  .route('/:userId')
  .get(auth, author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]), validate(userValidation.getUserById), userController.getUserById)
  .put(
    auth,
    author([USER_ROLE_ENUM.ADMIN]),
    upload.single('avatar'),
    validate(userValidation.updateUserById),
    userController.updateUserById,
  )
  .delete(auth, author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]), validate(userValidation.deleteUserById), userController.deleteUserById)
  .patch(auth, author([USER_ROLE_ENUM.ADMIN]), validate(userValidation.lockUserById), userController.lockUserById);

userRoute
  .route('/progress/:userId')
  .get(auth, author([USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.USER]), validate(userValidation.getUserById), userController.getUserProgress)

module.exports = userRoute;
