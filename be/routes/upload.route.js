const express = require('express');
const uploadController = require('../controllers/upload.controller');
const upload = require('../middlewares/multer.middleware');

const uploadRoute = express.Router();

uploadRoute.route('/').post(upload.single('file'), uploadController.uploadAudio);

module.exports = uploadRoute;
