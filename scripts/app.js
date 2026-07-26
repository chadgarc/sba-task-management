
// =====================
// Global Variables
// =====================

let nextId = 1;

// I like having some strings I'm using in case I change my mind and I want to change the name
// so I'll make it easier for me 
const status = ["Not Started", "In Progress", "Completed", "Overdue"];

// I need this variable outside the functions in order to get the selected value
// This variable is for addTask
let currentStatus = status[0];

const containerStructure = ["task-container", "taskTitle", "taskCategory", "taskDeadline", "progressBox", "task-progress-ball", "taskStatus", "update-btn"];

// This array will contain every task I'll add
const taskList = new Array();

const categories = new Array();

// Load previous content if available
loadSnapshot();

// =====================
// Utility Functions
// =====================
function capitalize(parameter){
    return parameter.charAt(0).toUpperCase() + parameter.slice(1).toLowerCase();
}

// I create my object constructor
function task(id, taskTitle, category, deadline, status){
    this.id = id;
    this.taskTitle = taskTitle;
    this.category = category;
    this.deadline = deadline;
    this.status = status;
}



// This function will create a container with all my elements
function createTaskContainer(id, taskTitle, category, deadline, status){

    // First I create a container
    const container = document.createElement("section");
    container.id = `sec-${id}`;
    
    // I'll add a common class name for this and future containers, so they all share
    // the same css configuration
    // I'll use the method classList and add because I want to add some bootstrap from
    // the beginning
    container.classList.add(containerStructure[0], "d-flex", "flex-column", "justify-content-center", "p-2", "rounded-3", "col-md-4", "col-12"); 
    // All the following elements will go inside section container

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("d-flex", "justify-content-between", "titleDiv");
    
    const remove = document.createElement("button");
    remove.classList.add("removeBttn");
    remove.id = `del-${id}`;

    // The title of each task
    const title = document.createElement("h2");
    title.classList.add(containerStructure[1], "fw-bold", "text-white", "mb-0", "pt-2", "pb-2");
    title.textContent = taskTitle;
    title.id = `title-${id}`;

    titleDiv.appendChild(title);
    titleDiv.appendChild(remove);
    
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

    // This is the button used to update the status
    const update = document.createElement("button");
    update.classList.add(containerStructure[7], "update-btn");
    if(status === "Not Started" || status === "Overdue"){
        update.textContent = "Start";
    } else if(status === "In Progress"){
        update.textContent = "Complete";
    }else{
        update.textContent = "Completed";
        update.classList.add("completed");
    }
    update.id = `update-${id}`;
    statusBox.appendChild(update);
    

    container.appendChild(titleDiv);
    container.appendChild(_category);
    container.appendChild(_deadline);
    container.appendChild(statusBox);

    const main = document.getElementById("main-content");

    main.appendChild(container);

    changeStatus(id , status);

}

function addTask(){
    // Getting all values from input tags
    const taskTitle = capitalize(document.getElementById("taskTitle").value.trim());
    const taskCategory = capitalize(document.getElementById("taskCategory").value.trim());
    const taskDate = document.getElementById("taskDate").value;
    // I'll create an unique id to easily find my elements
    const id = nextId++;

    let finalStatus = currentStatus;
    
    // Convert input date WITHOUT UTC problems
    const [year, month, day] = taskDate.split("-");
    const targetDate = new Date(year, month - 1, day); // monthIndex starts at 0
    targetDate.setHours(0, 0, 0, 0); // To avoid errors with time

    const today = new Date();
    today.setHours(0, 0, 0, 0); // To avoid errors with time
    if( targetDate < today && finalStatus === status[0]){
        finalStatus = status[3];
    }

    if (!categories.includes(taskCategory)){
        categories.push(taskCategory);
        renderCategoryRadios();
    }

    // I won't add anything if one field is empty
    if( taskTitle !== "" && taskCategory !== "" && taskDate !== "" ){
        // Add object to list
        taskList.push(new task(id, taskTitle, taskCategory, taskDate, finalStatus));

        // Create container
        createTaskContainer(id, taskTitle, taskCategory, taskDate, finalStatus);

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("addTaskModal"));
        modal.hide();

        snapshot();

        resetAddModal();
    }
}

// =====================
// List Rendering
// =====================

function renderCategoryRadios(){
    // I'll get my filter container
    const container = document.getElementById("status-filters");
    
    // Instance of all elements with cat-radio class
    const oldCategories = container.querySelectorAll(".cat-radio");
    // Removing all elements
    oldCategories.forEach(element => element.remove());

    // For each element from my list categories
    categories.forEach(
        cat => {
            // I'll create an unique id, I'll split the values and join them with dash
            // in case of spaces, id cannot have spaces
            const id = `cat-${cat.split(" ").join("-")}`

            const input = document.createElement("input");
            input.type = "radio";
            input.id = id;
            input.name = "groupFilter";
            // This will allow me to call them later
            input.classList.add("cat-radio");

            // To add  my function call
            input.setAttribute("onclick", `listToContainers('category','${cat}')`);
            // Aria
            input.setAttribute("aria-label", `Filter tasks by category ${cat}`);

            // Create labels
            const label = document.createElement("label");
            label.htmlFor = id;
            label.textContent = cat;
            label.classList.add("cat-radio");

            const breakTag = document.createElement("br");
            breakTag.classList.add("cat-radio");

            // Add them
            container.appendChild(input);
            container.appendChild(label);
            container.appendChild(breakTag);
        }
    )
}

function resetAddModal(){
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskCategory").value = "";
        document.getElementById("taskDate").value = "";
        document.getElementById("statusButton").textContent = status[0];
        currentStatus = status[0]; 
}

// Clear all elements
function clearWebsite() {
    document.getElementById("main-content").innerHTML = "";
}


// =====================
// Filters
// =====================

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
            createTaskContainer(targetTask.id, targetTask.taskTitle, targetTask.category, targetTask.deadline, targetTask.status));
    } else {
        taskList.forEach(targetTask => 
            createTaskContainer(targetTask.id, targetTask.taskTitle, targetTask.category, targetTask.deadline, targetTask.status));

            // To render categories
            renderCategoryRadios();

            // Uncheck filter radio
            document.querySelectorAll("input[name='groupFilter']").forEach(r => r.checked = false);
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

// Saves or override data in local storage
function snapshot(){
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadSnapshot(){
    const saved = JSON.parse(localStorage.getItem("taskList"));

    if(saved){
        taskList.length = 0;
        saved.forEach(t => taskList.push(t));

        rebuildCategories();
         // Update nextId so it continues from the highest existing ID
        nextId = Math.max(...taskList.map(t => t.id)) + 1;
    } else {
        demo();
    }
}

// =====================
// Event Listeners
// =====================


// change current status on Add modal window
// For every element with class name dropdown-item
// go thu each item 
document.querySelectorAll(".dropdown-status").forEach(
    item => {
        // Event listener when users click on that element
        item.addEventListener(
            "click", () => {
                // Action to be excecuted
                currentStatus = item.dataset.status;

                // Change button text
                document.getElementById("statusButton").textContent = currentStatus;
            }
        )
    }
);

// Update button from task
document.addEventListener(
    "click", (event) => {
        if (event.target.classList.contains("update-btn")) {
            // I want to get the ID, I can call specifics elements like that
            const [, id] = event.target.id.split("-");
            

            // This is my targeted button
            const targetButton = document.getElementById(`update-${id}`);
            // This is the text of the status
            const statText = document.getElementById(`stat-${id}`);

            // If the button's text is complete I want it to get gray
            if (targetButton.textContent === "Start"){
                // Change text content of button
                targetButton.textContent = "Complete";
                // Change color of ball
                changeStatus(id, status[1]);
                // Finding my object and then changing the status value of that object
                // An then change the status text
                taskList.find(t => t.id === Number(id)).status = status[1];
                statText.textContent = status[1];
            } else {
                targetButton.textContent = "Completed";
                targetButton.classList.add("completed");
                statText.textContent = status[2];
                taskList.find(t => t.id === Number(id)).status = status[2];
                changeStatus(id, status[2]);
            }
            snapshot();
        }
    }
);

// Detele task
document.addEventListener(
    "click", (event) => {
        if (event.target.classList.contains("removeBttn")) {
            // I want to get the ID, I can call specifics elements like that
            const [, id] = event.target.id.split("-");
            
            // Rebuild taskList without the element deleted
            const filtered = taskList.filter(t => t.id !== Number(id));
            taskList.length = 0;
            categories.length = 0;
            filtered.forEach(t => taskList.push(t));

            rebuildCategories();

            snapshot();
            listToContainers();
            renderCategoryRadios();
        }
    }
);

function clearTasks(){
    localStorage.clear();
    taskList.length = 0;
    categories.length = 0;
    listToContainers();
    renderCategoryRadios();
}

function rebuildCategories(){
    categories.length = 0;
    taskList.forEach(t => {
            if( !categories.includes(t.category) ){
                categories.push(t.category);
            }
        });
}

// Demo
function demo(){
    taskList.push(new task(1,"Task 1", "Math", "2026-07-28", "Not Started"));
    categories.push("Math");
    createTaskContainer(1, "Task 1", "Math", "2026-07-28", "Not Started");
    nextId++;

    taskList.push(new task(2,"Task 2", "Chemistry", "2026-07-30", "In Progress"));
    categories.push("Chemistry");
    createTaskContainer(2,"Task 2", "Chemistry", "2026-07-30", "In Progress");
    nextId++;

    taskList.push(new task(3,"Task 3", "Biology", "2026-07-15", "Overdue"));
    categories.push("Biology");
    createTaskContainer(3, "Task 3", "Biology", "2026-07-15", "Overdue");
    nextId++;

    taskList.push(new task(4,"Task 4", "Arts", "2026-07-13", "Completed"));
    categories.push("Arts");
    createTaskContainer(4, "Task 4", "Arts", "2026-07-13", "Completed");
    nextId++;

    snapshot();
}

listToContainers();

renderCategoryRadios();