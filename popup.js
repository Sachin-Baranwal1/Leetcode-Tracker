/**
 * LeetCode ID Tracker - Core Logic
 * Optimized for performance and user experience.
 */

const usersDiv = document.getElementById("users");
const addBtn = document.getElementById("addUser");
const usernameInput = document.getElementById("username");

// --- Storage Helpers ---

const getUsers = () => new Promise((resolve) => {
    chrome.storage.local.get(["users"], (result) => resolve(result.users || []));
});

const saveUsers = (users) => {
    chrome.storage.local.set({ users });
};

// --- API Logic ---

async function fetchUser(username) {
    const query = {
        query: `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                username
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                profile {
                    ranking
                }
            }
        }`,
        variables: { username }
    };

    try {
        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });

        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        return data.data.matchedUser;
    } catch (error) {
        console.error(`Error fetching user ${username}:`, error);
        return null;
    }
}

// --- UI Rendering ---

function createStatItem(label, value) {
    return `
        <div class="stats-item">
            <span class="stats-label">${label}</span>
            <span class="stats-value">${value}</span>
        </div>
    `;
}

async function loadUsers() {
    // Show loading state if it's the first load
    if (usersDiv.innerHTML === "") {
        usersDiv.innerHTML = '<div style="text-align:center; padding: 20px; color: #94a3b8;">Loading profiles...</div>';
    }

    const users = await getUsers();
    
    // Clear for re-render
    usersDiv.innerHTML = "";

    if (users.length === 0) {
        usersDiv.innerHTML = '<div style="text-align:center; padding: 20px; color: #94a3b8;">No users tracked yet.</div>';
        return;
    }

    // Fetch all users in parallel for better speed
    const userPromises = users.map(username => fetchUser(username));
    const results = await Promise.all(userPromises);

    results.forEach((data, index) => {
        const username = users[index];
        const card = document.createElement("div");
        card.className = "card";

        if (!data) {
            card.innerHTML = `
                <h3>${username} <span style="color: #ef4444; font-size: 10px;">Offline/Error</span></h3>
                <button class="delete-btn">Remove</button>
            `;
        } else {
            const stats = data.submitStats.acSubmissionNum;
            const getCount = (diff) => stats.find(x => x.difficulty === diff)?.count || 0;

            card.innerHTML = `
                <h3>
                    <span>${data.username}</span>
                    <span style="font-size: 0.75rem; color: #22c55e;">#${data.profile.ranking.toLocaleString()}</span>
                </h3>
                <div class="stats">
                   <div style="color: grey; font-weight: 700">  ${createStatItem("Total", getCount("All"))}</div>
                    <div style="background-color: cyan; color: black; font-weight: 700;">${createStatItem("Easy", getCount("Easy"))}</div>
                    <div style="background-color: orange; color: black; font-weight: 700;">${createStatItem("Medium", getCount("Medium"))}</div>
                    <div style="background-color: red; color: black; font-weight: 700;">${createStatItem("Hard", getCount("Hard"))}</div>
                    
                </div>
                <button class="delete-btn">Remove Profile</button>
            `;
        }

        card.querySelector(".delete-btn").onclick = () => deleteUser(username);
        usersDiv.appendChild(card);
    });
}

// --- Actions ---

async function addUser() {
    const username = usernameInput.value.trim();
    if (!username) return;

    // Visual feedback
    addBtn.disabled = true;
    addBtn.textContent = "...";

    let stored = await getUsers();
    if (!stored.includes(username)) {
        // Verify user exists before adding
        const exists = await fetchUser(username);
        if (exists) {
            stored.push(username);
            saveUsers(stored);
            usernameInput.value = "";
            await loadUsers();
        } else {
            alert("User not found on LeetCode!");
        }
    } else {
        alert("User already added!");
    }

    addBtn.disabled = false;
    addBtn.textContent = "Add";
}

async function deleteUser(username) {
    let stored = await getUsers();
    stored = stored.filter(u => u !== username);
    saveUsers(stored);
    loadUsers();
}

// --- Event Listeners ---

addBtn.addEventListener("click", addUser);

// Add on "Enter" key press
usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addUser();
});

// Initial load
document.addEventListener("DOMContentLoaded", loadUsers);
