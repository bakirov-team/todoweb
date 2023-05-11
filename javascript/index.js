const form = document.querySelector(".title_desc");
const todo = document.querySelector(".todos");
const cancel = document.querySelector(".cancel");
const addTask = document.querySelector(".add_task");
const activeTask = document.querySelector(".add_tasks");
const todosCreate = document.querySelector(".todos");
const modal = document.querySelector(".modal");
const addTodo = document.querySelector(".add_btn");


// Add todos input textarea
function addTodos() {
  addTodo.addEventListener("click", (e) => {
    e.preventDefault();
    activeTask.classList.toggle("active");
    let title = document.querySelector(".task_name").value;
    let desc = document.querySelector("textarea").value;

    if (title.length && desc.length) {
      todos.push({
        title: title,
        desc: desc,
        date: getTime(),
        completed: false,
      });
      setTodos();
      showTodos();
      console.log(todos);
    } else {
      console.log("error");
    }
  });
}




// Click btn add end cancel
function addCancel(){
  addTask.addEventListener("click", () => {
    activeTask.classList.toggle("active");
    form.reset();
  });

  // Key ESC cancel
  document.addEventListener("keyup", (e) => {
    if (e.keyCode == 27) {
      if (activeTask.classList.add("active")) {
        console.log("bor");
      } else {
        console.log("yoq");
      }
    }
  });
  cancel.addEventListener("click", (e) => {
    e.preventDefault();
    activeTask.classList.toggle("active");
    form.reset();
  });
}

// local
let todos = JSON.parse(localStorage.getItem("todos"))
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
if (todos.length) showTodos();

function setTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Time
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  return `${date}.${month}.${year}`;
}
getTime();

// Show todos
function showTodos() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todo.innerHTML = "";
  todos.forEach((item, i) => {
    todo.innerHTML += `
      <div class="todo_list">
        <div class="line"></div>
        <div class="todo_info">
          <div class="info">
            <p class="title">${item.title}</p>
            <p class="desc">${item.desc}</p>
            <div class="todo_date">
              <i class="fa-regular fa-calendar-days"></i>
              <span>${item.date}</span>
            </div>  
          </div>
          <div class="todo_box">
            <p>Inbox <i class="fa-solid fa-inbox"></i></p>
            <div class="edit_delete">
              <i class="fa-solid fa-pen" onclick=(edit())></i>
              <i class="fa-solid fa-trash" onclick=(deleteTodo(${i}))></i>
              <i class="fa-solid fa-ellipsis"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}



// Delete todo
function deleteTodo(id){
  const deletedTodo = todos.filter((item, i)=>{
    return i !== id
  })
  todos = deletedTodo
  showTodos()
  setTodos()

}



addTodos();
addCancel();