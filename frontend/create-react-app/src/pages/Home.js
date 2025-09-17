

import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/api";
import{Link} from "react-router-dom"

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((res) => {
        console.log("Blogs Response:", res.data); // debug
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1>All Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blogs.map((blog) => (
        
          <div
            key={blog._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            <p>{blog.content}</p>
            <p>
              <strong>Tags:</strong> {blog.tags.join(", ")}
            </p>
            <small>
              By {blog.author?.username || "Unknown"} (
              {blog.author?.email || "no email"})
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;