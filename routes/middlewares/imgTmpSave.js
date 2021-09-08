const multer = require("multer");
const path = require("path");

const tmpDir = path.join(process.cwd(), "tmp");

const storageSettings = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 10000 },
});

const imgUpload = multer({ storage: storageSettings });

module.exports = imgUpload;
