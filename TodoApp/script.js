const todos = JSON.parse(localStorage.getItem("todos")) || [];
const todo = document.querySelector("#todo-content");
const btn = document.querySelector("#submitBtn");
const todoContainer = document.querySelector("#todo-container");

function deleteTodo(key) {
  todos.splice(key, 1);
  saveTodo();
  alert("Todo deleted successfully ✅");
  renderTodo();
}

function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editTodo(key) {
  const oldTodo = todoContainer.children[key];
  const oldText = todos[key];

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save todo";

  oldTodo.innerHTML = "";
  oldTodo.appendChild(input);
  oldTodo.appendChild(saveBtn);

  saveBtn.addEventListener("click", () => {
    const newText = input.value.trim();
    if (newText) {
      todos[key] = newText;
      saveTodo();
      alert("Todo Updated successfully ✅");
      renderTodo();
    }
  });
}

function renderTodo() {
  todoContainer.innerHTML = "";
  todos.forEach((text, index) => {
    const childTodo = document.createElement("div");
    const textNode = document.createElement("span");
    const btnDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    textNode.textContent = text;
    deleteBtn.innerText = "Delete";
    editBtn.innerText = "Edit";

    editBtn.addEventListener("click", () => editTodo(index));
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    childTodo.appendChild(textNode);
    childTodo.appendChild(btnDiv);

    todoContainer.appendChild(childTodo);
  });
}

function submitHandler(e) {
  e.preventDefault();
  if (!todo.value.trim()) {
    alert("Please enter a To-do");
    return;
  }
  todos.push(todo.value.trim());
  saveTodo();
  renderTodo();
  alert("Todo Created successfully ✅");
  console.log("Todo added:", todo.value);
  todo.value = "";
}

btn.addEventListener("click", submitHandler);

document.addEventListener("DOMContentLoaded", renderTodo);
