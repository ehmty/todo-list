class Todo {
    constructor(title, description, priority, dueDate, status) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
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
        const defaultProject = new Project("Inbox", true);
        this.projects = [defaultProject];
        this.currentProjectId = defaultProject.id;
    }

    getCurrentProject() {
        return this.projects.find(project => this.currentProjectId === project.id);
    }

    setCurrentProject(id) {
        this.currentProjectId = id;
    }

    addToCurrentProject(todo) {
        const currentProject = this.getCurrentProject();
        currentProject.addTodo(todo);
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(id) {
        this.projects = this.projects.filter(project => project.isDefault || project.id !== id);
    }
}

export { Todo, Project, App };