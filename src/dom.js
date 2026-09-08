function showProjects(projects) {
    const sidebar = document.querySelector(".button-list");
    sidebar.textContent = "";

    for (const project of projects) {
        const projectButton = document.createElement("button");
        const span = document.createElement("span");

        projectButton.textContent = project.isDefault ? "Inbox" : project.name;
        span.textContent = project.todos.length;

        projectButton.classList.add("sidebar-btn");

        projectButton.append(span);
        sidebar.append(projectButton);
    }
}

function createInput() {
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

export { showProjects, createInput };