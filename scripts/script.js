
const status = ["Start", "In progress", "Completed", "Overdue"];

const containerStructure = ["task-container", "taskTitle", "taskCategory", "taskDeadline", "progressBox", "task-progress-ball", "taskStatus"];

let tasks = new Array();

function createTaskContainer(taskTitle, category, deadline){
    
    // First I create a container
    const container = document.createElement("section");
    
    // I'll add a common class name for this and future containers, so they all share
    // the same css configuration
    // I'll use the method classList and add because I want to add some bootstrap from
    // the beginning
    container.classList.add(containerStructure[0], "d-flex", "justify-content-center", "p-2"); 

    // The title of each task
    const title = document.createElement("h2");
    header.classList.add(containerStructure[1], "text-center", "fw-bold", "text-white");
    header.textContent = taskTitle;
    
    // Category for each task
    const category = document.createElement("p");
    header.classList.add(containerStructure[2]);
    header.textContent = category;

    // Deadline for each task
    const deadline = document.createElement("p");
    header.classList.add(containerStructure[3]);
    header.textContent = deadline;

    // A container for my status box
    const statusBox = document.createElement('div');
    statusBox.classList.add(containerStructure[4], "d-flex", "gap-1");
    
    // I'll create a container just to make a ball
    const statusBall = document.createElement('div');
    statusBox.classList.add(containerStructure[5], "rounded-4");

    // This will create the status text
    const status = document.createElement("p");
    header.classList.add(containerStructure[6]);
    header.textContent = status[0];

    // This is a box, where I'll store 
    statusBox.appendChild(statusBall);
    statusBox.appendChild(status);

    document.main.appendChild(container);
}