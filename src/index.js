import "./style.css"
import { Todo, Project, App } from "./app.js"
import { showProjects, createInput } from "./dom.js";

const app = new App();
const projects = app.projects;
showProjects(projects);

const newProjectBtn = document.querySelector(".new-project-btn");
newProjectBtn.addEventListener("click", () => {
    const {form, input} = createInput();

    form.addEventListener("submit", e => {
        e.preventDefault();

        const newProject = new Project(input.value);
        app.addProject(newProject);
        showProjects(projects);
    })

});