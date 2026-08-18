function Filters({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <select
        value={category}
        onChange={(event) =>
          setCategory(event.target.value)
        }
      >
        <option value="All">
          All Categories
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Fashion">
          Fashion
        </option>

        <option value="Home">
          Home
        </option>
      </select>

      <select
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value)
        }
      >
        <option value="default">
          Sort By
        </option>

        <option value="low-high">
          Price: Low to High
        </option>

        <option value="high-low">
          Price: High to Low
        </option>

        <option value="name">
          Name: A-Z
        </option>
      </select>
    </div>
  );
}

export default Filters;