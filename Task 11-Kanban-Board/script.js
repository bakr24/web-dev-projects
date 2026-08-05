const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");

let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

function saveTasks() {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}
function renderTasks() {
  todo.innerHTML = "";
  progress.innerHTML = "";
  done.innerHTML = "";

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML = `
            <h3>${task.title}</h3>
            <div class="task-buttons">
                <button class="move-btn" title="Move Task">
    <i class="fa-solid fa-arrow-right"></i>
</button>

<button class="delete-btn" title="Delete Task">
    <i class="fa-solid fa-trash"></i>
</button>
    </div>
`;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    // Move
    card.querySelector(".move-btn").addEventListener("click", () => {
      if (task.status === "todo") {
        task.status = "progress";
      } else if (task.status === "progress") {
        task.status = "done";
      } else {
        task.status = "todo";
      }
      saveTasks();
      renderTasks();
    });

    if (task.status === "todo") {
      todo.appendChild(card);
    }
    if (task.status === "progress") {
      progress.appendChild(card);
    }
    if (task.status === "done") {
      done.appendChild(card);
    }
  });
}
function addTask() {
  const text = input.value.trim();
  if (!text) return;
  tasks.push({
    id: Date.now(),
    title: text,
    status: "todo",
  });
  saveTasks();
  renderTasks();
  input.value = "";
}
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
renderTasks();
