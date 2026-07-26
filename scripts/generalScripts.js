
function resetAddModal(){
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskCategory").value = "";
        document.getElementById("taskDate").value = "";
        document.getElementById("statusButton").textContent = status[0];
}

// Clear all elements
function clearWebsite() {
    document.getElementById("main-content").innerHTML = "";
}
