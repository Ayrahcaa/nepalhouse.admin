const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/productCategoryController");
const upload = require("../controllers/multerConfig"); // Multer configuration for image upload

// Routes for product category operations with image upload
router.post(
  "/add",
  upload.single("image"),
  productCategoryController.addProductCategory
); // Single image upload
router.put(
  "/update/:id",
  upload.single("image"),
  productCategoryController.updateProductCategory
); // Single image upload
router.delete("/delete/:id", productCategoryController.deleteProductCategory);

// Get all product categories
router.get("/", productCategoryController.getProductCategories);

// Get a specific product category by ID
router.get("/:id", productCategoryController.getProductCategoryById);

// New route to filter product categories based on category_id
router.get(
  "/category/:category_id",
  productCategoryController.getProductCategoriesByCategory
);

module.exports = router;
