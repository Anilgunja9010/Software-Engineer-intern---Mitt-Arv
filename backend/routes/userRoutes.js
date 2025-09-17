
const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controllers/usercontroller");
const User = require("../models/User");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

// Register
router.post("/register", userRegister);

// Login
router.post("/login", userLogin);

//  Profile route
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const blogs = await Blog.find({ author: req.user.id });
    res.json({ user, blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;