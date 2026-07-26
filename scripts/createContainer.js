
// This function will create a container with all my elements
function createTaskContainer(taskTitle, category, deadline, status){
    
    // First I create a container
    const container = document.createElement("section");
    
    // I'll add a common class name for this and future containers, so they all share
    // the same css configuration
    // I'll use the method classList and add because I want to add some bootstrap from
    // the beginning
    container.classList.add(containerStructure[0], "d-flex", "flex-column", "justify-content-center", "p-2", "rounded-3", "col-md-4", "col-12"); 
    // All the following elements will go inside section container

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
    _status.textContent = status;

    // This is a box, It will contain the progress status and a ball with color of the status
    statusBox.appendChild(statusBall);
    statusBox.appendChild(_status);

    container.appendChild(title);
    container.appendChild(_category);
    container.appendChild(_deadline);
    container.appendChild(statusBox);

    const main = document.getElementById("main-content");

    main.appendChild(container);
}


function listToContainers(filter = "Default", criteria = "Default"){
    clearWebsite();
    if(filter!=="Default"){
        let filtered;
        if(filter === "category"){
            filtered = taskList.filter(targetTask => targetTask.category === criteria);
        } else if (filter === "status") {
            filtered = taskList.filter(targetTask => targetTask.status === criteria);
        }
        filtered.forEach(targetTask => 
            createTaskContainer(targetTask.taskTitle, targetTask.category, targetTask.deadline, targetTask.status));
    } else {
        taskList.forEach(targetTask => 
            createTaskContainer(targetTask.taskTitle, targetTask.category, targetTask.deadline, targetTask.status));
    }
}