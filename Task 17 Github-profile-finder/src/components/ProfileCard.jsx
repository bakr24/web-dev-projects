function ProfileCard({ user }){
  return(
    <div className="profile-card">
      <img src={user.avatar_url} alt={user.login} />

      <div className="profile-info">
        <h2>{user.name || user.login}</h2>

        <p className="username">@{user.login}</p>
        <p>{user.bio || "No bio available."}</p>
        <div className="stats">
          <div>
            <h3>{user.followers}</h3>
            <span>Followers</span>
          </div>

          <div>
            <h3>{user.following}</h3>
            <span>Following</span>
          </div>

          <div>
            <h3>{user.public_repos}</h3>
            <span>Repos</span>
          </div>
        </div>

        <div className="details">
          <p>
            <strong>Location:</strong> {user.location || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {user.company || "N/A"}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            {user.blog ? (
              <a href={user.blog} target="_blank" rel="noreferrer">
                {user.blog}
              </a>) : (
              "N/A"
            )}
          </p>

          <p>
            <strong>GitHub:</strong>{" "}
            <a href={user.html_url} target="_blank" rel="noreferrer"
            >
              Visit Profile
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;