import { useParams } from "react-router-dom";
import posts from "../data/posts";
import BlogList from "../components/BlogList";

function Category() {
  const { name } = useParams();

  const categoryPosts = posts.filter(
    (post) =>
      post.category.toLowerCase() ===
      name.toLowerCase()
  );

  return (
    <main className="category-page">
      <h1>{name} Posts</h1>

      <BlogList posts={categoryPosts} />
    </main>
  );
}

export default Category;