const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Correct file name (small letters)
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Create blog
router.post("/", authMiddleware, createBlog);

// Get all blogs
router.get("/", getBlogs);

// Get single blog
router.get("/:id", getBlogById);

// Update blog (only author)
router.put("/:id", authMiddleware, updateBlog);

// Delete blog (only author)
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
