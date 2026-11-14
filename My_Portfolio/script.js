// ==========================================
// ACADEMIC PLANNER LOGIC
// ==========================================
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage if they exist (Arrays requirement)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = ''; // Clear the list
    tasks.forEach((task, index) => {
        const li = document.createElement('li'); // DOM manipulation
        li.className = 'task-item';
        
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed');
        }
        
        // Mark Complete Button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.style.marginLeft = '10px';
        completeBtn.onclick = () => toggleComplete(index);
        
        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✗';
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.onclick = () => deleteTask(index);

        const btnContainer = document.createElement('div');
        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });
    
    // Save to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event Handling
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', addTask);
}

// Initial render
if (taskList) {
    renderTasks();
}


// ==========================================
// CONTACT FORM VALIDATION
// ==========================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation checks
        if (!name || !email || !phone || !message) {
            alert("Error: No field can be empty.");
            return;
        }
        
        // Email format check (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Error: Please enter a valid email address.");
            return;
        }
        
        // Phone number check (Only digits)
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) {
            alert("Error: Phone number must contain only digits.");
            return;
        }
        
        // If all validations pass
        formFeedback.textContent = "Message sent successfully! (Simulated)";
        contactForm.reset();
        
        setTimeout(() => {
            formFeedback.textContent = "";
        }, 3000);
    });
}