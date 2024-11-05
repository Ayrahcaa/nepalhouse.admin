const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../controllers/multerConfig");

// Routes for product operations with image upload
router.post("/add", upload.single("image"), productController.addProduct); // Add a product
router.put(
  "/update/:id",
  upload.single("image"),
  productController.updateProduct
); // Update a product
router.delete("/delete/:id", productController.deleteProduct); // Delete a product

// Get routes
router.get("/", productController.getProducts); // Get all products
router.get("/:id", productController.getProductById); // Get a product by its ID
router.get("/category/:category_id", productController.getProductsByCategory); // Get products by category

module.exports = router;
