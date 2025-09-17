
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlog } from "../services/api"; // deleteBlog import chesanu

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
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>
        <strong>Tags:</strong> {blog.tags?.join(", ")}
      </p>

      <small>
        By {blog.author?.username || "Unknown"} ({blog.author?.email || "no email"})
      </small>

      {/* Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {/* Edit Button */}
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/blogs/${id}/edit`)}
        >
          Edit Blog
        </button>

        {/* Delete Button */}
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
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