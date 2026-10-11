const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("tasks");

let todos = [];

async function fetchTodos() {
    try {
        const response = await fetch("http://localhost:3000/api/todos");
        todos = await response.json();
        renderTasks();
    } catch(error) {
        console.error("Failed to load todos from server: ", error);
    }
}

fetchTodos();

function renderTasks() {
    taskList.innerHTML = "";

    todos.forEach(function(todoText, index) {
        const li = document.createElement("li");
        li.classList.add("taskItem");
        li.textContent = todoText;

        const deleteBtn = document.createElement("a");
        deleteBtn.textContent = "delete";
        deleteBtn.style.color = "red";
        deleteBtn.style.fontStyle = "italic";

        deleteBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            todos.splice(index, 1);
            renderTasks();
        });

        li.addEventListener("click", function() {
            if(li.style.textDecoration === "line-through") {
                li.style.textDecoration = "none";
                li.style.fontStyle = "normal";
            } else {
                li.style.textDecoration = "line-through";
                li.style.fontStyle = "italic";
            }
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }); 
}

async function getTask() {
    const userInput = taskInput.value.trim();
    if(!userInput) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({task: userInput})
        });

        const data = await response.json();
        if(data.success) {
            todos = data.todos;
            renderTasks();
        }
    } catch(error) {
        console.error("Failed to save tasks to server: ", error);
    }

    taskInput.value = "";
    taskInput.focus();
}

document.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        getTask();
    }
}); 