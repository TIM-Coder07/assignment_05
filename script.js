// Log in part
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const error = document.getElementById("error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin123") {
      window.location.href = "home.html";
    } else {
      error.style.display = "block";
    }
  });
});

// All Data load
const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const content = document.getElementById("tab-content");
const tabs = document.querySelectorAll(".tab-btn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

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

// Function to render issues based on tab or search
function renderIssues(filter) {
  // Decide which issues to show
  let issuesToRender = [];

  if (typeof filter === "string") {
    issuesToRender =
      filter === "all"
        ? allIssues
        : allIssues.filter((issue) => issue.status.toLowerCase() === filter);
  } else {
    issuesToRender = filter;
  }

  // Empty state
  if (!issuesToRender.length) {
    content.innerHTML = `<p class="text-gray-500">No issues found.</p>`;
    return;
  }

  // Render cards
  content.innerHTML = issuesToRender
    .map((issue) => {
      const isOpen = issue.status.toLowerCase() === "open";

      return `
        <div class="issue-card p-4 rounded shadow bg-white ${isOpen ? "border-t-4 border-green-500" : "border-t-4 border-purple-500"} cursor-pointer"
             data-id="${issue.id}">

          <div class="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-xl transition duration-300">

            <h3 class="text-xl font-bold text-gray-800 mb-3">
              ${issue.title}
            </h3>

            <p class="text-gray-600 mb-4">
              ${issue.description}
            </p>

            <div class="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-3">

              <p>
                <span class="font-semibold">Status:</span>
                <span class="${isOpen ? "text-green-600" : "text-red-600"}">
                  ${issue.status}
                </span>
              </p>

              <p>
                <span class="font-semibold">Priority:</span>
                ${issue.priority}
              </p>

              <p>
                <span class="font-semibold">Author:</span>
                ${issue.author}
              </p>

              <p>
                <span class="font-semibold">Label:</span>
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  ${issue.label}
                </span>
              </p>

            </div>

            <p class="text-gray-500 text-xs">
              Created At: ${new Date(issue.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>
      `;
    })
    .join("");
}

// Search functionality
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderIssues("all");
    return;
  }
  const filtered = allIssues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(query) ||
      issue.description.toLowerCase().includes(query),
  );
  renderIssues(filtered);
  searchInput.value = "";
});

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

// Modal card Showing
document.addEventListener("click", function (e) {

  const card = e.target.closest(".issue-card");

  if (!card) return;

  const id = card.dataset.id;

  const issue = allIssues.find((item) => item.id == id);

  if (!issue) return;

  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-description").innerText = issue.description;
  document.getElementById("modal-status").innerText = issue.status;
  document.getElementById("modal-priority").innerText = issue.priority;
  document.getElementById("modal-author").innerText = issue.author;

  document.getElementById("my_modal_1").showModal();

});
