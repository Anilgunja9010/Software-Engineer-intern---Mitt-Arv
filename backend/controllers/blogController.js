
const Blog = require("../models/Blog");

// Create Blog
const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.userId, // from auth middleware
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get Blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "username email");
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.tags = req.body.tags || blog.tags;
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//  Export all controllers
module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };