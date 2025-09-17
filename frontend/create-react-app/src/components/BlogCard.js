
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Blog title link to single blog */}
      <Link 
        to={`/blogs/${blog._id}`} 
        style={{ textDecoration: "none", color: "blue" }}
      >
        <h3>{blog.title}</h3>
      </Link>

      {/* Blog content preview */}
      <p>{blog.content.substring(0, 100)}...</p>
    </div>
  );
}

export default BlogCard;