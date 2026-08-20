import { Link, useParams } from "react-router-dom";
import posts from "../data/posts";

function BlogDetails() {
  const { id } = useParams();

  const post = posts.find(
    (post) => post.id === Number(id)
  );

  if (!post) {
    return (
      <main className="not-found">
        <h1>Post not found.</h1>

        <Link to="/">
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="blog-details">
      <img
        src={post.image}
        alt={post.title}
        className="details-image"
      />

      <article className="details-content">
        <span className="blog-category">
          {post.category}
        </span>

        <h1>{post.title}</h1>

        <div className="post-info">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>

        <p>{post.content}</p>

        <Link to="/" className="back-link">
          ← Back to Posts
        </Link>
      </article>
    </main>
  );
}

export default BlogDetails;