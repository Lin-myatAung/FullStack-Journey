const taskInput = document.getElementById("taskInput");
const tasks = document.getElementById("tasks");

function getTask() {
    const userInput = taskInput.value.trim();
    if(!userInput) {
        return;
    }

    const li = document.createElement("li");
    li.classList.add("taskItem");
    li.textContent = userInput;
    li.style.userSelect = "none";

    const deleteBtn = document.createElement("a");
    deleteBtn.textContent = "delete";
    deleteBtn.style.color = "red";
    deleteBtn.style.fontStyle = "italic";

    li.addEventListener("click", function() {
        if(li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
            li.style.fontStyle = "normal";
        } else {    
            li.style.textDecoration = "line-through";
            li.style.fontStyle = "italic";
        }
    })

    deleteBtn.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(deleteBtn);
    tasks.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
}

document.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        getTask();
    }
});