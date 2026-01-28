const API_URL = 'http://localhost:3000/api/tasks';

const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');

const fetchTasks = () => fetch(API_URL)
    .then(res => res.json())
    .then(renderTasks)
    .catch(() => renderTasks([]));

fetchTasks();

function renderTasks(tasks) {
    list.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const info = document.createElement('div');
        info.className = 'task-info';

        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = task.titulo;

        const tag = document.createElement('span');
        tag.className = 'task-tag';
        tag.textContent = task.tecnologia;

        info.append(title, tag);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'ghost';
        deleteBtn.textContent = 'Borrar';
        deleteBtn.addEventListener('click', () => deleteTask(task._id));

        actions.appendChild(deleteBtn);
        li.append(info, actions);
        list.appendChild(li);
    });

    if (tasks.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'task-item';
        const msg = document.createElement('span');
        msg.className = 'task-title';
        msg.textContent = 'Sin tareas guardadas';
        empty.appendChild(msg);
        list.appendChild(empty);
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const tecnologia = document.getElementById('tecnologia').value;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, tecnologia })
    })
        .then(() => {
            form.reset();
            return fetchTasks();
        });
});

function deleteTask(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => fetchTasks());
}
