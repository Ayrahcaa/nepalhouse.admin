const Review = require("../models/reviewModel");
const path = require("path");

// Add a new review with image upload
exports.addReview = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imagePath = "";

    // Check if an image file is uploaded
    if (req.file) {
      imagePath = path.join("/uploads/", req.file.filename); // Save the file path
    }

    const review = await Review.create({ name, image: imagePath, description });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Error adding review" });
  }
};

// Update a review with image upload
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let imagePath = "";

    // Check if a new image file is uploaded
    if (req.file) {
      imagePath = path.join("/uploads/", req.file.filename); // Update the file path
    }

    const updatedReview = await Review.update(
      { name, image: imagePath, description },
      { where: { id } }
    );

    if (updatedReview[0] === 1) {
      res.status(200).json({ message: "Review updated successfully" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating review" });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.destroy({ where: { id } });
    if (review) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting review" });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching review" });
  }
};
