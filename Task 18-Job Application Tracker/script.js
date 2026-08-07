const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const locationInput = document.getElementById("location");
const salaryInput = document.getElementById("salary");
const statusInput = document.getElementById("status");
const dateInput = document.getElementById("date");
const addJobBtn = document.getElementById("addJob");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const tableBody = document.getElementById("jobTableBody");
const emptyState = document.getElementById("emptyState");
const totalJobs = document.getElementById("totalJobs");
const appliedJobs = document.getElementById("appliedJobs");
const interviewJobs = document.getElementById("interviewJobs");
const offerJobs = document.getElementById("offerJobs");
const rejectedJobs = document.getElementById("rejectedJobs");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let editId = null;
function saveJobs() {
  localStorage.setItem(
    "jobs",
    JSON.stringify(jobs),
  );
}

function updateDashboard() {
  totalJobs.textContent = jobs.length;
  appliedJobs.textContent = jobs.filter(
    (job) => job.status === "Applied",
  ).length;

  interviewJobs.textContent = jobs.filter(
    (job) => job.status === "Interview",
  ).length;

  offerJobs.textContent = jobs.filter((job) => job.status === "Offer").length;
  rejectedJobs.textContent = jobs.filter(
    (job) => job.status === "Rejected",
  ).length;
}



function renderJobs(filteredJobs = jobs) {
  tableBody.innerHTML = "";

  if (filteredJobs.length === 0) {
    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  filteredJobs.forEach((job) => {
    const row = document.createElement("tr");

    row.innerHTML = `

            <td>

                ${job.company}

            </td>

            <td>

                ${job.position}

            </td>

            <td>

                ${job.location}

            </td>

            <td>

                $${job.salary}

            </td>

            <td>

                <span class="status ${job.status.toLowerCase()}">

                    ${job.status}

                </span>

            </td>

            <td>

                ${job.date}

            </td>

            <td>

                <div class="action-buttons">

                    <button

                        class="edit-btn"

                        onclick="editJob('${job.id}')">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button

                        class="delete-btn"

                        onclick="deleteJob('${job.id}')">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;

    tableBody.appendChild(row);
  });

  updateDashboard();
}



addJobBtn.addEventListener("click", () => {
  const company = companyInput.value.trim();

  const position = positionInput.value.trim();

  const location = locationInput.value.trim();

  const salary = salaryInput.value.trim();

  const status = statusInput.value;

  const date = dateInput.value;

  if (
    company === "" ||
    position === "" ||
    location === "" ||
    salary === "" ||
    date === ""
  ) {
    alert("Please fill in all fields.");

    return;
  }

  if (editId) {
    const job = jobs.find((item) => item.id === editId);

    if (job) {
      job.company = company;

      job.position = position;

      job.location = location;

      job.salary = salary;

      job.status = status;

      job.date = date;
    }

    editId = null;

    addJobBtn.innerHTML = `

            <i class="fa-solid fa-plus"></i>

            Add Application

        `;
  } else {
    const newJob = {
      id: Date.now().toString(),

      company: company,

      position: position,

      location: location,

      salary: salary,

      status: status,

      date: date,
    };

    jobs.unshift(newJob);
  }

  saveJobs();

  renderJobs();

  clearForm();
});



function editJob(id) {
  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return;
  }

  companyInput.value = job.company;

  positionInput.value = job.position;

  locationInput.value = job.location;

  salaryInput.value = job.salary;

  statusInput.value = job.status;

  dateInput.value = job.date;

  editId = id;

  addJobBtn.innerHTML = `

        <i class="fa-solid fa-pen"></i>

        Update Application

    `;

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
}



function deleteJob(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this application?",
  );

  if (!confirmDelete) {
    return;
  }

  jobs = jobs.filter((job) => job.id !== id);

  saveJobs();

  renderJobs();
}



function clearForm() {
  companyInput.value = "";

  positionInput.value = "";

  locationInput.value = "";

  salaryInput.value = "";

  statusInput.value = "Applied";

  dateInput.value = "";

  editId = null;

  addJobBtn.innerHTML = `

        <i class="fa-solid fa-plus"></i>

        Add Application

    `;
}


searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.trim().toLowerCase();

  const statusValue = filterStatus.value;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchValue) ||
      job.position.toLowerCase().includes(searchValue);

    const matchesStatus = statusValue === "All" || job.status === statusValue;

    return matchesSearch && matchesStatus;
  });

  renderJobs(filteredJobs);
});



filterStatus.addEventListener("change", () => {
  const searchValue = searchInput.value.trim().toLowerCase();

  const statusValue = filterStatus.value;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchValue) ||
      job.position.toLowerCase().includes(searchValue);

    const matchesStatus = statusValue === "All" || job.status === statusValue;

    return matchesSearch && matchesStatus;
  });

  renderJobs(filteredJobs);
});



function setTodayDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  dateInput.value = `${year}-${month}-${day}`;
}



document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    addJobBtn.click();
  }
});



const formInputs = document.querySelectorAll(
  ".job-form input, .job-form select",
);

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.boxShadow = "0 0 0 3px rgba(99,102,241,.45)";
  });

  input.addEventListener("blur", () => {
    input.style.boxShadow = "none";
  });
});



window.addEventListener("DOMContentLoaded", () => {
  setTodayDate();

  renderJobs();

  updateDashboard();
});



document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearForm();
  }
});



window.addEventListener("beforeunload", () => {
  saveJobs();
});



window.addEventListener("load", () => {
  companyInput.focus();
});



function sortJobs() {
  jobs.sort((a, b) => {
    return Number(b.id) - Number(a.id);
  });
}



const originalSaveJobs = saveJobs;

saveJobs = function () {
  sortJobs();

  originalSaveJobs();
};



function checkEmptyState() {
  if (jobs.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

function initializeApp() {
  sortJobs();

  renderJobs();

  updateDashboard();

  checkEmptyState();
}

initializeApp();

