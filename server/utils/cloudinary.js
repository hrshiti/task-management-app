const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'task_uploads', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'pdf', 'docx', 'zip'], // File types
  },
});

module.exports = { cloudinary, storage };
