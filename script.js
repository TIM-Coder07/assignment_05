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

  // Tab click events
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabName = tab.dataset.tab;

    //Active button style
    tabs.forEach((t) => {
      t.classList.remove("bg-green-500", "text-white");
      t.classList.add("bg-gray-200", "text-gray-700");
    });
    tab.classList.add("bg-green-500", "text-white");
    tab.classList.remove("bg-gray-200", "text-gray-700");

    // Show Loading spinner
    content.innerHTML = `
      <div class="flex justify-center items-center py-10">
        <span class="loading loading-spinner text-warning"></span>
      </div>
    `;

    // Add delay for show loder spiner
    setTimeout(() => {
      renderIssues(tabName);
    }, 200);
  });
});

// Function show issues based on tab or search
function renderIssues(filter) {
  let issuesToRender = [];

  if (typeof filter === "string") {
    issuesToRender =
      filter === "all"
        ? allIssues
        : allIssues.filter((issue) => issue.status.toLowerCase() === filter);
  } else {
    issuesToRender = filter;
  }
  //  Count Update
  const count = document.getElementById("allCount");
  count.textContent = `(${issuesToRender.length})`;

  // Empty data validation
  if (!issuesToRender.length) {
    content.innerHTML = `<p class="text-gray-500">No issues found.</p>`;
    return;
  }
  
  // Render cards
  content.innerHTML = issuesToRender
    .map((issue) => {
      const isOpen = issue.status.toLowerCase() === "open";

      return `
<div class="issue-card cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 ${isOpen ? "border-green-500" : "border-purple-500"}"
     data-id="${issue.id}">

  <div class="p-6">

<!-- Icon is here  -->
      <div class="mb-2">
      ${isOpen 
      ? '<img src="assets/Open-Status.png"/>' 
      :'<img src="assets/Closed.png"/>'
    }</div>

    <!-- Title -->
    <h3 class="text-lg font-bold text-gray-800 mb-2">
      ${issue.title}
    </h3>

    <!-- Description -->
    <p class="text-gray-600 text-sm mb-4 line-clamp-2">
      ${issue.description}
    </p>

    <!-- Info Grid -->
    <div class="grid grid-cols-2 gap-4 text-sm mb-4">

      <!-- Status -->
      <div>
        <span class="text-gray-500 font-medium">Status</span><br>
        <span class="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full
        ${isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}">
          ${issue.status}
        </span>
      </div>

      <!-- Priority -->
      <div>
  <span class="text-gray-500 font-medium">Priority</span><br>
  <span class="font-semibold text-gray-700 
        ${
          issue.priority === "high"
            ? "text-red-600"
            : issue.priority === "medium"
              ? "text-yellow-600"
              : "text-green-600"
        }">
    ${issue.priority}
  </span>
</div>

      <!-- Author -->
      <div>
        <span class="text-gray-500 font-medium">Author</span><br>
        <span class="font-semibold text-gray-700">
          ${issue.author}
        </span>
      </div>

      <!-- Labels -->
      <div>
        <span class="text-gray-500 font-medium">Labels</span><br>
        <div class="flex flex-wrap mt-1 gap-1">
          ${issue.labels
            .map(
              (label) => `
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-orange-300 ">
              ${label}
            </span>
          `,
            )
            .join("")}
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class = "flex justify-between items-center text-xs text-gray-400">
      <span>
        Created: ${new Date(issue.createdAt).toLocaleDateString()}
      </span>
      <span class = "text-blue-500 font-medium">
        View Details →
      </span>
    </div>

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

// Show only active tab count
function showActiveTabCount(tabName) {
  const spans = document.querySelectorAll(".tab-count");
  spans.forEach((span) => span.classList.add("hidden"));

  // Show only active tab
  document.getElementById(`count-${tabName}`).classList.remove("hidden");
}

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
  document.getElementById("modal-author").innerText = issue.assignee;

  // Labels
  const labelsHTML = issue.labels
    .map(
      (label) => `
    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-orange-300">
      ${label}
    </span>
  `,
    )
    .join("");
  document.getElementById("modal-labels").innerHTML = labelsHTML;

  // Created date
  document.getElementById("modal-date").innerText =
    `Created At: ${new Date(issue.createdAt).toLocaleDateString()}`;

  document.getElementById("my_modal_1").showModal();
});
