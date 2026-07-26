

// I like having some strings I'm using in case I change my mind and I want to change the name
// so I'll make it easier for me 
const status = ["Not Started", "In progress", "Completed", "Overdue"];

// I need this variable outside the functions in order to get the selected value
// This variable is for addTask
let currentStatus = status[0];

const containerStructure = ["task-container", "taskTitle", "taskCategory", "taskDeadline", "progressBox", "task-progress-ball", "taskStatus"];

// This array will contain every task I'll add
const taskList = new Array();

// I create my object constructor
function task(taskTitle, category, deadline, status){
    this.taskTitle = taskTitle;
    this.category = category;
    this.deadline = deadline;
    this.status = status;
}

