const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    displayTasks();

    taskInput.value = "";
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const doneBtn = document.createElement("button");
        doneBtn.textContent = task.completed ? "Undo" : "Done";
        doneBtn.classList.add("done-btn");

        doneBtn.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        buttons.appendChild(doneBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}