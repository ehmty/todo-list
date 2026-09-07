function showProjects(projects) {
    const sidebar = document.querySelector(".button-list");
    sidebar.textContent = "";

    for (const project of projects) {
        const projectButton = document.createElement("button");
        const span = document.createElement("span");

        projectButton.textContent = project.name;
        span.textContent = project.todos.length;

        projectButton.classList.add("sidebar-btn");

        projectButton.append(span);
        sidebar.append(projectButton);
    }
}

export { showProjects };