const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

// Add todo
addBtn.addEventListener('click', () => {
  if (input.value.trim() === '') return;
  todos.push({ text: input.value, completed: false });
  input.value = '';
  saveAndRender();
});

// Click todo
todoList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const index = li.dataset.index;

  if (e.target.tagName === 'BUTTON') {
    todos.splice(index, 1); // ❌ delete
  } else if (e.target.tagName === 'SPAN') {
    todos[index].completed = !todos[index].completed;
  }
  saveAndRender();
});


function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) span.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.style.border = 'none';
    delBtn.style.background = 'transparent';
    delBtn.style.cursor = 'pointer';

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

