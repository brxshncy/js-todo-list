// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Even Listeners
document.addEventListener('DOMContentLoaded',getTodos());
todoBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('change',filterTodo);

// Function
function addTodo(e){
    e.preventDefault();

    //create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo-div");

    //create todo <li>
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // Save to local storage
    saveLocalTodos(todoInput.value);

    //Append list to todo div
    todoDiv.appendChild(newTodo);

    //create buttons
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');

     //Append completeBtn to todo div
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');

    //Append trashBtn to todo div
    todoDiv.appendChild(trashBtn);

    //Append to List
    todoList.appendChild(todoDiv);

    todoInput.value = '';
}
function deleteCheck(e){
    const item = e.target;

    //DELETE TODO 
    if(item.classList[0] === 'trash-btn'){
        item.parentElement.classList.add('fall');
        removeLocalTodos(item.parentElement);
        todoList.addEventListener('transitionend',function(){
            item.parentElement.remove();
        });
       // item.parentElement.remove();
    }

    else if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display ='flex';
                break;
            case "complete":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    // Check record on local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         //create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo-div");

    //create todo <li>
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');

    // Save to local storage

    //Append list to todo div
    todoDiv.appendChild(newTodo);

    //create buttons
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');

     //Append completeBtn to todo div
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');

    //Append trashBtn to todo div
    todoDiv.appendChild(trashBtn);

    //Append to List
    todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}