import { useState } from "react";
import posts from "../data/posts";
import SearchBar from "../components/SearchBar";
import BlogList from "../components/BlogList";

function Home() {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="home-page">
      <section className="hero">
        <h1>Welcome to DevBlog</h1>

        <p>
          Learn about React, JavaScript,
          Next.js, CSS, and more.
        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </section>

      <section className="posts-section">
        <h2>Latest Posts</h2>

        <BlogList posts={filteredPosts} />
      </section>
    </main>
  );
}

export default Home;