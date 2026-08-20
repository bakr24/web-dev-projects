import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <img
        src={post.image}
        alt={post.title}
        className="blog-image"
      />

      <div className="blog-content">
        <span className="blog-category">
          {post.category}
        </span>

        <h2>{post.title}</h2>

        <p className="blog-excerpt">
          {post.excerpt}
        </p>

        <div className="blog-footer">
          <span>{post.author}</span>

          <Link to={`/blog/${post.id}`}>
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;