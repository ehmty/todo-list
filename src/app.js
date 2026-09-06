class Todo {
    constructor(title, description, dueDate, priority, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
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
        this.defaultProject = new Project("default");
        this.projects = [this.defaultProject]
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        const projectIndex = this.projects.findIndex(item => item === project);
        if (projectIndex !== -1) {
            this.projects.splice(projectIndex, 1);
        }
    }
}