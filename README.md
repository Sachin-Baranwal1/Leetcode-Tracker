# 🚀 LeetCode Profile Tracker (Chrome Extension)

> Track, compare, and stay motivated with your LeetCode journey — right from your browser.

---

## ✨ Overview

**LeetCode Profile Tracker** is a Chrome Extension that allows you to:

* 🔍 Search any LeetCode user
* 📊 View problem-solving stats instantly
* 💾 Save multiple users permanently
* ⚡ Access data in one click (no need to open LeetCode!)

---

## 🎯 Why This Project?

Most developers constantly switch tabs to check their progress on LeetCode.

This extension solves that by:

✅ Bringing stats directly into your browser
✅ Making tracking **fast, minimal, and distraction-free**
✅ Helping you stay **consistent and competitive**

---

## 🧠 Tech Stack

| Technology                 | Purpose                 |
| -------------------------- | ----------------------- |
| JavaScript (Vanilla)       | Core logic              |
| Chrome Extension API (MV3) | Extension functionality |
| GraphQL                    | Fetch LeetCode data     |
| HTML + CSS                 | UI Design               |

---

## ⚙️ Features

### 🔹 Add & Track Users

* Enter any username
* Instantly fetch stats
* Save users permanently using Chrome Storage

### 🔹 Clean UI (Dark Mode 🌙)

* Card-based layout
* Minimal & modern design
* Smooth experience inside popup

### 🔹 Detailed Stats

* 🏆 Ranking
* ✅ Total solved problems
* 🟢 Easy / 🟡 Medium / 🔴 Hard breakdown

### 🔹 User Management

* Add multiple users
* Remove users anytime

---

## 🖥️ Demo Preview

> *(Add screenshots here for better impact)*

```
📌 Example:
User: johndoe
Rank: 12045
Solved: 450
Easy: 200 | Medium: 180 | Hard: 70
```

---

## 🚀 Installation Guide

1. Clone this repository

```bash
git clone https://github.com/your-username/leetcode-tracker.git
```

2. Open Chrome and go to:

```
chrome://extensions/
```

3. Enable **Developer Mode**

4. Click **Load Unpacked**

5. Select the project folder

6. Click on the extension icon 🎉

---

## 🔗 How It Works

This extension uses **LeetCode’s GraphQL API**:

```graphql
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile { ranking }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
```

👉 This avoids scraping and ensures **fast & structured data fetching**

---

## 💡 Future Improvements

* 📈 Progress charts (Chart.js)
* 🔔 Daily streak notifications
* ⚡ Auto-refresh stats
* 🆚 Compare multiple users
* 🌐 Deploy as public Chrome Web Store extension

---

## 🧪 Challenges Faced

* Handling async API calls inside popup
* Managing persistent storage
* Structuring UI in limited popup space

---

## 📌 Learnings

* Chrome Extension architecture (Manifest V3)
* GraphQL integration in frontend
* State management using `chrome.storage`
* UI/UX optimization for small screens

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open issues or suggest improvements.

---

## ⭐ Show Your Support

If you like this project:

👉 Star this repo
👉 Share with your friends
👉 Use it in your coding journey

---

## 👨‍💻 Author

Sachin Baranwal

> "Consistency beats intensity — track your progress daily."

---
