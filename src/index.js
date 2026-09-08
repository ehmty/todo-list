import "./style.css"
import { Todo, Project, App } from "./app.js"
import { showProjects, createProjectInput, showTodos } from "./dom.js";

const app = new App();
const projects = app.projects;
const todos = projects[0].todos;

showProjects(projects);
showTodos(todos);

const newProjectBtn = document.querySelector(".new-project-btn");
newProjectBtn.addEventListener("click", () => {
    const {form, input} = createProjectInput();

    form.addEventListener("submit", e => {
        e.preventDefault();

        const newProject = new Project(input.value);
        app.addProject(newProject);
        showProjects(projects);
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

    const todo = new Todo(title, description, priority, dueDate, status)
    app.addToDefaultProject(todo);
    showTodos(todos);

    todoForm.reset();
    
});