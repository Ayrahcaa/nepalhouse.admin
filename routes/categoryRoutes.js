const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../controllers/multerConfig");

// Routes for category operations
router.get("/", categoryController.getCategories); // Get all categories
router.get("/:id", categoryController.getCategoryById); // Get a specific category by ID
router.post("/add", upload.single("image"), categoryController.addCategory); // Add category with image
router.put(
  "/update/:id",
  upload.single("image"),
  categoryController.updateCategory
); // Update category with image
router.delete("/delete/:id", categoryController.deleteCategory); // Delete a category

module.exports = router;
