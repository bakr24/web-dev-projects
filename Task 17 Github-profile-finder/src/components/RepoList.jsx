function RepoList({ repos }){
  return (
    <div className="repo-list">
      <h2>Latest Repositories</h2>

      {repos.length ===0 ?(
        <p>No repositories found.</p>
      ) : (
        repos.map((repo) => (
          <div className="repo-card" key={repo.id}>
            <h3>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
            </h3>

            <p>{repo.description || "No description."}</p>
            <div className="repo-details">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>{repo.language || "Unknown"}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default RepoList;