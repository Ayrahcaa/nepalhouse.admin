const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const upload = require("../controllers/multerConfig");

// Routes for review operations with image upload
router.post("/add", upload.single("image"), reviewController.addReview); // Single image upload
router.put(
  "/update/:id",
  upload.single("image"),
  reviewController.updateReview
); // Single image upload
router.delete("/delete/:id", reviewController.deleteReview);

// Get routes
router.get("/", reviewController.getReviews); // Get all reviews
router.get("/:id", reviewController.getReviewById); // Get a review by ID

module.exports = router;
