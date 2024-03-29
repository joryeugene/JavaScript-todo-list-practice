// Jory Pestorious

var todoList = {
 todos: [],
 displayTodos: function() {
   view.displayTodos();
 },
 addTodo: function(todoText) {
   this.todos.push({
     todoText: todoText,
     completed: false
   });
   this.displayTodos();
 },
 changeTodo: function(position, todoText) {
   this.todos[position-1].todoText = todoText;
   this.displayTodos();
 },
 deleteTodo: function(position) {
   this.todos.splice(position, 1);
   this.displayTodos();
 },
 toggleCompleted: function(position) {
   var todo = this.todos[position-1];
   todo.completed = !todo.completed;
   this.displayTodos();
 },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo) {
      if(todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
    this.displayTodos();
  }
};

var handlers = {
  toggleAll: function() {
   todoList.toggleAll();
  },
  toggleCompleted: function() {
    var deleteOrToggleInput = document.getElementById('deleteOrToggleInput');
    todoList.toggleCompleted(deleteOrToggleInput.valueAsNumber);
    deleteOrToggleInput.value = '';
  },
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoText');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    addTodoTextInput.focus();
    // center text in input box
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion + '  ';
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        todoList.deleteTodo(elementClicked.parentNode.id);
      }
    });
  }
};

view.setUpEventListeners();
