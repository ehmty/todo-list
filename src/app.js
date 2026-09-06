class Todo {
    constructor(title, description, dueDate, priority, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    toggleStatus() {
        this.status = this.status === "open" ? "done" : "open";
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        const todoIndex = this.todos.findIndex(item => item === todo);
        if (todoIndex !== -1) {
            this.todos.splice(todoIndex, 1);
        }
    }
}

class App {
    constructor() {
        this.projects = [new Project("default")]
    }

    addToDefaultProject(todo) {
        this.projects[0].addTodo(todo);
    }

    addToSpecificProject(todo, project) {
        if (this.projects.includes(project)) {
            project.addTodo(todo);
        }
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        const projectIndex = this.projects.findIndex(item => item === project);
        if (projectIndex !== -1 && project !== this.projects[0]) {
            this.projects.splice(projectIndex, 1);
        }
    }
}