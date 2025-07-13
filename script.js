document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(taskText = "") {
  let input = document.getElementById("taskInput");
  let task = taskText || input.value.trim();
  if (task) {
    let list = document.getElementById("taskList");
    let li = document.createElement("li");
    li.draggable = true; // Membuat item bisa di-drag

    let span = document.createElement("span");
    span.textContent = task;

    // Event Drag & Drop
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);

    // Tombol Edit
    let editButton = document.createElement("button");
    editButton.textContent = "✏️ Edit";
    editButton.onclick = function () {
      let newTask = prompt("Edit tugas:", span.textContent);
      if (newTask) {
        span.textContent = newTask;
        saveTasks();
      }
    };

    // Tombol Hapus
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "❌ Hapus";
    deleteButton.onclick = function () {
      li.remove();
      saveTasks();
    };

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);

    saveTasks();
    input.value = "";
  }
}

// Simpan data ke Local Storage
function saveTasks() {
  let tasks = [];
  document
    .querySelectorAll("#taskList li span")
    .forEach((span) => tasks.push(span.textContent));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Memuat tugas yang tersimpan
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task) => addTask(task));
}

// Drag & Drop Functions
let draggedItem = null;

function handleDragStart(event) {
  draggedItem = event.target;
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  if (draggedItem !== event.target) {
    let list = document.getElementById("taskList");
    let tasks = Array.from(list.children);

    let draggedIndex = tasks.indexOf(draggedItem);
    let dropIndex = tasks.indexOf(event.target);

    list.insertBefore(
      draggedItem,
      dropIndex > draggedIndex ? event.target.nextSibling : event.target
    );
    saveTasks();
  }
}
