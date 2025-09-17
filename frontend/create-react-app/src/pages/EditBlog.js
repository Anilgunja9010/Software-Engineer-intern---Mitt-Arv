
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/api";
import "../styles/EditBlog.css";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setTitle(res.data.title);
        setContent(res.data.content);
        setTags(res.data.tags.join(", "));
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBlog = {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      };
      await updateBlog(id, updatedBlog);
      alert("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog.");
    }
  };

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit} className="edit-blog-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
        />
        <textarea
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
          required
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <button type="submit" className="update-btn">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;