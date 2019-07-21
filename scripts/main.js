const addBtn = document.querySelector("form button");
const inputTask = document.querySelector("input");
const ul = document.querySelector(".task-holder ul");
let taskLiPositionTop = 0;
window.onload = () => {
  window.innerWidth < 700 ? (taskLiPositionTop = 0) : (taskLiPositionTop = 15);
};
const colors = [
  "maroon",
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "purple",
  "fuchsis",
  "lime",
  "teal",
  "aqua",
  "blue",
  "navy",
  "silver",
  "white"
];
const toDoList = [];
//Add a task!

const addTask = e => {
  e.preventDefault();
  if (!inputTask.value) {
    alert("Add task content!");
    return;
  }
  const newLi = document.createElement("li");
  const removeDiv = document.createElement("div");
  newLi.className = "task";
  toDoList.push(newLi);
  renderList();
  ul.appendChild(newLi);
  newLi.textContent = inputTask.value;
  newLi.appendChild(removeDiv);
  removeDiv.className = "remove";
  newLi.style.top = `${taskLiPositionTop}vh`;
  newLi.style.border = `2px solid ${
    colors[Math.floor(Math.random() * colors.length)]
  }`;
  taskLiPositionTop += 2;
  inputTask.value = "";

  //move the task!

  newLi.addEventListener("mousedown", e => {
    let shiftX = e.clientX - newLi.getBoundingClientRect().left;
    let shiftY = e.clientY - newLi.getBoundingClientRect().top;

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
      newLi.style.left = pageX - shiftX + "px";
      newLi.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    newLi.onmouseup = function() {
      document.removeEventListener("mousemove", onMouseMove);
      newLi.onmouseup = null;
    };
  });

  newLi.ondragstart = function() {
    return false;
  };

  //remove the task!

  const removeTask = e => {
    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1);
    renderList();
    taskLiPositionTop -= 2;
  };
  removeDiv.addEventListener("click", removeTask);
};
const renderList = () => {
  ul.textContent = "";
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    ul.appendChild(toDoElement);
  });
};

addBtn.addEventListener("click", addTask);

//search the task, highlight the right one
const searchInput = document.querySelector(".search");
const liElements = document.querySelectorAll("li");
const searchTask = e => {
  const searchText = e.target.value.toLowerCase();
  toDoList.forEach((li, index) => {
    if (!searchText) {
      toDoList[index].style.boxShadow = "";
    } else if (li.textContent.toLowerCase().includes(searchText)) {
      toDoList[index].style.boxShadow = `3px 2px 19px 10px ${
        toDoList[index].style.borderColor
      }`;
    } else if (!li.textContent.toLowerCase().includes(searchText)) {
      toDoList[index].style.boxShadow = "";
    }
  });
};
searchInput.addEventListener("input", searchTask);
