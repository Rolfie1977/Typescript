// assets/ts/TodoList.ts

// Definerer en interface for en opgave
interface Task {
  id: number;           // Unikt id for opgaven
  name: string;         // Navnet på opgaven
  description: string;  // Beskrivelse af opgaven
  priority: number;     // Prioritetsniveau for opgaven
  completed: boolean;   // Om opgaven er fuldført eller ej
}

// Eksporterer TodoList-klassen som standardeksport
export default class TodoList {
  // En privat liste af opgaver
  private tasks: Task[] = [];

  // Constructoren initialiserer klassen ved at indlæse opgaver fra lokal opbevaring
  constructor() {
      this.loadTasks();
  }

  // Tilføjer en ny opgave til listen
  public addTask(name: string, description: string, priority: number): void {
      // Opretter en ny opgave med de givne data og et unikt id baseret på den aktuelle tid
      const newTask: Task = {
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
  public toggleComplete(taskId: number): void {
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
  public getTasks(): Task[] {
      return this.tasks;
  }

  // Gemmer listen af opgaver i lokal opbevaring
  private saveTasks(): void {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Indlæser listen af opgaver fra lokal opbevaring
  private loadTasks(): void {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
          // Parser de gemte opgaver og sætter dem som den aktuelle liste af opgaver
          this.tasks = JSON.parse(tasks);
      }
  }
}
