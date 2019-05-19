const addBtn = document.querySelector('form button');
const inputTask = document.querySelector('input');
const ul = document.querySelector('.task-holder ul');
let taskLiPosition = 21;
const colors = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsis', 'lime', 'teal', 'aqua', 'blue', 'navy', 'silver', 'white'];
const toDoList = [];
//Add a task!

const addTask = (e) => {
    e.preventDefault();
    if (!inputTask.value) {
        alert("Add task content!");
        return
    };
    const newLi = document.createElement('li');
    const removeDiv = document.createElement('div');
    newLi.className = 'task';
    toDoList.push(newLi);
    renderList();
    ul.appendChild(newLi);
    newLi.textContent = inputTask.value;
    newLi.appendChild(removeDiv);
    removeDiv.className = 'remove';
    newLi.style.top = `${taskLiPosition}vh`;
    newLi.style.border = `2px solid ${colors[Math.floor(Math.random()*colors.length)]}`
    taskLiPosition++;
    inputTask.value = '';

    //move the task!

    let drawActive = false;
    let insertLiX;
    let insertLiY;
    newLi.addEventListener('mousedown', (e) => {
        e.preventDefault();
        newLi.style.backgroundColor = "black";
        drawActive = !drawActive;
        insertLiX = e.offsetX;
        insertLiY = e.offsetY;
    });

    newLi.addEventListener('mousemove', (e) => {
        if (drawActive) {
            e.preventDefault();
            let divX = e.clientX - insertLiX;
            let divY = e.clientY - insertLiY;
            newLi.style.left = `${divX}px`;
            newLi.style.top = `${divY}px`;
        }
    })
    newLi.addEventListener('mouseup', (e) => {
        e.preventDefault();
        newLi.style.backgroundColor = "#303f42";
        drawActive = !drawActive;

    })

    //remove the task!

    const removeTask = (e) => {
        e.target.parentNode.remove();
        const index = e.target.parentNode.dataset.key;
        toDoList.splice(index, 1)
        renderList();
    }
    removeDiv.addEventListener('click', removeTask);
};
const renderList = () => {
    ul.textContent = "";
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ul.appendChild(toDoElement);
    })
}

addBtn.addEventListener('click', addTask);

//search the task, highlight the right one
const searchInput = document.querySelector('.search');
const liElements = document.querySelectorAll('li');
const searchTask = (e) => {
    const searchText = e.target.value.toLowerCase();
    toDoList.forEach((li, index) => {
        if (!searchText) {
            toDoList[index].style.boxShadow = "";
        } else if (li.textContent.toLowerCase().includes(searchText)) {
            toDoList[index].style.boxShadow = `3px 2px 19px 10px ${toDoList[index].style.borderColor}`;
        } else if (!li.textContent.toLowerCase().includes(searchText)) {
            toDoList[index].style.boxShadow = "";
        }
    })
}
searchInput.addEventListener('input', searchTask);