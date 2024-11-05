const Category = require("../models/categoryModel");
const path = require("path");

// Add a new category with image and description
exports.addCategory = async (req, res) => {
  try {
    const { name, title, description } = req.body; // Destructure description from req.body
    let imagePath = "";

    // Check if an image file is uploaded
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Save the file path
    }

    const category = await Category.create({
      name,
      title,
      description, // Add description field
      image: imagePath, // Save image path in the category
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error adding category" });
  }
};

// Update a category with image and description
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, description } = req.body; // Destructure description from req.body
    let imagePath = "";

    // Check if a new image file is uploaded
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Update the file path
    }

    const updatedCategory = await Category.update(
      { name, title, description, image: imagePath }, // Include description in update
      { where: { id } }
    );

    if (updatedCategory[0] === 1) {
      res.status(200).json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status500().json({ error: "Error updating category" });
  }
};

// Get all categories with description
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch all categories, including the description
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

// Get a specific category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id); // Fetch category by primary key (ID)

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.destroy({ where: { id } });
    if (category) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
