
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlog } from "../services/api";
import "../styles/BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogById(id)
      .then((res) => {
        console.log("Blog fetched:", res.data);
        setBlog(res.data.blog || res.data);
      })
      .catch((err) => console.error("Error fetching blog:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="blog-details-container">
      <h1 className="blog-details-title">{blog.title}</h1>
      <p className="blog-details-content">{blog.content}</p>

      <p className="blog-details-tags">
        <strong>Tags:</strong> {blog.tags?.join(", ")}
      </p>

      <small className="blog-details-author">
        By {blog.author?.username || "Unknown"} ({blog.author?.email || "no email"})
      </small>

      {/* Buttons */}
      <div className="blog-details-buttons">
        <button
          className="edit-btn"
          onClick={() => navigate(`/blogs/${id}/edit`)}
        >
          Edit Blog
        </button>

        <button
          className="delete-btn"
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete this blog?")) {
              try {
                await deleteBlog(id);
                alert("Blog deleted successfully");
                navigate("/blogs");
              } catch (err) {
                console.error("Error deleting blog:", err);
                alert("Failed to delete blog");
              }
            }
          }}
        >
          Delete Blog
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;