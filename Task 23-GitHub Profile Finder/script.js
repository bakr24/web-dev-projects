const API_URL = "https://api.github.com/users";

const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const profileSection = document.getElementById("profileSection");
const emptyState = document.getElementById("emptyState");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const profileLink = document.getElementById("profileLink");

const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repositories = document.getElementById("repositories");
const gists = document.getElementById("gists");

const locationElement = document.getElementById("location");
const companyElement = document.getElementById("company");
const websiteElement = document.getElementById("website");
const twitterElement = document.getElementById("twitter");

const repositoriesContainer = document.getElementById("repositoriesContainer");
const repositoryCount = document.getElementById("repositoryCount");

async function searchUser(usernameValue) {
    const usernameText = usernameValue.trim();

    if (!usernameText) {
        showError("Please enter a GitHub username.");
        return;
    }

    showLoading();

    try {
        const response = await fetch(
            `${API_URL}/${encodeURIComponent(usernameText)}`
        );

        if (response.status === 404) {
            throw new Error("GitHub user not found.");
        }

        if (!response.ok) {
            throw new Error("Something went wrong. Please try again.");
        }

        const user = await response.json();

        displayProfile(user);

        await fetchRepositories(user.login);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    profileSection.classList.add("hidden");
    emptyState.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(errorText) {
    loading.classList.add("hidden");
    profileSection.classList.add("hidden");
    emptyState.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.querySelector("p").textContent = errorText;
}

function displayProfile(user) {
    errorMessage.classList.add("hidden");
    emptyState.classList.add("hidden");
    profileSection.classList.remove("hidden");

    avatar.src = user.avatar_url;
    avatar.alt = `${user.login} GitHub profile`;

    name.textContent = user.name || user.login;

    username.textContent = `@${user.login}`;
    username.href = user.html_url;

    bio.textContent =
        user.bio || "This user has not added a bio.";

    profileLink.href = user.html_url;

    followers.textContent = formatNumber(user.followers);
    following.textContent = formatNumber(user.following);
    repositories.textContent = formatNumber(user.public_repos);
    gists.textContent = formatNumber(user.public_gists);

    locationElement.textContent =
        user.location || "Not available";

    companyElement.textContent =
        user.company || "Not available";

    setupWebsite(user.blog);

    setupTwitter(user.twitter_username);
}

function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
}

function setupWebsite(website) {
    if (!website) {
        websiteElement.textContent = "Not available";
        websiteElement.removeAttribute("href");
        return;
    }

    const url =
        website.startsWith("http://") ||
        website.startsWith("https://")
            ? website
            : `https://${website}`;

    websiteElement.textContent = website;
    websiteElement.href = url;
}

function setupTwitter(twitterUsername) {
    if (!twitterUsername) {
        twitterElement.textContent = "Not available";
        twitterElement.removeAttribute("href");
        return;
    }

    twitterElement.textContent = `@${twitterUsername}`;
    twitterElement.href =
        `https://twitter.com/${twitterUsername}`;
}

async function fetchRepositories(usernameValue) {
    try {
        const response = await fetch(
            `${API_URL}/${encodeURIComponent(usernameValue)}/repos?sort=updated&per_page=10`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch repositories.");
        }

        const repositoriesData = await response.json();

        displayRepositories(repositoriesData);
    } catch (error) {
        repositoriesContainer.innerHTML = `
            <div class="error-message">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>${error.message}</p>
            </div>
        `;

        repositoryCount.textContent =
            "Unable to load repositories";
    }
}

function displayRepositories(repositoriesData) {
    repositoriesContainer.innerHTML = "";

    repositoryCount.textContent =
        `${repositoriesData.length} ${repositoriesData.length === 1 ? "repository" : "repositories"}`;

    if (repositoriesData.length === 0) {
        repositoriesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-code-branch"></i>
                <h2>No Repositories</h2>
                <p>This user has no public repositories.</p>
            </div>
        `;

        return;
    }

    repositoriesData.forEach(repository => {
        const repositoryCard =
            document.createElement("article");

        repositoryCard.className =
            "repository-card";

        repositoryCard.innerHTML = `
            <div class="repository-header">

                <a
                    class="repository-name"
                    href="${repository.html_url}"
                    target="_blank">
                    ${repository.name}
                </a>

                <span class="repository-visibility">
                    ${repository.visibility || "public"}
                </span>

            </div>

            <p class="repository-description">
                ${repository.description || "No description available."}
            </p>

            <div class="repository-meta">

                <span class="repository-language">
                    <i class="fa-solid fa-circle"></i>
                    ${repository.language || "Not specified"}
                </span>

                <span class="repository-stars">
                    <i class="fa-solid fa-star"></i>
                    ${formatNumber(repository.stargazers_count)}
                </span>

                <span class="repository-forks">
                    <i class="fa-solid fa-code-fork"></i>
                    ${formatNumber(repository.forks_count)}
                </span>

                <span>
                    <i class="fa-solid fa-eye"></i>
                    ${formatNumber(repository.watchers_count)}
                </span>

            </div>
        `;

        repositoriesContainer.appendChild(repositoryCard);
    });
}

searchBtn.addEventListener("click", () => {
    const usernameValue = usernameInput.value.trim();

    searchUser(usernameValue);
});

usernameInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const usernameValue = usernameInput.value.trim();

        searchUser(usernameValue);
    }
});

usernameInput.addEventListener("input", () => {
    if (errorMessage.classList.contains("hidden")) {
        return;
    }

    errorMessage.classList.add("hidden");
});

window.addEventListener("load", () => {
    usernameInput.value = "bakr24";
    searchUser("bakr24");
});