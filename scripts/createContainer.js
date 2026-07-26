
// This function will create a container with all my elements
function createTaskContainer(taskTitle, category, deadline, status){
    
    const id = taskList.length + 1;

    // First I create a container
    const container = document.createElement("section");
    container.id = `sec-${id}`;
    
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
    title.id = `title-${id}`;
    
    // Category for each task
    const _category = document.createElement("p");
    _category.classList.add(containerStructure[2], "m-0", "p-2");
    _category.textContent = category;
    _category.id = `category-${id}`;

    // Deadline for each task
    const _deadline = document.createElement("p");
    _deadline.classList.add(containerStructure[3], "m-0", "p-2");
    _deadline.textContent = deadline;
    _deadline.id = `date-${id}`;

    // A container for my status box
    const statusBox = document.createElement('div');
    statusBox.classList.add(containerStructure[4], "d-flex", "gap-1", "p-2", "align-items-center");
    
    // I'll create a container just to make a ball
    const statusBall = document.createElement('div');
    statusBall.classList.add(containerStructure[5], "rounded-4");
    statusBall.id = `statcol-${id}`;

    // This will create the status text
    const _status = document.createElement("p");
    _status.classList.add(containerStructure[6], "m-0");
    _status.textContent = status;
    _status.id = `stat-${id}`;

    // This is a box, It will contain the progress status and a ball with color of the status
    statusBox.appendChild(statusBall);
    statusBox.appendChild(_status);

    // You can update if task is not completed
    if (status !== "Completed"){
        // This will create the status text
        const update = document.createElement("button");
        update.classList.add(containerStructure[7], "ms-3", "update-btn");
        if(status === "Not Started")
            update.textContent = "Start";
        else{
            update.textContent = "Complete";
        }
        update.id = `update-${id}`;
        statusBox.appendChild(update);
    }

    container.appendChild(title);
    container.appendChild(_category);
    container.appendChild(_deadline);
    container.appendChild(statusBox);

    const main = document.getElementById("main-content");

    main.appendChild(container);

    changeStatus(id , status);

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

function changeStatus(ID, Status){
    const statusball = document.getElementById(`statcol-${ID}`);
    statusball.classList.remove("notStarted","progress","completed","overdue");
    if( Status === status[0]){
        statusball.classList.add("notStarted");
    } else if ( Status === status[1]){
        statusball.classList.add("progress");
    } else if (Status === status[2]){
        statusball.classList.add("completed");
    } else {
        statusball.classList.add("overdue");
    }
}

// Demo
createTaskContainer("Task 1", "Work", "2026-07-28","Not Started");