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
        return;
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
        const todoTitle = document.createElement("h3");
        const todoPriority = document.createElement("div");
        const todoDueDate = document.createElement("div");
        
        todoCard.classList.add("todo-card");
        todoStatus.classList.add("status");
        todoTitle.classList.add("title");
        todoPriority.classList.add("priority", todo.priority);
        todoDueDate.classList.add("due-date");
        
        todoCard.dataset.id = todo.id;

        todoTitle.textContent = todo.title;
        todoPriority.textContent = todo.priority;
        todoDueDate.textContent = todo.dueDate;

        todoCard.append(todoStatus, todoTitle, todoPriority, todoDueDate);

        const todoDetails = document.createElement("div");
        todoDetails.hidden = true;

        const todoTitleInput = document.createElement("input");
        const todoDescription = document.createElement("textarea");
        const todoPrioritySelect = document.createElement("select");
        const todoDueDateInput = document.createElement("input");
        const todoSaveBtn = document.createElement("button");
        
        const lowOption = document.createElement("option");
        const mediumOption = document.createElement("option");
        const highOption = document.createElement("option");
        
        todoDetails.classList.add("todo-details");
        todoTitleInput.classList.add("title-input");
        todoDescription.classList.add("description");
        todoPrioritySelect.classList.add("priority-input");
        todoDueDateInput.classList.add("due-date-input");
        todoSaveBtn.classList.add("save-btn");        
        
        lowOption.value = "low";
        lowOption.textContent = "low";
        mediumOption.value = "medium";
        mediumOption.textContent = "medium";
        highOption.value = "high";
        highOption.textContent = "high";
        
        todoPrioritySelect.append(lowOption, mediumOption, highOption);

        todoPrioritySelect.value = todo.priority;
        todoTitleInput.value = todo.title;
        todoDescription.value = todo.description;
        todoDescription.placeholder = "Add a description...";
        todoDueDateInput.type = "date";
        todoDueDateInput.value = todo.dueDate;
        todoSaveBtn.textContent = "Save";

        todoDetails.append(todoTitleInput, todoDescription, todoPrioritySelect, todoDueDateInput, todoSaveBtn);

        todoCard.append(todoDetails);
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