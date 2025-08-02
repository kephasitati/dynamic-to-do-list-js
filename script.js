document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(span => {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText, save = true) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) saveTasks();
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    loadTasks();
});
