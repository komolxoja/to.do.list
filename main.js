let inputEle = document.querySelector(".input");
let submitEle = document.querySelector(".add-button");
let tasksDiv = document.querySelector(".tasks")
let containerDiv = document.querySelector(".container")
let deleteAll = document.querySelector(".delete-button");
let arrayOfTasks =[];

if(window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
getTaskFromLocalStorage();


submitEle.onclick = function() {
    if(inputEle.value !== "") {
        addTaskToArray(inputEle.value);
        inputEle.value ="";
    }
}

function addTaskToArray (taskText) {
    const task = {
        id : Date.now(),
        title : taskText,
        complated : false,
    };
    arrayOfTasks.push(task);
    addTaskToPage(arrayOfTasks);

    addTaskToLocalStorage(arrayOfTasks);
}

function addTaskToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";

    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if(task.complated){
            div.className = "task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span);
        tasksDiv.appendChild(div)
        
    });
}
function addTaskToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";
  
    arrayOfTasks.forEach((task) => {
      let div = document.createElement("div");
      div.className = "task";
      if (task.completed) {
        div.className = "task done";
      }
      div.setAttribute("data-id", task.id);
      div.appendChild(document.createTextNode(task.title));
      let span = document.createElement("span");
      span.className = "del";
      span.appendChild(document.createTextNode("Delete"));
      div.appendChild(span);
  
      let editSpan = document.createElement("span");
      editSpan.className = "edit";
      editSpan.appendChild(document.createTextNode("Edit"));
      div.appendChild(editSpan);
  
      tasksDiv.appendChild(div);
    });
  
    let editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        let taskDiv = button.parentElement;
        let taskText = taskDiv.firstChild.nodeValue;
        let input = document.createElement('input');
        input.type = 'text';
        input.value = taskText;
        taskDiv.replaceChild(input, taskDiv.firstChild);
  
        let saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        taskDiv.appendChild(saveButton);
  
        saveButton.addEventListener('click', () => {
          let newTaskText = input.value;
          let newTask = {
            id: taskDiv.getAttribute('data-id'),
            title: newTaskText,
            completed: false
          };
  
          let index = arrayOfTasks.findIndex((task) => task.id === newTask.id);
          arrayOfTasks[index] = newTask;
  
          taskDiv.removeChild(input);
          taskDiv.removeChild(saveButton);
          taskDiv.firstChild.nodeValue = newTaskText;
        });
      });
    });
  }
  


function addTaskToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}
function getTaskFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data);
        addTaskToPage(tasks);
    }
}

function addElementsToPageFrom(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
}


tasksDiv.onclick = ((e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    }
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        updateStatusInLocalStorage(e.target.getAttribute("data-id"));
    }
})


function deleteTaskFromLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTaskToLocalStorage(arrayOfTasks);
}
function updateStatusInLocalStorage(taskId) {
    arrayOfTasks.forEach((task) =>{
        if(task.id == taskId)
            task.complated == false ? task.complated = true:task.complated = false;
    });

    addTaskToLocalStorage(arrayOfTasks);
}

deleteAll.onclick = function(e){
    tasksDiv.innerHTML = "";
    window.localStorage.removeItem("tasks")
}




