import { useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { fetchUser, fetchRepos } from "./services/githubApi";
function App() {
  const [user, setUser] =useState(null);
  const [repos, setRepos] =useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]= useState("");

  const searchUser =async(username)=>{
    if (!username.trim())
      return;
    setLoading(true);
    setError("");

    try{
      const userData =await fetchUser(username);
      const repoData =await fetchRepos(username);

      setUser(userData);
      setRepos(repoData);
    } 
    
    catch (err) {

      setUser(null);
      setRepos([]);
      setError("GitHub user not found.");
    }

    setLoading(false);
  };

  return(
    <div className="container">
      <h1>GitHub Profile Finder</h1>
      <SearchBar onSearch={searchUser} />

      {loading && <Loader />}
      {error&&<ErrorMessage message={error} />}
      {user&&(
        <>
          <ProfileCard user={user} />
          <RepoList repos={repos} />
        </>
      )}
    </div>
  );
}
export default App;