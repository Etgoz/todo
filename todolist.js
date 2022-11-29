const state = {
	tasks: [],
	completed: [],
};

class Task {
	constructor(title, completed = false) {
		title = title;
		completed = false;
	}
	completeTask = function () {
		this.completed = !this.completed ? true : false;
		if (this.completed) {
			state.completed.push(this);
		} else {
			state.completed.splice(state.completed.indexOf(this));
		}
	};
}

const exampleTask = document.querySelector("li");

addFunctionality(exampleTask);

const taskObj = `<div class="view">
    <input class="toggle" type="checkbox" />
    <label>Todo Title</label>
    <button class="destroy" />
</div>
<input class="edit" />`;
const taskArea = document.querySelector("ul");

function updateTasks(s, task) {
	console.log(s);
	if (s.tasks.length >= 1) {
		const newTask = document.createElement("li");
		newTask.innerHTML = taskObj;
		newTask.querySelector("label").innerText = task.title;
		taskArea.appendChild(newTask);
		addFunctionality(newTask);
	}
}

const input = document.querySelector(".new-todo");

function addTask(ev) {
	if (ev.key === "Enter" && input.value) {
		newTask = new Task();
		newTask.title = input.value;
		state.tasks.push(newTask);
		updateTasks(state, newTask);
		input.value = "";
		if (Array.from(document.querySelectorAll("li")).length === 1) {
			document.querySelector(".footer").classList.toggle("hidden");
		}
		itemsLeft();
	}
}

function destroy(event) {
	taskName = event.target.parentElement.querySelector("label").innerText;
	event.target.parentElement.parentElement.remove();
	state.tasks.splice(state.tasks.indexOf(taskName), 1);
	if (Array.from(document.querySelectorAll("li")).length === 0) {
		document.querySelector(".footer").classList.toggle("hidden");
	}
	itemsLeft();
}

function editTask(event) {
	event.target.parentElement.parentElement.classList.toggle("editing");
}

function complete(event) {
	event.target.parentElement.parentElement.classList.toggle("completed");
	const task = state.tasks.find((element) => {
		return element.title === event.target.nextElementSibling.innerText;
	});
	task.completeTask();
	itemsLeft();
}

function itemsLeft() {
	document.querySelector(".todo-count>strong").innerText = `${
		state.tasks.length - state.completed.length
	}`;
}

function clearCompleted() {
	document.querySelectorAll("li").forEach((el) => {
		if (el.classList.contains("completed")) {
			state.tasks.splice(
				state.tasks.indexOf(el.querySelector("label").innerText),
				1
			);
			el.remove();
			if (Array.from(document.querySelectorAll("li")).length === 0) {
				document.querySelector(".footer").classList.toggle("hidden");
			}
			state.completed = [];
			itemsLeft();
		}
	});
}

function addFunctionality(taskElem) {
	taskElem.querySelector(".destroy").addEventListener("click", destroy);
	taskElem.addEventListener("dblclick", editTask);
	taskElem.querySelector(".toggle").addEventListener("change", complete);
}

document.addEventListener("keyup", addTask);

document
	.querySelector(".clear-completed")
	.addEventListener("click", clearCompleted);
