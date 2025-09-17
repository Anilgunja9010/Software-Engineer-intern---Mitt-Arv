
import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/api";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs");
      }
    };
    fetchBlogs();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>All Blogs</h2>

      {/* Create Blog Button */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/create">
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            + Create Blog
          </button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => {
          return (
            <div
              key={blog._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{blog.title}</h3>
              <p>
                {blog.content
                  ? blog.content.substring(0, 100) + "..."
                  : "No content"}
              </p>
              <Link to={`/blogs/${blog._id}`}>Read More</Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default BlogList;