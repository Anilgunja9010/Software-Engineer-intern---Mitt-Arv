import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "", tags: [] });

  // Fetch blog by ID
  useEffect(() => {
    getBlogById(id)
      .then((res) => {
        const fetched = res.data.blog || res.data;
        setBlog({
          title: fetched.title || "",
          content: fetched.content || "",
          tags: fetched.tags || [],
        });
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {
      // Split string into array for backend
      setBlog({
        ...blog,
        tags: value.split(",").map((t) => t.trim()).filter((t) => t !== ""),
      });
    } else {
      setBlog({ ...blog, [name]: value });
    }
  };

  // Submit updated blog
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(id, blog)
      .then(() => {
        alert(" Blog updated successfully!");
        navigate(`/blogs/${id}`);
      })
      .catch((err) => {
        console.error("Error updating blog:", err);
        alert(" Update failed!");
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Content"
          style={{ width: "100%", height: "120px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          name="tags"
          value={blog.tags.join(", ")}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;