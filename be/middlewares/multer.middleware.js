const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: function (req,file, cb ){
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp',
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'video/mp4',
    'video/webm',
    'video/quicktime',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ hỗ trợ file ảnh, audio hoặc video hợp lệ'), false);
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

module.exports = upload;
