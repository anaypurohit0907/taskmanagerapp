
const btn = document.getElementById('addbtn');
const displaypercentage = document.getElementById('taskprecentage');
const inputtask = document.getElementById('inputtask');
const tasktable = document.getElementById('tasktable');
let tasks = [];

displaypercentage.innerHTML = '<h1>0%</h1>';
displaytask();

function displaytask() {
    tasktable.innerHTML = ''; 
    let index = 0;

    tasks.forEach((item, test) => {
        var row = tasktable.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = `${item.item}`;
        cell2.innerHTML = `<input type="checkbox" onchange='getpercentage()' id='checkboxcount' class="button-grid" ${(item.completed) ? 'checked' : ''}> `;
        cell3.innerHTML = `<button class="delete-btn" onclick='deletetasks(${index})'>Delete</button>`;
        index++;
    });

    getpercentage();
}

function addtasktolocalstorage(task) {
    if (task) {
        tasks.push({ item: task, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function addtask() {
    const taskText = inputtask.value.trim();
    if (taskText !== '') {
        addtasktolocalstorage(taskText);
        inputtask.value = '';
        displaytask();
    }
}

function deletetasks(index) {
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displaytask();
    }
}

function getpercentage() {
    let temp = document.querySelectorAll('input[type="checkbox"]:checked');
    let checkedboxex = temp.length;
    let temp2 = document.querySelectorAll('input[type="checkbox"]');
    let totalcheckedbox = temp2.length;
    let percentage = (totalcheckedbox > 0) ? (checkedboxex / totalcheckedbox) * 100 : 0;
    displaypercentage.innerHTML = `<h1>${Math.round(percentage)}%</h1>`;
}

// Load tasks from local storage on page load
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displaytask();
}