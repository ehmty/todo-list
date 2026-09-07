class Todo {
    constructor(title, description, dueDate, priority, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.id = crypto.randomUUID();        
    }

    changeProperty(name, value) {
        this[name] = value;
    }

    toggleStatus() {
        this.status = this.status === "open" ? "done" : "open";
    }
}

class Project {
    constructor(name, isDefault = false) {
        this.name = name;
        this.todos = [];
        this.id = crypto.randomUUID();
        this.isDefault = isDefault;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}

class App {
    constructor() {
        this.projects = [new Project("default", true)];
    }

    addToDefaultProject(todo) {
        const defaultProject = this.projects.find(project => project.isDefault);
        defaultProject.addTodo(todo);
    }

    addToSpecificProject(todo, project) {
        if (this.projects.includes(project)) {
            project.addTodo(todo);
        }
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(id) {
        this.projects = this.projects.filter(project => project.isDefault || project.id !== id);
    }
}

export { Todo, Project, App };