# Task Management App  
A responsive, dynamic, and accessible task management application built with **JavaScript**, **Bootstrap**, **SASS**, and **Local Storage**.  
This project was developed as part of the SBA Front-End course, focusing on DOM manipulation, event-driven architecture, and client-side data persistence.

---

## 📌 Features

- Add tasks with title, category, deadline, and status  
- Update task progress (Start → Complete → Completed)  
- Automatic overdue detection based on date  
- Filter tasks by **status** or **category**  
- Dynamic category generation  
- Delete tasks individually  
- Full persistence using **Local Storage**  
- Accessible UI with ARIA attributes  
- Responsive layout using Bootstrap 5  
- All UI elements generated dynamically via JavaScript

---

## 🛠️ Tech Stack

| Technology            | Purpose                                       |
|-----------------------|-----------------------------------------------|
| **JavaScript (ES6+)** | Core logic, DOM manipulation, event listeners |
| **Bootstrap 5**       | Layout, modal components, responsive design   |
| **SASS**              | Custom styling and structure                  |
| **HTML5**             | Base structure                                |
| **Local Storage API** | Client-side persistence                       |

---


## 🚀 How It Works

### Task Model
Each task is represented as an object:

```js
{
  id: number,
  taskTitle: string,
  category: string,
  deadline: string,
  status: string
}
```

### Dynamic Rendering
All UI components are created with JavaScript:

- Task containers
- Status indicators
- Update buttons
- Delete buttons
- Category filters

### Filters
Users can filter tasks by:

- Status (Not Started, In Progress, Completed, Overdue)
- Category (generated dynamically)

Only one filter is active at a time to maintain clarity.

### Local Storage
On page load:

- Tasks are loaded from Local Storage
- Categories are rebuilt
- UI is rendered dynamically
- If no saved data exists, a demo dataset is generated.

## 🔧 Notable Implementation Details
- Mobile-first design using Bootstrap grid
- Modal-based task creation with input validation
- Automatic overdue detection using date comparison
- Event delegation for update and delete buttons
- Dynamic category rendering based on existing tasks
- Snapshot system to keep Local Storage synchronized
- Unique IDs for precise DOM targeting
- Accessible controls using ARIA attributes

## 🧠 Reflection (100–200 words)
Throughout this project, I faced several challenges that pushed me to better understand JavaScript and DOM manipulation. One of the biggest hurdles was working with dynamic elements and event listeners. Since every task container was generated through JavaScript, I had to learn how event delegation works and how to correctly target specific elements using unique IDs.

To solve these issues, I broke the project down into small steps: building a wireframe, generating the UI from JavaScript, styling with SASS, and gradually adding functionality. I spent time experimenting with Bootstrap modals, dropdowns, and accessibility attributes to ensure the interface was both functional and user-friendly.

If given more time, I would add task editing, sorting options, and animations. I would also refactor some functions for improved readability and scalability. Overall, this project helped me strengthen my understanding of front-end architecture and dynamic UI development.