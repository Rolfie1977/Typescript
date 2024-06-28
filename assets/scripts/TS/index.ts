// assets/ts/index.ts

// Importerer TodoList-klassen fra TodoList.js
import TodoList from './TodoList.js';

// Deklarerer globale funktioner på vinduet
declare global {
  interface Window {
    addTask: () => void;
    toggleComplete: (id: number) => void;
  }
}

// Opretter en ny instans af TodoList
const todoList = new TodoList();

// Tilføjer en global funktion til vinduet for at tilføje en ny opgave
window.addTask = function() {
  // Henter input elementerne fra DOM'en og caster dem til HTMLInputElement
  const nameInput = document.getElementById('taskName') as HTMLInputElement;
  const descInput = document.getElementById('taskDesc') as HTMLInputElement;
  const priorityInput = document.getElementById('taskPriority') as HTMLInputElement;

  // Tjekker om alle input elementerne er til stede
  if (nameInput && descInput && priorityInput) {
    // Tilføjer en ny opgave til TodoList
    todoList.addTask(nameInput.value, descInput.value, Number(priorityInput.value));

    // Rydder input felterne efter opgaven er tilføjet
    nameInput.value = '';
    descInput.value = '';
    priorityInput.value = '';

    // Opdaterer visningen af opgaver
    displayTasks();
  }
};

// Tilføjer en global funktion til vinduet for at skifte fuldførelsesstatus for en opgave
window.toggleComplete = function(id: number) {
  // Skifter fuldførelsesstatus for opgaven med det givne id
  todoList.toggleComplete(id);

  // Opdaterer visningen af opgaver
  displayTasks();
};

// Funktion til at vise opgaverne i TodoList
function displayTasks() {
  // Henter elementet hvor opgavelisten skal vises og caster det til HTMLUListElement
  const taskListElement = document.getElementById('taskList') as HTMLUListElement;

  // Rydder eksisterende opgaver fra visningen
  taskListElement.innerHTML = ''; // Clear existing tasks

  // Går igennem alle opgaver i TodoList og tilføjer dem til visningen
  todoList.getTasks().forEach(task => {
    // Opretter en listeelement for opgaven
    const taskItem = document.createElement('li');

    // Opretter en checkbox for at vise fuldførelsesstatus
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    // Tilføjer en listener til checkboxen for at skifte fuldførelsesstatus
    checkbox.onchange = () => window.toggleComplete(task.id);

    // Tilføjer checkboxen og opgaveinformationen til listeelementet
    taskItem.appendChild(checkbox);
    taskItem.append(` ${task.name} - ${task.description} - Priority: ${task.priority}, Completed: ${task.completed}`);

    // Tilføjer listeelementet til opgavelisten
    taskListElement.appendChild(taskItem);
  });
}

// Tilføjer en eventlistener til dokumentet for at vise opgaverne når DOM'en er indlæst
document.addEventListener('DOMContentLoaded', displayTasks);
