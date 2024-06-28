"use strict";
// assets/ts/TodoList.ts
Object.defineProperty(exports, "__esModule", { value: true });
class TodoList {
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }
    addTask(name, description, priority) {
        const newTask = {
            id: Date.now(),
            name,
            description,
            priority,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
    }
    toggleComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }
    getTasks() {
        return this.tasks;
    }
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
    }
}
exports.default = TodoList;
