// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks() {
	let tasks;
	// check local storage to if there's any tasks in there
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	// and then we want to loop through these tasks in there
	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link to the li
		li.appendChild(link);

		// Append li to the ul
		taskList.appendChild(li);
	});
}

//Add Task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	const link = document.createElement('a');
	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to the li
	li.appendChild(link);

	// Append li to the ul
	taskList.appendChild(li);

	// Store in Local Storage
	storeTaksInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';

	e.preventDefault();
}

// Store Task
function storeTaksInLocalStorage(task) {
	let tasks;
	// check local storage to if there's any tasks in there
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	// set back to local storage
	// has to be stored as a string
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove tasks
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from Local Storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement); // don't have an id, so remove the element li
		}
	}
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
	// first, check local storage, put it into a variable
	let tasks;
	// check local storage to if there's any tasks in there
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	// Set local storage
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
	// first way
	// taskList.innerHTML = '';
	// faster way
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from Local storage
	clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
	// get whatever is being typed in the 'filter tasks'
	const text = e.target.value.toLowerCase(); // gives us whatever is typed in
	// take all the list items
	document.querySelectorAll('.collection-item').forEach(function (task) {
		// we want to loop all lis, and we can use a 'forEach' because 'querySelectorAll()' returns a node list. if it would return a HTML Collection, we would have to convert to an Array in order to use 'forEach'

		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});

	console.log(text);
}
