
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
                targetButton.textContent = "Complete";
                changeStatus(id, status[1]);
                statText.textContent = status[1];
            } else {
                targetButton.textContent = "Completed";
                targetButton.classList.add("completed");
                statText.textContent = status[2];
                changeStatus(id, status[2]);
            }
        }
    }
);