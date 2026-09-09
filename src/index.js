import "./style.css"
import { Todo, Project, App } from "./app.js"
import { showProjects, createProjectInput, showTodos, showProjectHeader, setActive } from "./dom.js";

const app = new App();
showProjects(app.projects);
showTodos(app.getCurrentProject().todos);
showProjectHeader(app.getCurrentProject());
setActive(app.getCurrentProject().id);

const newProjectBtn = document.querySelector(".new-project-btn");
newProjectBtn.addEventListener("click", () => {
    const {form, input} = createProjectInput();

    form.addEventListener("submit", e => {
        e.preventDefault();

        const projectName = input.value;
        const newProject = new Project(projectName);

        app.addProject(newProject);
        app.setCurrentProject(newProject.id);

        showProjects(app.projects);
        showTodos(app.getCurrentProject().todos);
        showProjectHeader(newProject);
        setActive(newProject.id);
    })

});

const todoForm = document.querySelector(".todo-input-bar");
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(todoForm);
    const title = formData.get("title");
    const description = "";
    const priority = formData.get("priority");
    const dueDate = formData.get("due-date");
    const status = "open";

    const todo = new Todo(title, description, priority, dueDate, status);
    app.addToCurrentProject(todo);

    showProjects(app.projects);
    showTodos(app.getCurrentProject().todos);

    todoForm.reset();
    
});

const buttonList = document.querySelector(".button-list");
buttonList.addEventListener("click", e => {
    const projectButton = e.target.closest(".sidebar-btn");
    if (!projectButton) return;

    const projectId = projectButton.dataset.id;
    const project = app.projects.find(project => project.id === projectId);
    
    app.setCurrentProject(projectId);

    showTodos(app.getCurrentProject().todos);
    showProjectHeader(project);
    setActive(projectId);
});


const deleteBtn = document.querySelector(".delete-project-btn");
deleteBtn.addEventListener("click", () => {
    app.removeProject(app.getCurrentProject().id);

    const defaultProject = app.projects.find((project) => project.isDefault);
    app.setCurrentProject(defaultProject.id);

    showProjects(app.projects);
    showTodos(app.getCurrentProject().todos);
    showProjectHeader(defaultProject);
    setActive(defaultProject.id);
});