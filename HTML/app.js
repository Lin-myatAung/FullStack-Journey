const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("tasks");

let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
renderTasks();

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
            saveAndRender();
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

function saveAndRender() {
    localStorage.setItem("myTodos", JSON.stringify(todos));
    renderTasks();
}

function getTask() {
    const userInput = taskInput.value.trim();
    if(!userInput) {
        return;
    }

    todos.push(userInput);
    saveAndRender();
    taskInput.value = "";
}

document.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        getTask();
    }
}); 