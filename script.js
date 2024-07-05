const toDoForm = document.getElementById('todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let toDos = [];

function saveTodos(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteBtn(event){
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== li.id);
}

function paintTodo(newTodo){
  const li = document.createElement('li');
  li.id = newTodo.id;
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const button = document.createElement('button')
  button.innerText = '✖';
  button.addEventListener('click',deleteBtn)
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToSubmit(event){
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id : Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
 }

toDoForm.addEventListener('submit',handleToSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
  const parsedTodos = JSON.parse(savedTodos);
  toDos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

/*
function sayHello(item){
  console.log('this is the turn of ', item)
}
*/