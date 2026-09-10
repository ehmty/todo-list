import { Todo, Project } from "./app.js";

function saveData(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadData() {
    const projectsJSON = localStorage.getItem("projects");
    if (!projectsJSON) return null;
    
    return JSON.parse(projectsJSON);
}

function restoreProjects(savedProjects) {
    return savedProjects.map((projectData) => {
        const project = new Project(projectData.name, projectData.isDefault);

        projectData.todos.forEach(todoData => {
            const todo = new Todo(todoData.title, todoData.description, todoData.priority, todoData.dueDate, todoData.status);
            project.addTodo(todo);            
        });

        return project;
    });
}

export {saveData, loadData, restoreProjects };