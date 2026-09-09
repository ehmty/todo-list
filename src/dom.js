function showProjects(projects) {
    const sidebar = document.querySelector(".button-list");
    sidebar.textContent = "";

    for (const project of projects) {
        const projectButton = document.createElement("button");
        const span = document.createElement("span");

        projectButton.textContent = project.name;
        span.textContent = project.todos.length;

        projectButton.classList.add("sidebar-btn");
        projectButton.dataset.id = project.id;

        projectButton.append(span);
        sidebar.append(projectButton);
    }
}

function createProjectInput() {
    const sidebar = document.querySelector(".button-list");
    const form = document.createElement("form");

    const existingInput = document.querySelector(".input");
    if (existingInput) {
        existingInput.focus();
        return existingInput;
    }

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("input");
    input.required = true;

    form.append(input);
    sidebar.append(form);

    input.focus();

    return {form, input};
}

function showTodos(todos) {
    const todoList = document.querySelector(".todo-list");
    todoList.textContent = "";
    
    for (const todo of todos) {
        const todoCard = document.createElement("div");
        
        const todoStatus = document.createElement("button");
        const todoInfo = document.createElement("div");
        const todoTitle = document.createElement("h3");
        const todoPriority = document.createElement("div");
        const todoDueDate = document.createElement("div");
        
        todoCard.classList.add("todo-card");
        todoStatus.classList.add("status");
        todoInfo.classList.add("todo-info");
        todoTitle.classList.add("title");
        todoPriority.classList.add("priority", todo.priority);
        todoDueDate.classList.add("due-date");
        
        todoTitle.textContent = todo.title;
        todoPriority.textContent = todo.priority;
        todoDueDate.textContent = todo.dueDate;
        
        todoInfo.append(todoTitle);
        todoCard.append(todoStatus, todoInfo, todoPriority, todoDueDate);
        todoList.append(todoCard);
    }
   
}

function showProjectHeader(project) {
    const header = document.querySelector(".header h1");
    const deleteBtn = document.querySelector(".delete-project-btn");
    header.textContent = project.name;
    deleteBtn.hidden = project.isDefault;
}

function setActive(projectId) {
    const currentActiveButton = document.querySelector(".active")
    if (currentActiveButton) {
        currentActiveButton.classList.remove("active");
    }

    const projectButton = document.querySelector(`.sidebar-btn[data-id="${projectId}"]`);
    projectButton.classList.add("active");
}

export { showProjects, createProjectInput, showTodos, showProjectHeader, setActive };