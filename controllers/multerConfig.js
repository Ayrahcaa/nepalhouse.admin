const multer = require("multer");
const path = require("path");

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: "./uploads/", // Uploads will be saved in this folder
  filename: (req, file, cb) => {
    // Use the original name of the file, prepended with the current timestamp for uniqueness
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/; // Accept only images
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  console.log("File Extension:", extname); // Log the extension check result
  console.log("File MIME Type:", mimetype); // Log the MIME type check result

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    console.log("File rejected: Not an image."); // Log if file is rejected
    cb(new Error("Error: Images Only!")); // Reject non-image files
  }
};

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
