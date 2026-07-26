
function addTask(){
    const taskTitle = capitalize(document.getElementById("taskTitle").value);
    const taskCategory = capitalize(document.getElementById("taskCategory").value);
    const taskDate = document.getElementById("taskDate").value;
    

    // Convert input date WITHOUT UTC problems
    const [year, month, day] = taskDate.split("-");
    const targetDate = new Date(year, month - 1, day); // monthIndex starts at 0
    targetDate.setHours(0, 0, 0, 0); // To avoid errors with time

    const today = new Date();
    today.setHours(0, 0, 0, 0); // To avoid errors with time
    if( targetDate < today && currentStatus === status[0]){
        currentStatus = status[3];
    }

    // I won't add anything if one field is empty
    if( taskTitle !== "" && taskCategory !== "" && taskDate !== "" ){
        // Add object to list
        taskList.push(new task(taskTitle, taskCategory, taskDate, currentStatus));

        // Create container
        createTaskContainer(taskTitle, taskCategory, taskDate, currentStatus);

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("addTaskModal"));
        modal.hide();
        
        resetAddModal();
    }
}

