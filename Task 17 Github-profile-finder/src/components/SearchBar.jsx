import { useState } from "react";

function SearchBar({ onSearch }) {
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onSearch(username);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter GitHub username..." value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
export default SearchBar;