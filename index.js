const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const newsRoutes = require("./routes/newsRoutes");

const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product_categories", productCategoryRoutes);
app.use("/api/news", newsRoutes);

// Test database connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
