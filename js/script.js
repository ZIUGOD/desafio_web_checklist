const taskInput = document.querySelector(".task-input input"),
filters         = document.querySelectorAll(".filters span"),
clearAll        = document.querySelector(".clear-btn"),
taskBox         = document.querySelector(".task-box");

let editId,
isEditTask = false,
tarefas    = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = ""; // tag a completar com o valor da nova task

    if (tarefas) {
        tarefas.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";

            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p>${id + 1})</p>
                                <p class="${completed}">${todo.name}</p>
                            </label>

                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`; // Fazendo um "append" na pagina com a nova tarefa
            }
        });
    }
    taskBox.innerHTML = liTag; // retornando a task criada

    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");

    // console.log(liTag);
}

showTodo("all");

function showMenu(selected_task) {
    let menuDiv = selected_task.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {

        if(e.target.tagName != "I" || e.target != selected_task) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selected_task) {
    let taskName = selected_task.parentElement.lastElementChild;

    if (selected_task.checked) {
        taskName.classList.add("checked");
        tarefas[selected_task.id].status = "completed";
    } 
    else {
        taskName.classList.remove("checked");
        tarefas[selected_task.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(tarefas))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
    console.log(`Task ${taskId + 1} começou a ser editada`);
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    tarefas.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(tarefas));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    tarefas.splice(0, tarefas.length);
    localStorage.setItem("todo-list", JSON.stringify(tarefas));
    showTodo()
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();

    if (e.key == "Enter" && userTask) {

        if (!isEditTask) {
            tarefas = !tarefas ? [] : tarefas;
            let taskInfo = {name: userTask, status: "pending"};
            tarefas.push(taskInfo);
        } 
        else {
            isEditTask = false;
            tarefas[editId].name = userTask;
        }

        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(tarefas));
        showTodo(document.querySelector("span.active").id);
    }
});