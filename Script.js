const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Retrieve tasks from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTaskElement(taskText);
    saveTasksToLocalStorage();
    taskInput.value = "";
  }
}

function createTaskElement(taskText) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `<span>${taskText}</span>
                        <button class="edit" onclick="editTask(this)">Edit</button>
                        <button class="complete" onclick="completeTask(this)">Complete</button>`;
  taskItem.style.animation = "fadeIn 0.5s ease";
  taskList.appendChild(taskItem);
}

function editTask(button) {
  const taskItem = button.parentElement;
  const taskTextSpan = taskItem.querySelector("span");
  const taskText = taskTextSpan.textContent;
  const newText = prompt("Edit Task:", taskText);
  if (newText !== null) {
    taskTextSpan.textContent = newText;
    saveTasksToLocalStorage();
  }
}

function completeTask(button) {
  const taskItem = button.parentElement;
  taskItem.style.animation = "fadeOut 0.5s ease";
  taskItem.addEventListener("animationend", () => {
    taskItem.remove();
    saveTasksToLocalStorage();
  });
}

taskInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

taskList.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    if (event.target.classList.contains("edit")) {
      editTask(event.target);
    } else if (event.target.classList.contains("complete")) {
      completeTask(event.target);
    }
  }
});

function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(taskItem => {
    return taskItem.querySelector("span").textContent;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
