const btnAddTask = document.querySelector(".app__button--add-task");
const form = document.querySelector(".app__form-add-task");
const formTextArea = document.querySelector(".app__form-textarea");
const ulTasks = document.querySelector(".app__section-task-list");
const paragraphOnGoingTask = document.querySelector(
  ".app__section-active-task-description"
);
const btnRemoveComplete = document.getElementById("btn-remover-concluidas");
const btnRemoveAll = document.getElementById("btn-remover-todas");

let selectedTask = null; //isso é para dizer pro js que a task pode ser selecionada
let liselectedTask = null; //isso é para dizer pro js que a li da task pode ser selecionada

let tasksArray = JSON.parse(localStorage.getItem("tasks") || []);

btnAddTask.onclick = (event) => {
  event.preventDefault();
  form.classList.toggle("hidden");
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = { description: formTextArea.value };
  tasksArray.push(task);
  updateTasks();
  const liElement = createTask(task);
  ulTasks.append(liElement);
  formTextArea.value = "";
  form.classList.add("hidden");
});

function createTask(task) {
  const li = document.createElement("li");
  li.className = "app__section-task-list-item";
  const div = document.createElement("div");
  div.innerHTML = ` <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
  <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
  </svg>`;
  const p = document.createElement("p");
  p.className = "app__section-task-list-item-description";
  p.textContent = task.description;
  const btn = document.createElement("button");
  btn.className = "app_button-edit";
  const btnImg = document.createElement("img");
  btnImg.src = "imagens/edit.png";

  btn.onclick = () => {
    const taskNewNAme = prompt("qual o novo nome");
    if (!taskNewNAme) {
      alert("Insert a valid name");
      return;
    } else {
      p.textContent = taskNewNAme;
      task.description = taskNewNAme;
      updateTasks();
    }
  };

  btn.append(btnImg);
  li.append(div, p, btn);

  if (task.complete) {
    li.classList.add("app__section-task-list-item-complete");
    btn.setAttribute("disabled", true);
  } else {
    li.onclick = () => {
      ulTasks.querySelectorAll(".app__section-task-list-item").forEach((li) => {
        li.classList.remove("app__section-task-list-item-active");
      });
      if (selectedTask == task) {
        paragraphOnGoingTask.textContent = "";
        li.classList.remove("app__section-task-list-item-active");
        selectedTask = null;
        liselectedTask = null;
        return;
      }
      selectedTask = task; //aqui eu to dizendo que a task selecionada é a task que foi criada nesta grande babilônia que virou esse createTask
      liselectedTask = li; //aqui eu to dizendo que a li selecionada é a li
      paragraphOnGoingTask.textContent = p.textContent;
      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}

tasksArray.forEach((task) => {
  ulTasks.append(createTask(task));
});

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

document.addEventListener("taskComplete", () => {
  if (selectedTask && liselectedTask) {
    liselectedTask.classList.remove("app__section-task-list-item-active");
    liselectedTask.classList.add("app__section-task-list-item-complete");
    liselectedTask.querySelector("button").setAttribute("disabled", true);
    selectedTask.complete = true;
    updateTasks();
  }
});

const removeTasks = (onlyCompletedQmark) => {
  const selector = onlyCompletedQmark
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  ulTasks.querySelectorAll(selector).forEach((li) => {
    li.remove();
  });
  tasksArray = onlyCompletedQmark
    ? tasksArray.filter((task) => !task.complete)
    : [];
  updateTasks();
};

btnRemoveComplete.onclick = () => removeTasks(true);
btnRemoveAll.onclick = () => removeTasks(false);
