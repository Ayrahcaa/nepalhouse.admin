const Product = require("../models/productModel");
const path = require("path");

// Add a new product with image upload
exports.addProduct = async (req, res) => {
  try {
    const { name, quantity, price, product_category_id } = req.body;
    let imagePath = "";

    // Check if an image file is uploaded
    if (req.file) {
      imagePath = path.join("/uploads/", req.file.filename); // Save the file path to the product record
    }

    const product = await Product.create({
      image: imagePath,
      name,
      quantity,
      price,
      product_category_id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
};

// Update a product with image upload
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, product_category_id } = req.body;
    let imagePath = "";

    // Check if a new image file is uploaded
    if (req.file) {
      imagePath = path.join("/uploads/", req.file.filename); // Update the file path
    }

    const updatedProduct = await Product.update(
      { image: imagePath, name, quantity, price, product_category_id },
      { where: { id } }
    );

    if (updatedProduct[0] === 1) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.destroy({ where: { id } });
    if (product) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Get products by product category ID
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const products = await Product.findAll({
      where: { product_category_id: category_id },
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found for this category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching products by category" });
  }
};
