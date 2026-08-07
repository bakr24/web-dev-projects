import axios from "axios";
const API= "https://api.github.com/users";

export const fetchUser =async (username) => {
  const response= await axios.get(`${API}/${username}`);
  return response.data;
};

export const fetchRepos = async (username) => {
  const response = await axios.get(
    `${API}/${username}/repos?sort=updated&per_page=10`
  );
  return response.data;
};