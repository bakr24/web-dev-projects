function SearchBar({ query, setQuery, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    onSearch(query.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;