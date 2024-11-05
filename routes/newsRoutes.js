const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const upload = require("../controllers/multerConfig");

// Routes for news operations with image upload
router.post("/add", upload.single("image"), newsController.addNews); // Single image upload
router.put("/update/:id", upload.single("image"), newsController.updateNews); // Single image upload
router.delete("/delete/:id", newsController.deleteNews);

// Get routes
router.get("/", newsController.getNews); // Get all news articles
router.get("/:id", newsController.getNewsById); // Get a news article by ID

module.exports = router;
