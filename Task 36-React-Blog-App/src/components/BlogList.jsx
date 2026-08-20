import BlogCard from "./BlogCard";

function BlogList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p>No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}

export default BlogList;