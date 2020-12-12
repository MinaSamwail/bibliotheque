const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

//Giving access to cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
//Cloudinary : SAAS platform : specialized in images hosting
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

const fileUploader = multer({ storage });
// a middleware designed to parse file from requests ans associate to req.files
module.exports = fileUploader;
