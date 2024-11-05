const ProductCategory = require("../models/productCategoryModel");

// Get all product categories
exports.getProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll(); // Fetch all product categories
    res.status(200).json(productCategories);
  } catch (error) {
    console.error("Error fetching product categories:", error.message); // Log the error
    res.status(500).json({ error: "Error fetching product categories" });
  }
};

// Get product categories by category_id
exports.getProductCategoriesByCategory = async (req, res) => {
  try {
    const { category_id } = req.params; // Extract category_id from params
    const productCategories = await ProductCategory.findAll({
      where: { category_id }, // Filter based on category_id
    });

    if (productCategories.length > 0) {
      res.status(200).json(productCategories);
    } else {
      res
        .status(404)
        .json({ error: "No product categories found for this category" });
    }
  } catch (error) {
    console.error(
      "Error fetching product categories by category:",
      error.message
    ); // Log the error
    res.status(500).json({ error: "Error fetching product categories" });
  }
};

// Get a specific product category by ID
exports.getProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await ProductCategory.findByPk(id); // Fetch product category by ID

    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json({ error: "Product category not found" });
    }
  } catch (error) {
    console.error("Error fetching product category:", error.message); // Log the error
    res.status(500).json({ error: "Error fetching product category" });
  }
};

// Add a new product category with image upload
exports.addProductCategory = async (req, res) => {
  try {
    const { title, quantity, description, category_id } = req.body;
    let imagePath = "";

    // Check if an image file is uploaded
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Save the file path to the product category record
    }

    const productCategory = await ProductCategory.create({
      title,
      quantity,
      description,
      image: imagePath,
      category_id,
    });

    res.status(201).json(productCategory);
  } catch (error) {
    console.error("Error adding product category:", error.message); // Log the error
    res.status(500).json({ error: "Error adding product category" });
  }
};

// Update a product category with image upload
exports.updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, quantity, description, category_id } = req.body;
    let imagePath = "";

    // Check if a new image file is uploaded
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Update the file path
    }

    const updatedProductCategory = await ProductCategory.update(
      { title, quantity, description, image: imagePath, category_id },
      { where: { id } }
    );

    if (updatedProductCategory[0] === 1) {
      res
        .status(200)
        .json({ message: "Product category updated successfully" });
    } else {
      res.status(404).json({ error: "Product category not found" });
    }
  } catch (error) {
    console.error("Error updating product category:", error.message); // Log the error
    res.status(500).json({ error: "Error updating product category" });
  }
};

// Delete a product category
exports.deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await ProductCategory.destroy({ where: { id } });
    if (productCategory) {
      res
        .status(200)
        .json({ message: "Product category deleted successfully" });
    } else {
      res.status(404).json({ error: "Product category not found" });
    }
  } catch (error) {
    console.error("Error deleting product category:", error.message); // Log the error
    res.status(500).json({ error: "Error deleting product category" });
  }
};
