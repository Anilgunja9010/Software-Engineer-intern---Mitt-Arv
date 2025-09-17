import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/BlogList.css";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="blog-list-container">
      <h1 className="blog-heading">All Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <Link to={`/blogs/${blog._id}`} className="blog-title">
              {blog.title}
            </Link>
            <p className="blog-content">
              {blog.content.length > 120
                ? blog.content.slice(0, 120) + "..."
                : blog.content}
            </p>
            <Link to={`/blogs/${blog._id}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;