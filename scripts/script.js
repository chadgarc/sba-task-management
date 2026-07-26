
const status = ["Start", "In progress", "Completed", "Overdue"];

const containerStructure = ["task-container", "taskTitle", "taskCategory", "taskDeadline", "progressBox", "task-progress-ball", "taskStatus"];

const taskList = new Array();

// I create my object constructor
function task(taskTitle, category, deadline, status){
    this.taskTitle = taskTitle;
    this.category = category;
    this.deadline = deadline;
    this.status = status;
}

let tasks = new Array();

function createTaskContainer(taskTitle, category, deadline){
    
    // First I create a container
    const container = document.createElement("section");
    
    // I'll add a common class name for this and future containers, so they all share
    // the same css configuration
    // I'll use the method classList and add because I want to add some bootstrap from
    // the beginning
    container.classList.add(containerStructure[0], "d-flex", "flex-column", "justify-content-center", "p-2", "rounded-3", "col-md-4", "col-12"); 

    // The title of each task
    const title = document.createElement("h2");
    title.classList.add(containerStructure[1], "text-center", "fw-bold", "text-white", "mb-0", "pt-2", "pb-2");
    title.textContent = taskTitle;
    
    // Category for each task
    const _category = document.createElement("p");
    _category.classList.add(containerStructure[2], "m-0", "p-2");
    _category.textContent = category;

    // Deadline for each task
    const _deadline = document.createElement("p");
    _deadline.classList.add(containerStructure[3], "m-0", "p-2");
    _deadline.textContent = deadline;

    // A container for my status box
    const statusBox = document.createElement('div');
    statusBox.classList.add(containerStructure[4], "d-flex", "gap-1", "p-2", "align-items-center");
    
    // I'll create a container just to make a ball
    const statusBall = document.createElement('div');
    statusBall.classList.add(containerStructure[5], "rounded-4");

    // This will create the status text
    const _status = document.createElement("p");
    _status.classList.add(containerStructure[6], "m-0");
    _status.textContent = status[0];

    // This is a box, where I'll store 
    statusBox.appendChild(statusBall);
    statusBox.appendChild(_status);

    container.appendChild(title);
    container.appendChild(_category);
    container.appendChild(_deadline);
    container.appendChild(statusBox);

    const main = document.getElementById("main-content");

    main.appendChild(container);
}

// Demo
createTaskContainer("Task 1", "Work", "Today");
createTaskContainer("Task 2", "Class", "Yesterday");