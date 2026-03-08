// Log in part

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const error = document.getElementById("error");

  if (!form) {
    console.error("Login form not found! Check HTML id or script position.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin123") {
      window.location.href = "index.html";
    } else {
      error.classList.remove("hidden");
    }
  });
});

// All Data load
const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const content = document.getElementById("tab-content");
const tabs = document.querySelectorAll(".tab-btn");

let allIssues = [];

// Fetch all issues once
fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    allIssues = data.data;
    renderIssues("all");
  })
  .catch((err) => {
    content.innerHTML =
      "<p class='text-red-500'>Failed to load issues. Try again.</p>";
    console.log(err);
  });

// Function to render issues based on tab
function renderIssues(tab) {
  content.innerHTML = "";

  // Filter issues
  const filtered =
    tab === "all"
      ? allIssues
      : allIssues.filter((issue) => issue.status.toLowerCase() === tab);

  if (filtered.length === 0) {
    content.innerHTML = "<p class='text-gray-500'>No issues found.</p>";
    return;
  }

  filtered.map((issue) => {
    const card = document.createElement("div");
    // Top border color based on status
    const borderColor =
      issue.status.toLowerCase() === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";
    card.className = `p-4 rounded shadow bg-white ${borderColor}`;

    // card is here
    card.innerHTML = `
          <div class="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-xl transition duration-300">
  <!-- Title -->
  <h3 class="text-xl font-bold text-gray-800 mb-3">${issue.title}</h3>

  <!-- Description -->
  <p class="text-gray-600 mb-4">${issue.description}</p>

  <!-- Info Grid -->
  <div class="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-3">
    <p><span class="font-semibold">Status:</span> 
      <span class="${issue.status === "Open" ? "text-green-600" : "text-red-600"}">${issue.status}</span>
    </p>
    <p><span class="font-semibold">Priority:</span> ${issue.priority}</p>
    <p><span class="font-semibold">Author:</span> ${issue.author}</p>
    <p><span class="font-semibold">Label:</span> 
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">${issue.label}</span>
    </p>
  </div>

  <!-- Created At -->
  <p class="text-gray-500 text-xs">Created At: ${new Date(issue.createdAt).toLocaleDateString()}</p>
</div>
        `;

    content.appendChild(card);
  });
}

// Tab click events
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabName = tab.dataset.tab;

    // Active button style
    tabs.forEach((t) => {
      t.classList.remove("bg-green-500", "text-white");
      t.classList.add("bg-gray-200", "text-gray-700");
    });
    tab.classList.add("bg-green-500", "text-white");
    tab.classList.remove("bg-gray-200", "text-gray-700");

    // Render issues for this tab
    renderIssues(tabName);
  });
});
