console.log("conectado");

const formulario = document.querySelector("#formulario");
const pintarTodo = document.querySelector("#pintarTodo");
const templateTodo = document.querySelector("#templateTodo").content;

const alert = document.querySelector(".alert");
const todoInput = document.getElementById("todoInput");

let todos = [];

const agregarTodo = (todo) => {
  const objetoTodo = {
    nombre: todo,
    id: `${Date.now()}`,
  };

  todos.push(objetoTodo);
};

const pintarTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));

  pintarTodo.textContent = "";

  const fragment = document.createDocumentFragment();

  todos.forEach((item) => {
    const clone = templateTodo.cloneNode(true);
    clone.querySelector(".lead").textContent = item.nombre;
    clone.querySelector(".btn").dataset.id = item.id;

    fragment.appendChild(clone);
  });
  pintarTodo.appendChild(fragment);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-danger")) {
    todos = todos.filter((item) => item.id !== e.target.dataset.id);
    pintarTodos();
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");

  const data = new FormData(formulario);
  const [todo] = [...data.values()];

  //validacion campos vacios
  if (!todo.trim()) {
    console.log("te equivocaste");
    alert.classList.remove("d-none");
    return;
  }
  todoInput.value = "";
  agregarTodo(todo);
  pintarTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    pintarTodos(todos);
  }
});
