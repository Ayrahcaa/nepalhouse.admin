const News = require("../models/newsModel");
const path = require("path");

// Add a new news entry
exports.addNews = async (req, res) => {
  try {
    const { title, date, description, url } = req.body;
    let imagePath = "";

    // Check if an image file is uploaded
    if (req.file) {
      imagePath = path.join("/uploads/", req.file.filename); // Save the file path
    }

    const news = await News.create({
      image: imagePath,
      title,
      date,
      description,
      url,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: "Error adding news" });
  }
};

// Update a news entry
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description, url } = req.body;
    let imagePath = "";

    // Check if a new image file is uploaded
    if (req.file) {
      imagePath = path.join("/uploads/", req.file.filename); // Update the file path
    }

    const updatedNews = await News.update(
      { title, date, description, url, image: imagePath },
      { where: { id } }
    );

    if (updatedNews[0] === 1) {
      res.status(200).json({ message: "News updated successfully" });
    } else {
      res.status(404).json({ error: "News not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating news" });
  }
};

// Delete a news entry
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.destroy({ where: { id } });
    if (news) {
      res.status(200).json({ message: "News deleted successfully" });
    } else {
      res.status(404).json({ error: "News not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting news" });
  }
};

// Get all news
exports.getNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news articles" });
  }
};

// Get a news article by ID
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).json({ error: "News article not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching news article" });
  }
};
