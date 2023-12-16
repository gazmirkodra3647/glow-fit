/* Filename: AdvancedWebApp.js
   Content: A sophisticated and interactive web application that allows users to create, update, and manage a list of tasks. This code is designed to be a Single-Page Application (SPA) using modern JavaScript features, DOM manipulation, and AJAX requests to interact with a backend API. */

// Define global variables
let tasks = [];

// Function to retrieve tasks from the backend API
async function getTasks() {
  try {
    const response = await fetch('https://api.example.com/tasks');
    const data = await response.json();
    tasks = data;
    renderTasks();
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
}

// Function to render the list of tasks on the page
function renderTasks() {
  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = '';

  tasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = task.title;
    taskElement.appendChild(taskTitle);

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;
    taskElement.appendChild(taskDescription);

    taskContainer.appendChild(taskElement);
  });
}

// Function to add a new task
async function addTask(title, description) {
  const newTask = { title, description };

  try {
    const response = await fetch('https://api.example.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    const data = await response.json();
    tasks.push(data);
    renderTasks();
  } catch (error) {
    console.error('Failed to add task:', error);
  }
}

// Function to update a task
async function updateTask(taskId, updates) {
  try {
    const response = await fetch(`https://api.example.com/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks[index] = data;
    renderTasks();
  } catch (error) {
    console.error('Failed to update task:', error);
  }
}

// Function to delete a task
async function deleteTask(taskId) {
  try {
    await fetch(`https://api.example.com/tasks/${taskId}`, {
      method: 'DELETE',
    });

    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
}

// Event listener for form submission
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.getElementById('title-input');
  const descriptionInput = document.getElementById('description-input');

  addTask(titleInput.value, descriptionInput.value);

  titleInput.value = '';
  descriptionInput.value = '';
});

// Fetch tasks when the page loads
getTasks();