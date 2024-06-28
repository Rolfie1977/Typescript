// assets/ts/TodoList.ts
// Eksporterer TodoList-klassen som standardeksport
export default class TodoList {
    // Constructoren initialiserer klassen ved at indlæse opgaver fra lokal opbevaring
    constructor() {
        // En privat liste af opgaver
        this.tasks = [];
        this.loadTasks();
    }
    // Tilføjer en ny opgave til listen
    addTask(name, description, priority) {
        // Opretter en ny opgave med de givne data og et unikt id baseret på den aktuelle tid
        const newTask = {
            id: Date.now(),
            name,
            description,
            priority,
            completed: false
        };
        // Tilføjer den nye opgave til listen af opgaver
        this.tasks.push(newTask);
        // Gemmer den opdaterede liste af opgaver i lokal opbevaring
        this.saveTasks();
    }
    // Skifter fuldførelsesstatus for en given opgave baseret på dens id
    toggleComplete(taskId) {
        // Finder opgaven med det givne id
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            // Skifter fuldførelsesstatus for opgaven
            task.completed = !task.completed;
            // Gemmer den opdaterede liste af opgaver i lokal opbevaring
            this.saveTasks();
        }
    }
    // Returnerer listen af opgaver
    getTasks() {
        return this.tasks;
    }
    // Gemmer listen af opgaver i lokal opbevaring
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    // Indlæser listen af opgaver fra lokal opbevaring
    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            // Parser de gemte opgaver og sætter dem som den aktuelle liste af opgaver
            this.tasks = JSON.parse(tasks);
        }
    }
}
