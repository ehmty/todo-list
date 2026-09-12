import "./style.css";
import { Todo, Project, App } from "./app.js";
import {
  showProjects,
  createProjectInput,
  showTodos,
  showProjectHeader,
  setActive,
} from "./dom.js";
import { saveData, loadData, restoreProjects } from "./storage.js";

const app = new App();
let isArchive = false;

const savedProjects = loadData();
if (savedProjects) {
  app.projects = restoreProjects(savedProjects);
  const defaultProject = app.projects.find((project) => project.isDefault);
  app.setCurrentProject(defaultProject.id);
}

function showCurrentProjectTodos() {
  const openTodos = app
    .getCurrentProject()
    .todos.filter((todo) => todo.status === "open");
  showTodos(openTodos);
}

showProjects(app.projects);
showCurrentProjectTodos();
showProjectHeader(app.getCurrentProject());
setActive(app.getCurrentProject().id);

const newProjectBtn = document.querySelector(".new-project-btn");
newProjectBtn.addEventListener("click", () => {
  const projectInput = createProjectInput();
  if (!projectInput) return;

  const { form, input } = projectInput;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    isArchive = false;
    todoForm.hidden = false;

    const projectName = input.value;
    const newProject = new Project(projectName);

    app.addProject(newProject);
    app.setCurrentProject(newProject.id);

    showProjects(app.projects);
    showCurrentProjectTodos();
    showProjectHeader(newProject);
    setActive(newProject.id);
    saveData(app.projects);
  });
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
  showCurrentProjectTodos();
  setActive(app.getCurrentProject().id);
  saveData(app.projects);

  todoForm.reset();
});

const buttonList = document.querySelector(".button-list");
buttonList.addEventListener("click", (e) => {
  const projectButton = e.target.closest(".sidebar-btn");
  if (!projectButton) return;

  isArchive = false;
  todoForm.hidden = false;

  const projectId = projectButton.dataset.id;
  const project = app.projects.find((project) => project.id === projectId);

  app.setCurrentProject(projectId);

  showCurrentProjectTodos();
  showProjectHeader(project);
  setActive(projectId);
});

const deleteBtn = document.querySelector(".delete-project-btn");
deleteBtn.addEventListener("click", () => {
  app.removeProject(app.getCurrentProject().id);

  const defaultProject = app.projects.find((project) => project.isDefault);
  app.setCurrentProject(defaultProject.id);

  showProjects(app.projects);
  showCurrentProjectTodos();
  showProjectHeader(defaultProject);
  setActive(defaultProject.id);
  saveData(app.projects);
});

const todoList = document.querySelector(".todo-list");
todoList.addEventListener("click", (e) => {
  if (isArchive) return;

  const todoStatusBtn = e.target.closest(".status");
  if (!todoStatusBtn) return;

  const todoCard = todoStatusBtn.closest(".todo-card");
  const todoId = todoCard.dataset.id;

  const todo = app.getCurrentProject().todos.find((todo) => todo.id === todoId);
  todo.toggleStatus();

  showProjects(app.projects);
  showCurrentProjectTodos();
  setActive(app.getCurrentProject().id);
  saveData(app.projects);
});

todoList.addEventListener("click", (e) => {
  if (isArchive) return;

  const todoStatusBtn = e.target.closest(".status");
  if (todoStatusBtn) return;

  const todoDetailsCard = e.target.closest(".todo-details");
  if (todoDetailsCard) return;

  const todoCard = e.target.closest(".todo-card");
  if (!todoCard) return;

  const todoDeleteBtn = e.target.closest(".todo-delete");
  if (todoDeleteBtn) return;

  const todoDetails = todoCard.querySelector(".todo-details");
  const todoDelete = todoCard.querySelector(".todo-delete");
  todoDetails.hidden = !todoDetails.hidden;
  todoDelete.hidden = !todoDelete.hidden;
});

todoList.addEventListener("click", (e) => {
  const saveBtn = e.target.closest(".save-btn");
  if (!saveBtn) return;

  const todoCard = saveBtn.closest(".todo-card");
  const todoId = todoCard.dataset.id;

  const title = todoCard.querySelector(".title-input").value;
  const description = todoCard.querySelector(".description").value;
  const priority = todoCard.querySelector(".priority-input").value;
  const dueDate = todoCard.querySelector(".due-date-input").value;

  const todo = app.getCurrentProject().todos.find((todo) => todo.id === todoId);
  todo.changeProperty("title", title);
  todo.changeProperty("description", description);
  todo.changeProperty("priority", priority);
  todo.changeProperty("dueDate", dueDate);

  showCurrentProjectTodos();
  saveData(app.projects);
});

todoList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".todo-delete");
  if (!deleteBtn) return;

  const todoCard = deleteBtn.closest(".todo-card");
  const todoId = todoCard.dataset.id;
  const project = app.projects.find((project) =>
    project.todos.some((todo) => todo.id === todoId),
  );
  project.removeTodo(todoId);

  if (isArchive) {
    showTodos(app.getArchiveTodos());
  } else {
    showCurrentProjectTodos();
    setActive(app.getCurrentProject().id);
  }

  showProjects(app.projects);
  saveData(app.projects);
});

const archiveBtn = document.querySelector(".archive-btn");
archiveBtn.addEventListener("click", () => {
  isArchive = true;

  const archiveTodos = app.getArchiveTodos();

  showTodos(archiveTodos);
  showProjectHeader({ name: "Archive", isDefault: true });
  setActive("archive");

  todoForm.hidden = true;
});
